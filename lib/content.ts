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

export type Photo = { src: string; alt: string; position?: string };

export type Project = {
  name: string;
  place?: string;
  service: string;
  /** Foto de capa no mosaico; a galeria abre com todas as fotos. */
  photos: Photo[];
  /** Ocupa duas colunas no mosaico (fotos panorâmicas). */
  wide?: boolean;
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
      alt: "Terminal 3 do Parque Valongo concluído, com fachada de vidro e empenas amarelas, visto do canal",
      position: "86% 60%",
    },
  ],
};

// Todas as obras do Portfólio Grupo Carnevali (versão enviada em 18/11/2026), na ordem do PDF,
// mais Zogaib e Obras em Santos, que vieram do Drive do cliente.
// Fotos sem pasta no Drive foram recortadas do PDF do portfólio e tratadas (cor, nitidez, ampliação).
export const PROJECTS: Project[] = [
  {
    name: "Escola Rei Pelé",
    service: "Edificação escolar em concreto armado e quadra coberta",
    wide: true,
    photos: [
      { src: "/img/reipele-fachada.webp", alt: "Fachada da Escola Rei Pelé concluída, branca com faixas amarelas", position: "50% 45%" },
      { src: "/img/reipele-estrutura.webp", alt: "Bomba de concreto lançando laje na estrutura da escola" },
      { src: "/img/reipele-quadra.webp", alt: "Quadra coberta com estrutura metálica em arco e piso azul" },
      { src: "/img/reipele.webp", alt: "Rede de drenagem em execução no terreno da escola" },
    ],
  },
  {
    name: "Magazine Luiza",
    place: "Mongaguá (SP)",
    service: "Estrutura metálica e fachada de loja",
    photos: [
      { src: "/img/magalu-fachada.webp", alt: "Fachada da loja Magazine Luiza concluída", position: "45% 50%" },
      { src: "/img/magalu.webp", alt: "Pilares e vigas metálicas montados dentro da edificação" },
      { src: "/img/magalu-estrutura.webp", alt: "Estrutura metálica de pavimentos em montagem" },
    ],
  },
  {
    name: "ADM do Brasil",
    place: "Três Corações (MG)",
    service: "Obra civil industrial: fundações e bases em concreto armado",
    photos: [
      { src: "/img/adm.webp", alt: "Equipe montando forma metálica circular de base industrial" },
      { src: "/img/adm-topo.webp", alt: "Concretagem de armação de base, com equipe uniformizada" },
    ],
  },
  {
    name: "Colégio Ecologia",
    service: "Demolição, estrutura e lajes em concreto armado",
    photos: [
      { src: "/img/ecologia-3.webp", alt: "Estrutura de concreto com escada e escoramento", position: "50% 35%" },
      { src: "/img/ecologia.webp", alt: "Armação de laje com vista para a cidade" },
      { src: "/img/ecologia-2.webp", alt: "Escoramento de madeira sob laje em execução" },
      { src: "/img/ecologia-1.webp", alt: "Fachada revestida após a obra" },
    ],
  },
  {
    name: "Deicmar",
    service: "Obras civis em terminal: demolição, guarita, drenagem e acessos",
    photos: [
      { src: "/img/deicmar-4.webp", alt: "Base de cancela pintada em amarelo e preto, com operário finalizando", position: "50% 60%" },
      { src: "/img/deicmar-2.webp", alt: "Guarita nova em bloco aparente com base de equipamento" },
      { src: "/img/deicmar-1.webp", alt: "Escavadeira demolindo edificação antiga no terminal" },
      { src: "/img/deicmar-6.webp", alt: "Retroescavadeira abrindo vala para drenagem no pátio" },
    ],
  },
  {
    name: "BTP Scanners",
    service: "Coberturas metálicas dos scanners em terminal portuário",
    wide: true,
    photos: [
      { src: "/img/scanners-grande.webp", alt: "Equipe e plataforma elevatória na montagem da cobertura metálica dos scanners", position: "50% 40%" },
      { src: "/img/scanners-a.webp", alt: "Cobertura metálica dos scanners concluída, com contêineres ao fundo" },
      { src: "/img/scanners-b.webp", alt: "Guindaste içando módulo da cobertura metálica" },
      { src: "/img/scanners-3.webp", alt: "Guindaste posicionando estrutura entre pilhas de contêineres" },
      { src: "/img/scanners-2.webp", alt: "Estrutura metálica verde vista por dentro" },
    ],
  },
  {
    name: "Creche Mongaguá",
    place: "Mongaguá (SP)",
    service: "Obra pública: edificação, cobertura e calçadas",
    wide: true,
    photos: [
      { src: "/img/creche-fachada.webp", alt: "Fachada da creche revestida em pastilhas brancas e azuis", position: "50% 55%" },
      { src: "/img/creche-esquina.webp", alt: "Creche vista da esquina, com cobertura de acesso" },
      { src: "/img/creche.webp", alt: "Calçada nova em frente à fachada revestida da creche" },
    ],
  },
  {
    name: "Edifício Praia de Cancum",
    service: "Edifício residencial",
    photos: [
      { src: "/img/cancum.webp", alt: "Edifício residencial de varandas envidraçadas", position: "50% 30%" },
    ],
  },
  {
    name: "Edifício By Side",
    service: "Edifício residencial",
    photos: [
      { src: "/img/byside.webp", alt: "Edifício residencial visto de baixo, contra o céu", position: "50% 30%" },
    ],
  },
  {
    name: "Zogaib",
    service: "Estrutura em concreto armado",
    photos: [
      { src: "/img/zogaib.webp", alt: "Escada em concreto recém-concretada, ainda com formas e escoras", position: "50% 60%" },
    ],
  },
  {
    name: "Obras em Santos, São Vicente e Itanhaém",
    service: "Construção de edificações",
    photos: [
      { src: "/img/santos.webp", alt: "Vista aérea de sobrados geminados concluídos" },
    ],
  },
  {
    name: "Protsan",
    service: "Estrutura metálica de cobertura e fachada comercial",
    wide: true,
    photos: [
      { src: "/img/protsan-fachada.webp", alt: "Fachada da loja Protsan Equipamentos concluída" },
      { src: "/img/protsan-estrutura.webp", alt: "Treliças metálicas da nova cobertura vistas de baixo" },
      { src: "/img/protsan-estrutura2.webp", alt: "Estrutura metálica da cobertura entre paredes de bloco" },
    ],
  },
];

export type Piece = { piece: string; client: string; src: string; alt: string };

/** Serviços de caldeiraria, como no portfólio: peça e cliente. */
export const CALDEIRARIA: Piece[] = [
  { piece: "Tubulação para despoeiramento", client: "Yara", src: "/img/cald-yara.webp", alt: "Tubulação metálica de grande diâmetro para despoeiramento" },
  { piece: "Peneira de coque", client: "Petrocoque", src: "/img/cald-peneira.webp", alt: "Peneira cilíndrica de coque em aço" },
  { piece: "Spools", client: "Petrobras", src: "/img/cald-spools.webp", alt: "Spools flangeados com nervuras" },
  { piece: "Degraus", client: "Petrocoque", src: "/img/cald-degraus.webp", alt: "Degraus em grade metálica empilhados" },
  { piece: "Spool", client: "Sabesp", src: "/img/cald-spool-sabesp.webp", alt: "Spool flangeado com revestimento interno verde" },
  { piece: "Curva de gomo", client: "Sabesp", src: "/img/cald-curva.webp", alt: "Curva de gomo soldada, pintada de verde" },
  { piece: "Cobertura do Piano Bar", client: "Teatro Coliseu", src: "/img/cald-coliseu.webp", alt: "Estrutura metálica curva da cobertura do Piano Bar" },
  { piece: "Tampa do chiller de resfriamento", client: "Petrobras", src: "/img/cald-chiller.webp", alt: "Tampa de chiller com flanges, pintada de cinza" },
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
