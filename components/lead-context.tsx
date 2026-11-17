"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { captureAttribution, type Attribution } from "@/lib/tracking";
import { getService, type ServiceId } from "@/lib/form-config";
import { LeadForm } from "./lead-form";

export type LeadValues = {
  servico: ServiceId | "";
  q2: string;
  q2Texto: string; // "Outros serviços": descrição livre
  q3: string;
  especificacoes: string; // caldeiraria
  estagio: string;
  inicio: string;
  investimento: string;
  solicitante: string;
  nome: string;
  empresa: string;
  cargo: string;
  whatsapp: string;
  email: string;
  cidade: string;
  uf: string;
  mensagem: string;
  aceitaComunicacoes: boolean;
  website: string; // honeypot
};

export type Step = 1 | 2 | "done";

export type LeadState = {
  values: LeadValues;
  file: File | null;
  step: Step;
  errors: Partial<Record<keyof LeadValues | "file" | "submit", string>>;
  /** Serviço veio pronto (anúncio ou atalho): a pergunta 1 fica recolhida. */
  servicePreset: boolean;
  /** Visitante pediu para trocar o serviço pré-selecionado. */
  editingService: boolean;
  submitting: boolean;
};

const EMPTY: LeadValues = {
  servico: "",
  q2: "",
  q2Texto: "",
  q3: "",
  especificacoes: "",
  estagio: "",
  inicio: "",
  investimento: "",
  solicitante: "",
  nome: "",
  empresa: "",
  cargo: "",
  whatsapp: "",
  email: "",
  cidade: "",
  uf: "",
  mensagem: "",
  aceitaComunicacoes: false,
  website: "",
};

type Action =
  | { type: "set"; field: keyof LeadValues; value: string | boolean }
  | { type: "service"; servico: ServiceId; tipo?: string; preset: boolean }
  | { type: "editService" }
  | { type: "file"; file: File | null }
  | { type: "errors"; errors: LeadState["errors"] }
  | { type: "step"; step: Step }
  | { type: "submitting"; value: boolean }
  | { type: "reset" };

function reducer(state: LeadState, action: Action): LeadState {
  switch (action.type) {
    case "set": {
      const values = { ...state.values, [action.field]: action.value };
      const errors = { ...state.errors };
      delete errors[action.field];
      delete errors.submit;
      // Trocar o tipo pode tirar a opção "não se aplica" do porte.
      if (action.field === "q2" && state.values.q3 === "nao-se-aplica") values.q3 = "";
      return { ...state, values, errors };
    }
    case "service": {
      const service = getService(action.servico);
      const sameService = state.values.servico === action.servico;
      const tipo =
        action.tipo && service?.q2?.options.some((o) => o.value === action.tipo)
          ? action.tipo
          : sameService
            ? state.values.q2
            : "";
      return {
        ...state,
        values: {
          ...state.values,
          servico: action.servico,
          // As perguntas condicionais dependem do serviço: zeram ao trocar.
          q2: tipo,
          q2Texto: sameService ? state.values.q2Texto : "",
          q3: sameService ? state.values.q3 : "",
          especificacoes: sameService ? state.values.especificacoes : "",
        },
        errors: {},
        servicePreset: action.preset || state.servicePreset,
        editingService: action.preset ? false : state.editingService,
      };
    }
    case "editService":
      return { ...state, editingService: true };
    case "file": {
      const errors = { ...state.errors };
      delete errors.file;
      return { ...state, file: action.file, errors };
    }
    case "errors":
      return { ...state, errors: action.errors };
    case "step":
      return { ...state, step: action.step, errors: {} };
    case "submitting":
      return { ...state, submitting: action.value };
    case "reset":
      return { ...INITIAL };
  }
}

const INITIAL: LeadState = {
  values: EMPTY,
  file: null,
  step: 1,
  errors: {},
  servicePreset: false,
  editingService: false,
  submitting: false,
};

type Ctx = {
  state: LeadState;
  dispatch: React.Dispatch<Action>;
  attribution: React.RefObject<Attribution>;
  /** Abre o formulário em modal, opcionalmente com serviço já escolhido. */
  open: (trigger?: HTMLElement | null, preset?: { servico: ServiceId; tipo?: string }) => void;
  close: () => void;
  isModalOpen: boolean;
};

const LeadContext = createContext<Ctx | null>(null);

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead fora do LeadProvider");
  return ctx;
}

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const attribution = useRef<Attribution>({});
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Pré-seleção pelo anúncio: ?servico=...&tipo=...
  useEffect(() => {
    attribution.current = captureAttribution();
    const params = new URLSearchParams(window.location.search);
    const servico = params.get("servico");
    if (getService(servico)) {
      dispatch({
        type: "service",
        servico: servico as ServiceId,
        tipo: params.get("tipo") ?? undefined,
        preset: true,
      });
    }
  }, []);

  const open = useCallback<Ctx["open"]>((trigger, preset) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (preset) dispatch({ type: "service", ...preset, preset: true });
    // O painel nasce do botão que o chamou (origem espacial).
    if (trigger) {
      const r = trigger.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      dialog.style.setProperty("--origin-x", `${Math.round(x - window.innerWidth / 2)}px`);
      dialog.style.setProperty("--origin-y", `${Math.round(y - window.innerHeight / 2)}px`);
    }
    if (!dialog.open) dialog.showModal();
    document.documentElement.classList.add("modal-open");
    setModalOpen(true);
  }, []);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    dialog.classList.add("is-closing");
    const done = () => {
      dialog.classList.remove("is-closing");
      dialog.close();
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) done();
    else window.setTimeout(done, 200);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.documentElement.classList.remove("modal-open");
      setModalOpen(false);
    };
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("cancel", onCancel);
    };
  }, [close]);

  const value = useMemo(
    () => ({ state, dispatch, attribution, open, close, isModalOpen }),
    [state, open, close, isModalOpen],
  );

  return (
    <LeadContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        className="lead-dialog"
        aria-labelledby="modal-form-title"
        onClick={(e) => {
          // Clique no fundo escurecido fecha.
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="lead-dialog__panel">
          <button type="button" className="lead-dialog__close" onClick={close} aria-label="Fechar formulário">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {isModalOpen && <LeadForm idPrefix="modal" variant="modal" />}
        </div>
      </dialog>
    </LeadContext.Provider>
  );
}
