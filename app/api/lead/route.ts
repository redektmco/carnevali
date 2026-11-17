import { NextResponse } from "next/server";
import {
  BUDGET,
  MAX_FILE_BYTES,
  ORG_REQUIRED,
  REQUESTERS,
  START,
  STAGES,
  UFS,
  getService,
  labelOf,
  q3Options,
} from "@/lib/form-config";

export const runtime = "nodejs";

// Envia o lead para o CRM via webhook (Zapier, Make, n8n, RD Station, HubSpot, Pipedrive...).
// Configure CRM_WEBHOOK_URL na Vercel. Opcional: CRM_WEBHOOK_TOKEN (vai no header Authorization).

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Corpo inválido" }, { status: 400 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(String(form.get("dados") ?? "{}"));
  } catch {
    return NextResponse.json({ ok: false, error: "Dados inválidos" }, { status: 400 });
  }

  const leadId = crypto.randomUUID();

  // Honeypot preenchido: responde sucesso sem encaminhar.
  if (str(raw.website)) return NextResponse.json({ ok: true, leadId });

  const service = getService(str(raw.servico));
  const q2 = str(raw.q2, 60);
  const q3 = str(raw.q3, 60);
  const solicitante = str(raw.solicitante, 40);
  const phoneDigits = str(raw.whatsapp, 30).replace(/\D/g, "");
  const email = str(raw.email, 160);
  const uf = str(raw.uf, 2).toUpperCase();

  const missing: string[] = [];
  if (!service) missing.push("servico");
  if (service?.q2 && !service.q2.options.some((o) => o.value === q2)) missing.push("q2");
  if (service && !service.q2 && str(raw.q2Texto).length < 3) missing.push("q2Texto");
  if (service?.q3 && !q3Options(service, q2).some((o) => o.value === q3)) missing.push("q3");
  if (!STAGES.some((o) => o.value === raw.estagio)) missing.push("estagio");
  if (!START.some((o) => o.value === raw.inicio)) missing.push("inicio");
  if (!REQUESTERS.some((o) => o.value === solicitante)) missing.push("solicitante");
  if (str(raw.nome).length < 3) missing.push("nome");
  if (ORG_REQUIRED.has(solicitante) && str(raw.empresa).length < 2) missing.push("empresa");
  if (phoneDigits.length < 10 || phoneDigits.length > 11) missing.push("whatsapp");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) missing.push("email");
  if (str(raw.cidade).length < 2) missing.push("cidade");
  if (!UFS.includes(uf)) missing.push("uf");
  if (missing.length) {
    return NextResponse.json({ ok: false, error: "Campos inválidos", campos: missing }, { status: 422 });
  }

  const file = form.get("anexo");
  let anexo: { nome: string; tipo: string; tamanho: number; base64: string } | null = null;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ ok: false, error: "Arquivo acima de 4 MB" }, { status: 413 });
    }
    anexo = {
      nome: file.name.slice(0, 200),
      tipo: file.type || "application/octet-stream",
      tamanho: file.size,
      base64: Buffer.from(await file.arrayBuffer()).toString("base64"),
    };
  }

  const origem = (raw.origem && typeof raw.origem === "object" ? raw.origem : {}) as Record<string, unknown>;
  const o = (k: string) => str(origem[k], 500) || null;

  const payload = {
    lead_id: leadId,
    enviado_em: new Date().toISOString(),
    fonte: "lp.grupocarnevali.com.br",
    servico: { slug: service!.id, nome: service!.label },
    tipo_projeto: service!.q2
      ? { slug: q2, nome: labelOf(service!.q2.options, q2) }
      : { slug: "outro", nome: str(raw.q2Texto, 160) },
    porte: service!.q3 ? { slug: q3, nome: labelOf(q3Options(service!, q2), q3) } : null,
    especificacoes: str(raw.especificacoes, 1200) || null,
    estagio: { slug: str(raw.estagio), nome: labelOf(STAGES, str(raw.estagio)) },
    inicio: { slug: str(raw.inicio), nome: labelOf(START, str(raw.inicio)) },
    investimento: raw.investimento
      ? { slug: str(raw.investimento), nome: labelOf(BUDGET, str(raw.investimento)) }
      : null,
    solicitante: { slug: solicitante, nome: labelOf(REQUESTERS, solicitante) },
    contato: {
      nome: str(raw.nome, 120),
      empresa: str(raw.empresa, 160) || null,
      cargo: str(raw.cargo, 120) || null,
      whatsapp: phoneDigits,
      whatsapp_e164: `+55${phoneDigits}`,
      email,
    },
    obra: { cidade: str(raw.cidade, 120), uf },
    mensagem: str(raw.mensagem, 3000) || null,
    consentimento: {
      // Base legal do contato comercial: procedimentos preliminares a contrato (LGPD, art. 7º, V).
      comunicacoes_marketing: raw.aceitaComunicacoes === true,
    },
    campanha: {
      utm_source: o("utm_source"),
      utm_medium: o("utm_medium"),
      utm_campaign: o("utm_campaign"),
      utm_term: o("utm_term"),
      utm_content: o("utm_content"),
      utm_id: o("utm_id"),
      gclid: o("gclid"),
      gbraid: o("gbraid"),
      wbraid: o("wbraid"),
      fbclid: o("fbclid"),
      msclkid: o("msclkid"),
      servico_url: o("servico"),
      tipo_url: o("tipo"),
      landing_url: o("landing_url"),
      referrer: o("referrer"),
      primeira_visita: o("first_seen_at"),
    },
    anexo,
    user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
  };

  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) {
    // Sem webhook configurado: registra no log da Vercel (sem o arquivo) para não perder o lead.
    console.warn("[lead] CRM_WEBHOOK_URL não configurada. Lead:", JSON.stringify({ ...payload, anexo: anexo && { ...anexo, base64: `(${anexo.tamanho} bytes)` } }));
    return NextResponse.json({ ok: true, leadId, encaminhado: false });
  }

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.CRM_WEBHOOK_TOKEN) headers.Authorization = `Bearer ${process.env.CRM_WEBHOOK_TOKEN}`;
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      console.error("[lead] Webhook respondeu", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "CRM indisponível" }, { status: 502 });
    }
  } catch (err) {
    console.error("[lead] Falha ao chamar o webhook", err);
    return NextResponse.json({ ok: false, error: "CRM indisponível" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, leadId, encaminhado: true });
}
