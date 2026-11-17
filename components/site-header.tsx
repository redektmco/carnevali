"use client";

import { useEffect, useState } from "react";
import { Logo } from "./marks";
import { ProposalButton } from "./proposal-button";

const NAV = [
  { href: "#areas", label: "Áreas de atuação" },
  { href: "#projetos", label: "Projetos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <a href="#topo" className="site-header__logo" aria-label="Grupo Carnevali, voltar ao início">
          <Logo negative />
        </a>
        <nav aria-label="Seções da página" className="site-header__nav">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <ProposalButton className="btn btn--gold btn--sm">
          <span className="only-wide">Solicitar proposta</span>
          <span className="only-narrow">Proposta</span>
        </ProposalButton>
      </div>
    </header>
  );
}
