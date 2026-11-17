"use client";

import { useEffect, useRef } from "react";
import {
  ACCEPTED_FILES,
  BUDGET,
  CALDEIRARIA_TIPO,
  MAX_FILE_BYTES,
  ORG_REQUIRED,
  REQUESTERS,
  SERVICES,
  START,
  STAGES,
  UFS,
  getService,
  q3Options,
  type Option,
  type ServiceId,
} from "@/lib/form-config";
import { trackLead } from "@/lib/tracking";
import { useLead, type LeadState, type LeadValues } from "./lead-context";
import { Chevron } from "./marks";

const PRIVACY_URL = process.env.NEXT_PUBLIC_PRIVACY_URL || "#politica-de-privacidade";

type Errors = LeadState["errors"];

function digits(v: string) {
  return v.replace(/\D/g, "");
}

export function formatPhone(v: string) {
  const d = digits(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validateStep1(v: LeadValues): Errors {
  const e: Errors = {};
  const service = getService(v.servico);
  if (!service) {
    e.servico = "Escolha o serviço que você precisa.";
    return e;
  }
  if (service.q2 && !v.q2) e.q2 = "Escolha uma opção.";
  if (!service.q2 && v.q2Texto.trim().length < 3) e.q2Texto = "Conte em poucas palavras qual serviço você procura.";
  if (service.q3 && !v.q3) e.q3 = "Escolha uma opção. Se ainda não sabe, marque “ainda não definido”.";
  if (v.q3 === "nao-se-aplica" && v.especificacoes.trim().length < 3)
    e.especificacoes = "Informe quantidade, dimensões ou especificações da peça.";
  if (!v.estagio) e.estagio = "Escolha o estágio do projeto.";
  if (!v.inicio) e.inicio = "Escolha quando pretende iniciar.";
  return e;
}

function validateStep2(v: LeadValues, file: File | null): Errors {
  const e: Errors = {};
  if (!v.solicitante) e.solicitante = "Escolha como você está solicitando.";
  if (v.nome.trim().split(/\s+/).filter(Boolean).length < 2) e.nome = "Informe nome e sobrenome.";
  if (ORG_REQUIRED.has(v.solicitante) && v.empresa.trim().length < 2) e.empresa = "Informe o nome da organização.";
  const phone = digits(v.whatsapp);
  if (phone.length < 10 || phone.length > 11) e.whatsapp = "Informe o WhatsApp com DDD, por exemplo (13) 99999-9999.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Informe um e-mail válido, por exemplo nome@empresa.com.br.";
  if (v.cidade.trim().length < 2) e.cidade = "Informe a cidade da obra.";
  if (!v.uf) e.uf = "Escolha o estado da obra.";
  if (file && file.size > MAX_FILE_BYTES)
    e.file = "O arquivo passa de 4 MB. Envie uma versão menor ou mande depois, quando a equipe entrar em contato.";
  return e;
}

/** Ordem visual dos campos, para focar o primeiro erro. */
const ORDER: (keyof Errors)[] = [
  "servico", "q2", "q2Texto", "q3", "especificacoes", "estagio", "inicio",
  "solicitante", "nome", "empresa", "whatsapp", "email", "cidade", "uf", "file",
];

export function LeadForm({ idPrefix, variant }: { idPrefix: string; variant: "modal" | "inline" }) {
  const { state, dispatch, attribution, close } = useLead();
  const { values: v, errors, step } = state;
  const service = getService(v.servico);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const id = (name: string) => `${idPrefix}-${name}`;

  // Ao mudar de etapa, leva o foco ao título (leitor de tela anuncia a nova etapa).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const form = formRef.current;
    if (!form || form.offsetParent === null) return;
    if (variant === "inline" && document.documentElement.classList.contains("modal-open")) return;
    headingRef.current?.focus({ preventScroll: variant === "modal" });
    if (variant === "inline") form.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, variant]);

  const set = (field: keyof LeadValues, value: string | boolean) => dispatch({ type: "set", field, value });

  function focusFirstError(errs: Errors) {
    const key = ORDER.find((k) => errs[k]);
    if (!key) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${key}"] input, [data-field="${key}"] select, [data-field="${key}"] textarea`);
    el?.focus();
  }

  function next(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep1(v);
    if (Object.keys(errs).length) {
      dispatch({ type: "errors", errors: errs });
      // Pergunta 1 recolhida com erro: abre para correção.
      if (errs.servico) dispatch({ type: "editService" });
      requestAnimationFrame(() => focusFirstError(errs));
      return;
    }
    dispatch({ type: "step", step: 2 });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state.submitting) return;
    const errs = { ...validateStep1(v), ...validateStep2(v, state.file) };
    if (Object.keys(validateStep1(v)).length) {
      dispatch({ type: "step", step: 1 });
      requestAnimationFrame(() => {
        dispatch({ type: "errors", errors: validateStep1(v) });
      });
      return;
    }
    if (Object.keys(errs).length) {
      dispatch({ type: "errors", errors: errs });
      requestAnimationFrame(() => focusFirstError(errs));
      return;
    }
    dispatch({ type: "submitting", value: true });
    try {
      const body = new FormData();
      body.set("dados", JSON.stringify({ ...v, origem: attribution.current }));
      if (state.file) body.set("anexo", state.file);
      const res = await fetch("/api/lead", { method: "POST", body });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; leadId?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Falha no envio");
      // Conversão só depois do envio concluído.
      trackLead({ servico: v.servico, tipo: v.q2 || undefined, leadId: json.leadId });
      dispatch({ type: "step", step: "done" });
    } catch {
      dispatch({
        type: "errors",
        errors: {
          submit: "Não conseguimos enviar agora. Verifique sua conexão e tente de novo. Seus dados continuam preenchidos.",
        },
      });
    } finally {
      dispatch({ type: "submitting", value: false });
    }
  }

  const titleId = variant === "modal" ? "modal-form-title" : id("title");

  if (step === "done") {
    return (
      <div className={`lead-form lead-form--${variant} lead-form--done`} role="status">
        <span className="lead-done__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" /></svg>
        </span>
        <h2 id={titleId} ref={headingRef} tabIndex={-1} className="lead-form__title">
          Solicitação recebida!
        </h2>
        <p className="lead-form__lede">
          Obrigado pelo contato. Nossa equipe analisará as informações enviadas e entrará em contato pelos dados informados.
        </p>
        {variant === "modal" && (
          <button type="button" className="btn btn--navy" onClick={close}>
            Fechar
          </button>
        )}
      </div>
    );
  }

  const requester = REQUESTERS.find((r) => r.value === v.solicitante);
  const showServiceChoice = !state.servicePreset || state.editingService || !service;
  const caldeiraria = service?.id === "estruturas-metalicas" && v.q2 === CALDEIRARIA_TIPO;

  return (
    <form
      ref={formRef}
      className={`lead-form lead-form--${variant}`}
      noValidate
      onSubmit={step === 1 ? next : submit}
      aria-labelledby={titleId}
    >
      <header className="lead-form__head">
        <ol className="lead-steps" aria-label="Etapas do formulário">
          <li className={step === 1 ? "is-current" : "is-done"} aria-current={step === 1 ? "step" : undefined}>
            <Chevron /> Sobre seu projeto
          </li>
          <li className={step === 2 ? "is-current" : ""} aria-current={step === 2 ? "step" : undefined}>
            <Chevron /> Seus dados
          </li>
        </ol>
        {step === 1 ? (
          <>
            <h2 id={titleId} ref={headingRef} tabIndex={-1} className="lead-form__title">
              Conte um pouco sobre seu projeto.
            </h2>
            <p className="lead-form__lede">
              Responda algumas perguntas rápidas para que nossa equipe entenda sua necessidade e direcione seu atendimento.
            </p>
          </>
        ) : (
          <>
            <h2 id={titleId} ref={headingRef} tabIndex={-1} className="lead-form__title">
              Para quem podemos enviar o retorno?
            </h2>
            <p className="lead-form__lede">
              Estamos quase terminando. Informe seus dados para que nossa equipe possa entrar em contato.
            </p>
          </>
        )}
      </header>

      {step === 1 && (
        <div className="lead-form__body" key="step1">
          {showServiceChoice ? (
            <Choice
              idBase={id("servico")}
              field="servico"
              legend="Qual serviço você precisa?"
              options={SERVICES.map((s) => ({ value: s.id, label: s.label }))}
              value={v.servico}
              error={errors.servico}
              onChange={(value) => dispatch({ type: "service", servico: value as ServiceId, preset: false })}
              columns={1}
            />
          ) : (
            <div className="service-locked" data-field="servico">
              <span className="service-locked__label">Serviço</span>
              <strong>
                <Chevron />
                {service?.label}
              </strong>
              <button type="button" className="link-btn" onClick={() => dispatch({ type: "editService" })}>
                Alterar serviço
              </button>
            </div>
          )}

          {service?.q2 && (
            <Choice
              idBase={id("q2")}
              field="q2"
              legend={service.q2.label}
              options={service.q2.options}
              value={v.q2}
              error={errors.q2}
              onChange={(value) => set("q2", value)}
            />
          )}

          {service && !service.q2 && (
            <Field id={id("q2Texto")} field="q2Texto" label="Qual serviço você procura?" error={errors.q2Texto}>
              <input
                id={id("q2Texto")}
                type="text"
                value={v.q2Texto}
                onChange={(e) => set("q2Texto", e.target.value)}
                aria-invalid={!!errors.q2Texto}
                aria-describedby={errors.q2Texto ? id("q2Texto-err") : undefined}
                maxLength={160}
              />
            </Field>
          )}

          {service?.q3 && (
            <Choice
              idBase={id("q3")}
              field="q3"
              legend={service.q3.label}
              options={q3Options(service, v.q2)}
              value={v.q3}
              error={errors.q3}
              onChange={(value) => set("q3", value)}
            />
          )}

          {caldeiraria && (
            <Field
              id={id("especificacoes")}
              field="especificacoes"
              label="Quantidade, dimensões ou especificações técnicas"
              optional={v.q3 !== "nao-se-aplica"}
              error={errors.especificacoes}
            >
              <textarea
                id={id("especificacoes")}
                rows={3}
                value={v.especificacoes}
                onChange={(e) => set("especificacoes", e.target.value)}
                placeholder="Ex.: 12 peças em aço carbono, 1,2 m × 0,8 m, chapa 3/8”"
                aria-invalid={!!errors.especificacoes}
                maxLength={1200}
              />
            </Field>
          )}

          {service && (
            <>
              <Choice
                idBase={id("estagio")}
                field="estagio"
                legend="Em qual estágio está seu projeto?"
                options={STAGES}
                value={v.estagio}
                error={errors.estagio}
                onChange={(value) => set("estagio", value)}
                columns={1}
              />
              <Choice
                idBase={id("inicio")}
                field="inicio"
                legend="Quando pretende iniciar?"
                options={START}
                value={v.inicio}
                error={errors.inicio}
                onChange={(value) => set("inicio", value)}
              />
              <Choice
                idBase={id("investimento")}
                field="investimento"
                legend="Qual é a faixa de investimento prevista?"
                optional
                options={BUDGET}
                value={v.investimento}
                onChange={(value) => set("investimento", value)}
              />
            </>
          )}

          <div className="lead-form__actions">
            <button type="submit" className="btn btn--gold btn--wide">
              Continuar
              <Chevron className="btn__arrow" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="lead-form__body" key="step2">
          <div className="lead-summary">
            <span>{service?.label}</span>
            {service?.q2 && v.q2 && <span>{service.q2.options.find((o) => o.value === v.q2)?.label}</span>}
            <button type="button" className="link-btn" onClick={() => dispatch({ type: "step", step: 1 })}>
              Revisar respostas
            </button>
          </div>

          <Choice
            idBase={id("solicitante")}
            field="solicitante"
            legend="Você está solicitando como:"
            options={REQUESTERS}
            value={v.solicitante}
            error={errors.solicitante}
            onChange={(value) => set("solicitante", value)}
          />

          <div className="field-grid">
            <Field id={id("nome")} field="nome" label="Nome completo" error={errors.nome} wide>
              <input
                id={id("nome")}
                type="text"
                autoComplete="name"
                value={v.nome}
                onChange={(e) => set("nome", e.target.value)}
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? id("nome-err") : undefined}
                maxLength={120}
              />
            </Field>
            {requester?.orgLabel !== null && (
              <Field
                id={id("empresa")}
                field="empresa"
                label={requester?.orgLabel ?? "Nome da empresa"}
                optional={!ORG_REQUIRED.has(v.solicitante)}
                error={errors.empresa}
              >
                <input
                  id={id("empresa")}
                  type="text"
                  autoComplete="organization"
                  value={v.empresa}
                  onChange={(e) => set("empresa", e.target.value)}
                  aria-invalid={!!errors.empresa}
                  aria-describedby={errors.empresa ? id("empresa-err") : undefined}
                  maxLength={160}
                />
              </Field>
            )}
            <Field id={id("cargo")} field="cargo" label="Cargo ou função" optional>
              <input
                id={id("cargo")}
                type="text"
                autoComplete="organization-title"
                value={v.cargo}
                onChange={(e) => set("cargo", e.target.value)}
                maxLength={120}
              />
            </Field>
            <Field id={id("whatsapp")} field="whatsapp" label="WhatsApp" error={errors.whatsapp}>
              <input
                id={id("whatsapp")}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="(13) 99999-9999"
                value={v.whatsapp}
                onChange={(e) => set("whatsapp", formatPhone(e.target.value))}
                aria-invalid={!!errors.whatsapp}
                aria-describedby={errors.whatsapp ? id("whatsapp-err") : undefined}
              />
            </Field>
            <Field id={id("email")} field="email" label="E-mail" error={errors.email}>
              <input
                id={id("email")}
                type="email"
                autoComplete="email"
                inputMode="email"
                value={v.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? id("email-err") : undefined}
                maxLength={160}
              />
            </Field>
            <Field id={id("cidade")} field="cidade" label="Cidade da obra" error={errors.cidade}>
              <input
                id={id("cidade")}
                type="text"
                autoComplete="address-level2"
                value={v.cidade}
                onChange={(e) => set("cidade", e.target.value)}
                aria-invalid={!!errors.cidade}
                aria-describedby={errors.cidade ? id("cidade-err") : undefined}
                maxLength={120}
              />
            </Field>
            <Field id={id("uf")} field="uf" label="Estado da obra" error={errors.uf}>
              <select
                id={id("uf")}
                value={v.uf}
                onChange={(e) => set("uf", e.target.value)}
                aria-invalid={!!errors.uf}
                aria-describedby={errors.uf ? id("uf-err") : undefined}
              >
                <option value="">Selecione</option>
                {UFS.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field
            id={id("mensagem")}
            field="mensagem"
            label="Gostaria de acrescentar alguma informação sobre o projeto?"
            optional
          >
            <textarea
              id={id("mensagem")}
              rows={4}
              value={v.mensagem}
              onChange={(e) => set("mensagem", e.target.value)}
              placeholder="Descreva brevemente sua necessidade, as características da obra ou qualquer informação importante."
              maxLength={3000}
            />
          </Field>

          <div className="field" data-field="file">
            <span className="field__label">
              Anexar projeto técnico <span className="field__opt">opcional</span>
            </span>
            <p className="field__hint" id={id("file-hint")}>
              Se já possui plantas, memorial descritivo ou documentos técnicos, você pode anexá-los para auxiliar na análise inicial. Até 4 MB.
            </p>
            <label className={`file-drop${state.file ? " has-file" : ""}`} htmlFor={id("file")}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
              </svg>
              <span>{state.file ? state.file.name : "Escolher arquivo"}</span>
              <input
                id={id("file")}
                type="file"
                accept={ACCEPTED_FILES}
                aria-describedby={`${id("file-hint")}${errors.file ? ` ${id("file-err")}` : ""}`}
                onChange={(e) => dispatch({ type: "file", file: e.target.files?.[0] ?? null })}
              />
            </label>
            {state.file && (
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  dispatch({ type: "file", file: null });
                  const input = formRef.current?.querySelector<HTMLInputElement>(`#${id("file")}`);
                  if (input) input.value = "";
                }}
              >
                Remover arquivo
              </button>
            )}
            {errors.file && (
              <p className="field__error" id={id("file-err")}>
                {errors.file}
              </p>
            )}
          </div>

          {/* Honeypot: invisível para pessoas */}
          <div className="hp" aria-hidden="true">
            <label htmlFor={id("website")}>Site</label>
            <input
              id={id("website")}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={v.website}
              onChange={(e) => set("website", e.target.value)}
            />
          </div>

          <div className="privacy">
            <p>
              Seus dados serão utilizados para analisar sua solicitação e realizar o contato comercial, conforme nossa{" "}
              <a href={PRIVACY_URL} target={PRIVACY_URL.startsWith("http") ? "_blank" : undefined} rel="noopener">
                Política de Privacidade
              </a>
              .
            </p>
            <label className="check" htmlFor={id("aceita")}>
              <input
                id={id("aceita")}
                type="checkbox"
                checked={v.aceitaComunicacoes}
                onChange={(e) => set("aceitaComunicacoes", e.target.checked)}
              />
              <span>
                Quero receber novidades do Grupo Carnevali. <span className="field__opt">opcional</span>
              </span>
            </label>
          </div>

          {errors.submit && (
            <p className="form-alert" role="alert">
              {errors.submit}
            </p>
          )}

          <div className="lead-form__actions">
            <button type="button" className="btn btn--ghost" onClick={() => dispatch({ type: "step", step: 1 })}>
              Voltar
            </button>
            <button type="submit" className="btn btn--gold btn--wide" disabled={state.submitting} aria-busy={state.submitting}>
              {state.submitting ? "Enviando…" : "Enviar solicitação"}
              {!state.submitting && <Chevron className="btn__arrow" />}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  id,
  field,
  label,
  optional,
  error,
  wide,
  children,
}: {
  id: string;
  field: string;
  label: string;
  optional?: boolean;
  error?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`field${error ? " has-error" : ""}${wide ? " field--wide" : ""}`} data-field={field}>
      <label className="field__label" htmlFor={id}>
        {label} {optional && <span className="field__opt">opcional</span>}
      </label>
      {children}
      {error && (
        <p className="field__error" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}

function Choice({
  idBase,
  field,
  legend,
  options,
  value,
  error,
  optional,
  columns = 2,
  onChange,
}: {
  idBase: string;
  field: string;
  legend: string;
  options: Option[];
  value: string;
  error?: string;
  optional?: boolean;
  columns?: 1 | 2;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset
      className={`choice${error ? " has-error" : ""}`}
      data-field={field}
      aria-describedby={error ? `${idBase}-err` : undefined}
    >
      <legend className="field__label">
        {legend} {optional && <span className="field__opt">opcional</span>}
      </legend>
      <div className={`choice__opts choice__opts--${columns}`}>
        {options.map((o) => (
          <label key={o.value} className="opt" htmlFor={`${idBase}-${o.value}`}>
            <input
              type="radio"
              id={`${idBase}-${o.value}`}
              name={idBase}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <span className="opt__box">{o.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="field__error" id={`${idBase}-err`}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
