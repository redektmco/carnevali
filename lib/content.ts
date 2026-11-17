import type { ServiceId } from "./form-config";

// Textos aprovados no briefing da agência. Fotos: Drive do cliente (pasta FOTOS).
// ATENÇÃO: os serviços atribuídos a cada projeto do portfólio foram deduzidos das fotos
// e precisam de validação do Grupo Carnevali antes da publicação.

export type Area = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  preset: { servico: ServiceId; tipo?: string };
};

export const AREAS: Area[] = [
  {
    title: "Obras de Engenharia",
    text: "Execução de obras civis, industriais, comerciais e estruturais, com atenção às exigências técnicas de cada ambiente.",
    image: "/img/ecologia.webp",
    imageAlt: "Armação de laje em obra da Escola Ecologia",
    preset: { servico: "obras-engenharia" },
  },
  {
    title: "Estruturas Metálicas e Caldeiraria",
    text: "Fabricação e montagem de estruturas metálicas para aplicações industriais e projetos que exigem soluções robustas.",
    image: "/img/magalu.webp",
    imageAlt: "Pilares e vigas metálicas montados em obra do Magazine Luiza em Mongaguá",
    preset: { servico: "estruturas-metalicas" },
  },
  {
    title: "Reformas, Retrofit e Revitalizações",
    text: "Intervenções para recuperar, adequar e modernizar edificações, fachadas e instalações existentes.",
    image: "/img/btp-trelica.webp",
    imageAlt: "Guindaste içando treliça da cobertura antiga do Armazém 3, em Santos",
    preset: { servico: "reformas-retrofit" },
  },
  {
    title: "Obras Portuárias e Infraestrutura",
    text: "Serviços civis e estruturais para operações portuárias e ambientes de maior exigência operacional.",
    image: "/img/btp-porto.webp",
    imageAlt: "Caminhão com guindaste em área portuária, com portêineres ao fundo",
    preset: { servico: "obras-engenharia", tipo: "portuaria" },
  },
  {
    title: "Serralheria e Esquadrias",
    text: "Soluções sob medida em alumínio e serralheria, incluindo portas, janelas, guarda-corpos e outras aplicações.",
    image: "/img/btp-render-noite.webp",
    imageAlt: "Perspectiva do Armazém 3 com caixilharia, guarda-corpos e passarela",
    preset: { servico: "serralheria-esquadrias" },
  },
  {
    title: "Fachadas e Soluções em Vidro",
    text: "Sistemas de vidro e fachadas que unem especificação técnica, funcionalidade e acabamento para cada projeto.",
    image: "/img/btp-fachada.webp",
    imageAlt: "Fachada de vidro do Armazém 3, vista do canal do porto de Santos",
    preset: { servico: "serralheria-esquadrias", tipo: "fachadas-vidro" },
  },
];

export type Project = {
  name: string;
  place?: string;
  service: string;
  image: string;
  alt: string;
  /** Proporção de exibição no mosaico. */
  shape: "wide" | "tall" | "square";
  position?: string;
};

export const FEATURED = {
  name: "Armazém 3 · Parque Valongo",
  client: "BTP",
  place: "Santos (SP)",
  service: "Revitalização de armazém portuário: desmontagem da cobertura antiga, estrutura metálica e fachada em vidro",
  stages: [
    {
      label: "Antes",
      image: "/img/btp-antes.webp",
      alt: "Armazéns antigos em ruínas ao lado da linha férrea, com portêineres ao fundo",
      position: "50% 30%",
    },
    {
      label: "Durante",
      image: "/img/btp-trelica-porto.webp",
      alt: "Guindaste içando estrutura de cobertura antiga, com portêineres ao fundo",
      position: "50% 50%",
    },
    {
      label: "Depois",
      image: "/img/btp-depois.webp",
      alt: "Armazém 3 concluído, com fachada de vidro, visto do canal",
      position: "40% 55%",
    },
  ],
};

export const PROJECTS: Project[] = [
  {
    name: "Magazine Luiza",
    place: "Mongaguá (SP)",
    service: "Estrutura metálica em obra comercial",
    image: "/img/magalu.webp",
    alt: "Estrutura metálica montada dentro de edificação comercial",
    shape: "wide",
  },
  {
    name: "ADM do Brasil",
    place: "Três Corações (MG)",
    service: "Obra civil industrial",
    image: "/img/adm.webp",
    alt: "Equipe montando forma metálica circular de base industrial",
    shape: "square",
  },
  {
    name: "Zogaib",
    service: "Estrutura em concreto armado",
    image: "/img/zogaib.webp",
    alt: "Escada em concreto recém-concretada, ainda com formas e escoras",
    shape: "tall",
    position: "50% 60%",
  },
  {
    name: "Escola Ecologia",
    service: "Laje em concreto armado",
    image: "/img/ecologia.webp",
    alt: "Armação de laje com vista para a cidade",
    shape: "wide",
  },
  {
    name: "Obras em Santos, São Vicente e Itanhaém",
    service: "Construção de edificações",
    image: "/img/santos.webp",
    alt: "Vista aérea de sobrados geminados concluídos",
    shape: "square",
  },
  {
    name: "Creche",
    place: "Mongaguá (SP)",
    service: "Obra pública: edificação e calçadas",
    image: "/img/creche.webp",
    alt: "Calçada nova em frente à fachada revestida da creche",
    shape: "tall",
    position: "50% 70%",
  },
];

export const DIFFERENTIALS = [
  {
    title: "Acompanhamento Técnico",
    text: "Profissionais preparados para acompanhar as exigências e as etapas de cada serviço.",
  },
  {
    title: "Soluções Integradas",
    text: "Diferentes especialidades para atender necessidades de obras, estruturas e acabamentos.",
  },
  {
    title: "Execução Sob Medida",
    text: "Avaliação do escopo para desenvolver uma solução compatível com a demanda apresentada.",
  },
  {
    title: "Experiência em Diferentes Ambientes",
    text: "Atuação em projetos industriais, comerciais, estruturais e portuários.",
  },
];

export const SECTORS = [
  { title: "Indústrias e fábricas", image: "/img/adm.webp", alt: "Obra industrial com equipe em campo" },
  { title: "Operações portuárias e logísticas", image: "/img/btp-porto.webp", alt: "Área portuária com portêineres" },
  { title: "Construtoras e incorporadoras", image: "/img/santos.webp", alt: "Sobrados geminados concluídos" },
  { title: "Empreendimentos comerciais", image: "/img/btp-render-aereo.webp", alt: "Perspectiva aérea do complexo comercial do Parque Valongo" },
  { title: "Infraestrutura", image: "/img/reipele.webp", alt: "Rede de drenagem em execução" },
  { title: "Projetos especiais", image: "/img/btp-climatizacao.webp", alt: "Base de equipamentos de climatização em área histórica" },
];

export const STEPS = [
  {
    title: "Conte sua necessidade",
    text: "Informe o serviço procurado, a localização e o estágio do projeto.",
  },
  {
    title: "Avaliação do escopo",
    text: "Nossa equipe analisa as informações iniciais e identifica os próximos dados necessários.",
  },
  {
    title: "Contato comercial",
    text: "Entramos em contato para dar continuidade ao atendimento e à elaboração de uma proposta, quando aplicável.",
  },
];

export const FAQ = [
  {
    q: "A Carnevali atende somente obras industriais?",
    a: "Não. O grupo também apresenta soluções para obras comerciais, estruturais, portuárias, reformas, esquadrias, serralheria e vidro.",
  },
  {
    q: "Preciso ter um projeto técnico pronto?",
    a: "Não necessariamente. Informe o estágio atual da demanda para que a equipe possa orientar a avaliação inicial.",
  },
  {
    q: "Como posso pedir um orçamento?",
    a: "Preencha o formulário com o tipo de serviço, os dados da obra e seu contato. A equipe avaliará a solicitação.",
  },
  {
    q: "Vocês atendem fora de Santos?",
    a: "A possibilidade de atendimento depende do serviço, do local e do porte da demanda. Informe a cidade e o estado da obra para análise.",
  },
];
