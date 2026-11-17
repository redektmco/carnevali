"use client";

import { getService, type ServiceId } from "@/lib/form-config";
import { useLead } from "./lead-context";
import { Chevron } from "./marks";

type Props = {
  children: React.ReactNode;
  className?: string;
  preset?: { servico: ServiceId; tipo?: string };
  arrow?: boolean;
  ariaLabel?: string;
};

/** Todo botão de proposta abre o formulário em modal, sem rolar a página. */
export function ProposalButton({ children, className = "btn btn--gold", preset, arrow = true, ariaLabel }: Props) {
  const { open } = useLead();
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      aria-label={ariaLabel}
      onClick={(e) => open(e.currentTarget, preset)}
    >
      {children}
      {arrow && <Chevron className="btn__arrow" />}
    </button>
  );
}

/** Aviso do serviço vindo do anúncio, mostrado no hero. */
export function CampaignNotice() {
  const { state } = useLead();
  const service = getService(state.values.servico);
  if (!state.servicePreset || !service) return null;
  const tipo = service.q2?.options.find((o) => o.value === state.values.q2)?.label;
  return (
    <p className="campaign-notice">
      <Chevron />
      <span>
        Seu atendimento: <strong>{tipo ?? service.label}</strong>
      </span>
    </p>
  );
}
