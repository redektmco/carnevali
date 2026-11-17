"use client";

// Origem da campanha: guardada na primeira página vista da sessão,
// para não se perder se o visitante navegar por âncoras ou recarregar.

const KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "servico",
  "tipo",
] as const;

const STORAGE_KEY = "carnevali:origem";

export type Attribution = Partial<Record<(typeof KEYS)[number], string>> & {
  landing_url?: string;
  referrer?: string;
  first_seen_at?: string;
};

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  let stored: Attribution = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    stored = {};
  }
  const params = new URLSearchParams(window.location.search);
  const fresh: Attribution = {};
  for (const key of KEYS) {
    const v = params.get(key);
    if (v) fresh[key] = v.slice(0, 200);
  }
  // Uma nova campanha na URL substitui a anterior; sem parâmetros, mantém a primeira.
  const hasCampaign = Object.keys(fresh).length > 0;
  const result: Attribution = hasCampaign || !stored.landing_url
    ? {
        ...fresh,
        landing_url: window.location.href.slice(0, 500),
        referrer: document.referrer.slice(0, 500) || undefined,
        first_seen_at: new Date().toISOString(),
      }
    : stored;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    /* navegação privada: segue sem persistir */
  }
  return result;
}

type Win = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/** Dispara a conversão. Chamar só depois da resposta de sucesso da API. */
export function trackLead(detail: { servico: string; tipo?: string; leadId?: string }) {
  const w = window as Win;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "generate_lead", ...detail });
  w.gtag?.("event", "generate_lead", detail);
  w.fbq?.("track", "Lead", { content_category: detail.servico });
}
