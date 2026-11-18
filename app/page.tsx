import { LeadProvider } from "@/components/lead-context";
import { LeadForm } from "@/components/lead-form";
import { Chevron, ChevronBand, Logo } from "@/components/marks";
import { CampaignNotice, ProposalButton } from "@/components/proposal-button";
import { SiteHeader } from "@/components/site-header";
import { ProjectGallery } from "@/components/project-gallery";
import { AREAS, CALDEIRARIA, DIFFERENTIALS, FAQ, FEATURED, PROJECTS, SECTORS, STEPS } from "@/lib/content";

const PRIVACY_URL = process.env.NEXT_PUBLIC_PRIVACY_URL || "#politica-de-privacidade";

export default function Home() {
  return (
    <LeadProvider>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <SiteHeader />

      <main id="conteudo">
        {/* 01 · HERO */}
        <section className="hero" id="topo" aria-labelledby="hero-title">
          <div className="hero__grid wrap">
            <div className="hero__copy">
              <h1 id="hero-title" className="display">
                Sua obra exige <em>precisão</em>. Conte com soluções técnicas para cada etapa do projeto.
              </h1>
              <p className="hero__sub">
                O Grupo Carnevali atua em obras de engenharia, estruturas metálicas, reformas, serralheria, esquadrias e
                soluções em vidro, com equipes especializadas e acompanhamento técnico.
              </p>
              <CampaignNotice />
              <div className="hero__actions">
                <ProposalButton>Solicitar proposta técnica</ProposalButton>
                <a className="btn btn--outline-light" href="#projetos">
                  Conhecer nossos projetos
                </a>
              </div>
            </div>

            <figure className="hero__media">
              <ChevronBand className="hero__band" />
              <div className="hero__window">
                <img
                  src="/img/btp-icamento.webp"
                  alt="Equipe acompanha o içamento de uma treliça de cobertura por guindaste"
                  width={900}
                  height={1600}
                  fetchPriority="high"
                />
              </div>
              <figcaption className="caption caption--light">Armazém 3 · Parque Valongo, Santos (SP)</figcaption>
            </figure>
          </div>

          <p className="hero__rule wrap">
            <span>Engenharia</span>
            <i aria-hidden="true" />
            <span>Estruturas metálicas</span>
            <i aria-hidden="true" />
            <span>Serralheria e vidro</span>
          </p>
        </section>

        {/* 02 · ÁREAS DE ATUAÇÃO */}
        <section className="section section--concrete" id="areas" aria-labelledby="areas-title">
          <div className="wrap areas">
            <div className="areas__intro">
              <h2 id="areas-title" className="headline">
                Soluções para diferentes necessidades da sua obra.
              </h2>
              <p className="lede">
                Reunimos especialidades que ajudam empresas, gestores e profissionais a encontrar soluções adequadas ao
                escopo de cada projeto.
              </p>
              <ProposalButton className="btn btn--navy">Solicitar proposta</ProposalButton>
            </div>

            <ul className="areas__list">
              {AREAS.map((area) => (
                <li key={area.title} className="area">
                  <div className="area__img">
                    <img src={area.image} alt={area.imageAlt} loading="lazy" width={240} height={180} />
                    {area.image.includes("render") && <span className="tag">Perspectiva</span>}
                  </div>
                  <div className="area__text">
                    <h3 className="title">{area.title}</h3>
                    <p>{area.text}</p>
                  </div>
                  <ProposalButton
                    className="area__cta"
                    preset={area.preset}
                    ariaLabel={`Solicitar proposta de ${area.title}`}
                  >
                    <span>Pedir proposta</span>
                  </ProposalButton>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 03 · PORTFÓLIO */}
        <section className="section" id="projetos" aria-labelledby="projetos-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="projetos-title" className="headline">
                Projetos que mostram nossa experiência em campo.
              </h2>
              <p className="lede">
                Conheça as obras do portfólio do Grupo Carnevali e veja como diferentes demandas se transformam em
                entregas. Abra cada projeto para ver mais fotos.
              </p>
            </div>

            <article className="featured" aria-labelledby="featured-title">
              <div className="featured__stages">
                {FEATURED.stages.map((stage, i) => (
                  <figure key={stage.label} className={`stage stage--${i + 1}`}>
                    <img src={stage.image} alt={stage.alt} loading="lazy" style={{ objectPosition: stage.position }} />
                    <figcaption>
                      <Chevron />
                      {stage.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className="featured__info">
                <p className="caption">
                  {FEATURED.client} · {FEATURED.place}
                </p>
                <h3 id="featured-title" className="featured__name">
                  {FEATURED.name}
                </h3>
                <p>{FEATURED.service}</p>
              </div>
            </article>

            <ProjectGallery projects={PROJECTS} pieces={CALDEIRARIA} />

            <div className="section-cta">
              <ProposalButton className="btn btn--navy">Quero apresentar meu projeto</ProposalButton>
            </div>
          </div>
        </section>

        {/* 04 · DIFERENCIAIS */}
        <section className="section section--navy diffs" id="diferenciais" aria-labelledby="diffs-title">
          <div className="wrap">
            <div className="diffs__head">
              <h2 id="diffs-title" className="headline headline--light">
                Mais confiança para quem precisa contratar. <span>Mais atenção aos detalhes de quem executa.</span>
              </h2>
              <p className="lede lede--light">
                Uma obra envolve decisões, prazos, pessoas e responsabilidades. Por isso, a escolha de quem vai executar
                cada etapa faz diferença.
              </p>
            </div>
            <ul className="diffs__list">
              {DIFFERENTIALS.map((d) => (
                <li key={d.title}>
                  <Chevron />
                  <h3 className="title">{d.title}</h3>
                  <p>{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="diffs__photo" aria-hidden="true">
            <img src="/img/btp-trelica.webp" alt="" loading="lazy" />
          </div>
        </section>

        {/* 05 · SETORES */}
        <section className="section section--concrete" id="setores" aria-labelledby="setores-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="setores-title" className="headline">
                Soluções para diferentes setores e tipos de empreendimento.
              </h2>
              <p className="lede">
                Atendemos demandas de indústrias, operações portuárias e logísticas, empresas, comércios, infraestrutura,
                construtoras e projetos especiais, conforme o serviço e a região.
              </p>
            </div>
            <ul className="sectors">
              {SECTORS.map((s) => (
                <li key={s.title} className="sector">
                  <img src={s.image} alt={s.alt} loading="lazy" />
                  {s.image.includes("render") && <span className="tag">Perspectiva do projeto</span>}
                  <span className="sector__label">
                    <Chevron />
                    {s.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 06 · COMO FUNCIONA */}
        <section className="section" id="como-funciona" aria-labelledby="como-title">
          <div className="wrap">
            <h2 id="como-title" className="headline steps-title">
              O primeiro passo é entender o seu projeto.
            </h2>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="step">
                  <span className="step__n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="title">{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="section-cta section-cta--start">
              <ProposalButton>Enviar informações do projeto</ProposalButton>
            </div>
          </div>
        </section>

        {/* 07 · FAQ */}
        <section className="section section--concrete" id="duvidas" aria-labelledby="faq-title">
          <div className="wrap faq">
            <h2 id="faq-title" className="headline">
              Perguntas frequentes
            </h2>
            <div className="faq__list">
              {FAQ.map((item) => (
                <details key={item.q} className="faq__item">
                  <summary>
                    <span>{item.q}</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M12 5v14" />
                    </svg>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 08 + 09 · CHAMADA FINAL + FORMULÁRIO */}
        <section className="section section--navy final" id="proposta" aria-labelledby="final-title">
          <div className="wrap final__grid">
            <div className="final__copy">
              <h2 id="final-title" className="headline headline--light">
                Tem uma obra ou projeto em andamento? Vamos conversar sobre sua necessidade.
              </h2>
              <p className="lede lede--light">
                Compartilhe as informações principais do seu projeto para que nossa equipe possa avaliar a demanda e
                entrar em contato.
              </p>
              <ChevronBand className="final__band" />
            </div>
            <div className="final__form">
              <LeadForm idPrefix="inline" variant="inline" />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap site-footer__inner">
          <Logo negative className="site-footer__logo" />
          <p>Santos (SP) · Engenharia, estruturas metálicas, reformas, serralheria, esquadrias e vidro.</p>
          <nav aria-label="Rodapé" className="site-footer__links">
            <a href={PRIVACY_URL}>Política de Privacidade</a>
            <ProposalButton className="link-btn link-btn--light" arrow={false}>
              Solicitar proposta técnica
            </ProposalButton>
          </nav>
          <p className="site-footer__copy">© {new Date().getFullYear()} Grupo Carnevali</p>
        </div>
      </footer>
    </LeadProvider>
  );
}
