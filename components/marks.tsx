// Formas derivadas do símbolo GC: o chevron do logo, em vez de ícones genéricos.

export function Chevron({ className }: { className?: string }) {
  // Seta para a direita: o "C" do logo espelhado, apontando o próximo passo.
  return (
    <svg className={`chev ${className ?? ""}`} viewBox="0 0 12 16" aria-hidden="true" focusable="false">
      <path d="M0 0h5.2L12 8l-6.8 8H0l6.8-8z" />
    </svg>
  );
}

/** Faixa em chevron, a mesma geometria das duas peças do símbolo. */
export function ChevronBand({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 240" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M120 0H86L0 120l86 120h34L34 120z" />
    </svg>
  );
}

export function Logo({ negative, className }: { negative?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={negative ? "/brand/carnevali-horizontal-negativo.svg" : "/brand/carnevali-horizontal.svg"}
      alt="Grupo Carnevali"
      width={1162}
      height={246}
    />
  );
}
