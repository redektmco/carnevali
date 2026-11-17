import type { Metadata, Viewport } from "next";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lp.grupocarnevali.com.br"),
  title: "Grupo Carnevali | Engenharia, estruturas metálicas, serralheria e vidro",
  description:
    "Obras de engenharia, estruturas metálicas e caldeiraria, reformas e retrofit, obras portuárias, serralheria, esquadrias e fachadas de vidro, com equipes especializadas e acompanhamento técnico.",
  applicationName: "Grupo Carnevali",
  icons: { icon: "/brand/carnevali-simbolo.svg" },
  openGraph: {
    title: "Grupo Carnevali | Soluções técnicas para cada etapa da obra",
    description:
      "Engenharia, estruturas metálicas, reformas, serralheria, esquadrias e vidro. Solicite uma proposta técnica.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/img/btp-depois.webp", width: 1600, height: 1200, alt: "Armazém 3, Parque Valongo, Santos" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1f2b50",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
