import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { themeScript } from "@/components/theme-toggle";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MyTerapie — Encontre o terapeuta ideal para a sua jornada",
    template: "%s · MyTerapie",
  },
  description:
    "Marketplace premium que conecta pacientes a terapeutas de confiança. Encontre por especialidade, abordagem e valores. Fortaleça sua presença como terapeuta.",
  keywords: ["terapia", "terapeuta", "psicanálise", "psicólogo", "saúde mental"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={jakarta.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
