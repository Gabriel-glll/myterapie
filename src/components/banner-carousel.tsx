"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Banner = {
  icon: LucideIcon;
  titulo: string;
  texto: string;
  cta: string;
  href: string;
  gradient: string;
};

const BANNERS: Banner[] = [
  {
    icon: Sparkles,
    titulo: "Divulgue o seu perfil a partir de R$ 29,99",
    texto:
      "Fortaleça a sua presença digital e conquiste novos pacientes. Planos para todo terapeuta.",
    cta: "Quero divulgar meu perfil",
    href: "/para-terapeutas",
    gradient: "from-[#0b8f89] via-[#0fb5ae] to-[#4cc9f0]",
  },
  {
    icon: Users,
    titulo: "Vários profissionais, inúmeras especialidades",
    texto:
      "Na MyTerapie você encontra profissionais de saúde mental para cada momento e necessidade.",
    cta: "Explorar especialidades",
    href: "/buscar",
    gradient: "from-[#3a6fd8] via-[#4cc9f0] to-[#0fb5ae]",
  },
];

const INTERVALO = 10000;

export function BannerCarousel() {
  const [i, setI] = useState(0);
  const total = BANNERS.length;

  const go = (n: number) => setI(((n % total) + total) % total);

  useEffect(() => {
    const id = setInterval(() => setI((prev) => (prev + 1) % total), INTERVALO);
    return () => clearInterval(id);
  }, [total]);

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${i * 100}%)` }}
      >
        {BANNERS.map((b) => (
          <div key={b.titulo} className="w-full shrink-0">
            <div className={`bg-gradient-to-r ${b.gradient}`}>
              <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
                <div className="flex items-center gap-4">
                  <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white sm:flex">
                    <b.icon className="h-7 w-7" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                      {b.titulo}
                    </h2>
                    <p className="mt-1 max-w-xl text-sm text-white/90">{b.texto}</p>
                  </div>
                </div>
                <Link
                  href={b.href}
                  className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0b6f6a] shadow-lg transition hover:bg-white/90"
                >
                  {b.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Setas */}
      <button
        onClick={() => go(i - 1)}
        aria-label="Banner anterior"
        className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur transition hover:bg-white/40 sm:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(i + 1)}
        aria-label="Próximo banner"
        className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur transition hover:bg-white/40 sm:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => go(idx)}
            aria-label={`Ir para o banner ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${
              idx === i ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
