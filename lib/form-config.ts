// Configuração do formulário de pré-qualificação.
// Os slugs de `servico` e `tipo` são os mesmos usados nas URLs dos anúncios:
//   /?servico=estruturas-metalicas&tipo=caldeiraria

export type Option = { value: string; label: string };

export type ServiceId =
  | "obras-engenharia"
  | "estruturas-metalicas"
  | "serralheria-esquadrias"
  | "reformas-retrofit"
  | "outros";

export type Service = {
  id: ServiceId;
  label: string;
  /** Pergunta 2: tipo de projeto. `null` = serviço sem lista (pede texto livre). */
  q2: { label: string; options: Option[] } | null;
  /** Pergunta 3: porte ou área. */
  q3: { label: string; options: Option[] } | null;
};

export const SERVICES: Service[] = [
  {
    id: "obras-engenharia",
    label: "Obras de Engenharia",
    q2: {
      label: "Qual tipo de obra você precisa?",
      options: [
        { value: "nova-unidade", label: "Construção de nova unidade" },
        { value: "ampliacao", label: "Ampliação de instalações" },
        { value: "industrial", label: "Obra civil industrial" },
        { value: "comercial", label: "Obra comercial ou corporativa" },
        { value: "portuaria", label: "Obra portuária ou infraestrutura" },
        { value: "outra", label: "Outra obra" },
      ],
    },
    q3: {
      label: "Qual a área aproximada da obra?",
      options: [
        { value: "ate-500", label: "Até 500 m²" },
        { value: "501-2000", label: "De 501 a 2.000 m²" },
        { value: "2001-5000", label: "De 2.001 a 5.000 m²" },
        { value: "acima-5000", label: "Acima de 5.000 m²" },
        { value: "nao-definida", label: "Ainda não definida" },
      ],
    },
  },
  {
    id: "estruturas-metalicas",
    label: "Estruturas Metálicas e Caldeiraria",
    q2: {
      label: "Qual estrutura ou serviço você precisa?",
      options: [
        { value: "galpoes-coberturas", label: "Galpões e coberturas metálicas" },
        { value: "mezaninos-plataformas", label: "Mezaninos e plataformas" },
        { value: "estruturas-industriais", label: "Estruturas metálicas industriais" },
        { value: "caldeiraria", label: "Caldeiraria e fabricação de peças" },
        { value: "reforco-estrutural", label: "Reforço ou adequação estrutural" },
        { value: "outro", label: "Outro serviço" },
      ],
    },
    q3: {
      label: "Qual o porte aproximado do projeto?",
      options: [
        { value: "ate-100", label: "Até 100 m²" },
        { value: "101-500", label: "De 101 a 500 m²" },
        { value: "501-2000", label: "De 501 a 2.000 m²" },
        { value: "acima-2000", label: "Acima de 2.000 m²" },
        { value: "nao-definido", label: "Ainda não definido" },
      ],
    },
  },
  {
    id: "serralheria-esquadrias",
    label: "Serralheria, Esquadrias e Vidro",
    q2: {
      label: "Qual solução você procura?",
      options: [
        { value: "portas-janelas", label: "Portas e janelas de alumínio" },
        { value: "fachadas-vidro", label: "Fachadas de vidro" },
        { value: "guarda-corpos", label: "Guarda-corpos e corrimãos" },
        { value: "portoes-serralheria", label: "Portões e estruturas de serralheria" },
        { value: "fechamentos-vidro", label: "Fechamentos e divisórias em vidro" },
        { value: "outra", label: "Outra solução" },
      ],
    },
    q3: {
      label: "Qual o porte aproximado da demanda?",
      options: [
        { value: "pontual", label: "Serviço pontual" },
        { value: "multiplas-unidades", label: "Múltiplas unidades ou peças" },
        { value: "comercial-medio", label: "Projeto comercial de médio porte" },
        { value: "grande-porte", label: "Projeto de grande porte" },
        { value: "nao-definido", label: "Ainda não definido" },
      ],
    },
  },
  {
    id: "reformas-retrofit",
    label: "Reformas, Retrofit e Revitalizações",
    q2: {
      label: "Qual serviço você precisa?",
      options: [
        { value: "industrial", label: "Reforma industrial" },
        { value: "comercial", label: "Reforma comercial ou corporativa" },
        { value: "retrofit", label: "Retrofit e modernização" },
        { value: "fachadas", label: "Revitalização de fachadas" },
        { value: "adequacao", label: "Adequação de instalações" },
        { value: "outra", label: "Outra intervenção" },
      ],
    },
    q3: {
      label: "Qual a área aproximada da intervenção?",
      options: [
        { value: "ate-500", label: "Até 500 m²" },
        { value: "501-2000", label: "De 501 a 2.000 m²" },
        { value: "acima-2000", label: "Acima de 2.000 m²" },
        { value: "nao-definida", label: "Ainda não definida" },
      ],
    },
  },
  {
    id: "outros",
    label: "Outros serviços",
    q2: null,
    q3: null,
  },
];

/** Caldeiraria: m² nem sempre se aplica. Esta opção extra libera o campo de especificações. */
export const CALDEIRARIA_TIPO = "caldeiraria";
export const PORTE_NAO_SE_APLICA: Option = {
  value: "nao-se-aplica",
  label: "Não se aplica: vou informar quantidade, dimensões ou especificações",
};

export const STAGES: Option[] = [
  { value: "planejamento", label: "Estou na fase de planejamento" },
  { value: "em-desenvolvimento", label: "O projeto está em desenvolvimento" },
  { value: "projeto-definido", label: "Já tenho um projeto técnico definido" },
  { value: "buscando-orcamentos", label: "Estou buscando fornecedores e orçamentos" },
  { value: "em-execucao", label: "A obra ou serviço já está em execução" },
];

export const START: Option[] = [
  { value: "ate-30-dias", label: "Imediatamente ou em até 30 dias" },
  { value: "1-3-meses", label: "Entre 1 e 3 meses" },
  { value: "3-6-meses", label: "Entre 3 e 6 meses" },
  { value: "mais-6-meses", label: "Daqui a mais de 6 meses" },
  { value: "sem-previsao", label: "Ainda não tenho previsão" },
];

// Faixas sugeridas no briefing: validar com o comercial antes de publicar.
export const BUDGET: Option[] = [
  { value: "ate-50k", label: "Até R$ 50 mil" },
  { value: "50k-150k", label: "De R$ 50 mil a R$ 150 mil" },
  { value: "150k-500k", label: "De R$ 150 mil a R$ 500 mil" },
  { value: "500k-1m", label: "De R$ 500 mil a R$ 1 milhão" },
  { value: "acima-1m", label: "Acima de R$ 1 milhão" },
  { value: "sem-orcamento", label: "Ainda não tenho orçamento definido" },
  { value: "nao-informar", label: "Prefiro não informar" },
];

export type RequesterOption = Option & {
  /** Rótulo do campo de organização, ou `null` quando não se aplica. */
  orgLabel: string | null;
};

export const REQUESTERS: RequesterOption[] = [
  { value: "empresa", label: "Empresa ou indústria", orgLabel: "Nome da empresa" },
  { value: "construtora", label: "Construtora ou incorporadora", orgLabel: "Nome da empresa" },
  { value: "condominio", label: "Condomínio ou administração predial", orgLabel: "Nome do condomínio ou administradora" },
  { value: "profissional", label: "Profissional de engenharia ou arquitetura", orgLabel: "Empresa ou escritório (se houver)" },
  { value: "orgao-publico", label: "Órgão público", orgLabel: "Nome do órgão" },
  { value: "pessoa-fisica", label: "Pessoa física", orgLabel: null },
  { value: "outro", label: "Outro", orgLabel: "Empresa ou organização (se houver)" },
];

/** Organização obrigatória só para quem representa empresa, condomínio ou órgão. */
export const ORG_REQUIRED = new Set(["empresa", "construtora", "condominio", "orgao-publico"]);

export const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

export const MAX_FILE_BYTES = 4 * 1024 * 1024; // limite de corpo da Vercel (4,5 MB) com folga
export const ACCEPTED_FILES = ".pdf,.jpg,.jpeg,.png,.dwg,.dxf,.zip,.doc,.docx,.xls,.xlsx";

export function getService(id: string | null | undefined): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function labelOf(options: Option[] | undefined, value: string): string {
  return options?.find((o) => o.value === value)?.label ?? value;
}

/** Opções da pergunta 3, com a saída de caldeiraria quando aplicável. */
export function q3Options(service: Service | undefined, q2: string): Option[] {
  if (!service?.q3) return [];
  if (service.id === "estruturas-metalicas" && q2 === CALDEIRARIA_TIPO) {
    return [...service.q3.options, PORTE_NAO_SE_APLICA];
  }
  return service.q3.options;
}
