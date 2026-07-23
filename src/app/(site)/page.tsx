import Link from "next/link";
import Image from "next/image";
import {
  Search,
  HeartHandshake,
  UserRoundSearch,
  CalendarCheck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import { TERAPEUTAS, ESPECIALIDADES, BLOG_POSTS } from "@/lib/data";
import { TherapistCard } from "@/components/therapist-card";
import { BannerCarousel } from "@/components/banner-carousel";
import { Button, Badge } from "@/components/ui";

export default function HomePage() {
  const destaques = TERAPEUTAS.filter((t) => t.destaque).slice(0, 3);

  return (
    <>
      {/* ============================================ BANNERS */}
      <BannerCarousel />

      {/* ============================================ HERO */}
      <section className="relative overflow-hidden bg-aurora">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -right-16 top-32 h-80 w-80 rounded-full bg-secondary/25 blur-3xl animate-blob [animation-delay:3s]" />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center animate-in">
            <Badge tone="primary" className="mb-5">
              <Sparkles className="h-3.5 w-3.5" /> Cuidado que faz sentido
            </Badge>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl">
              Encontre o profissional{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ideal para você!
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              <span className="font-semibold text-foreground">MyTerapie</span> — uma
              plataforma que conecta você a profissionais da área de saúde mental.
            </p>

            {/* Dois caminhos */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/descobrir" size="lg" className="w-full sm:w-auto">
                <UserRoundSearch className="h-5 w-5" /> Quero encontrar um profissional
              </Button>
              <Button
                href="/para-terapeutas"
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <HeartHandshake className="h-5 w-5" /> Sou terapeuta
              </Button>
            </div>
          </div>

          {/* Barra de busca */}
          <form
            action="/buscar"
            className="mx-auto mt-12 flex max-w-2xl flex-col gap-2 rounded-2xl border border-border bg-surface p-2 shadow-xl shadow-primary/5 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                name="q"
                placeholder="Nome, especialidade ou cidade…"
                className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Button type="submit" size="md" className="h-12">
              Buscar
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" /> Profissionais verificados
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 text-accent" /> Avaliações reais
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarCheck className="h-4 w-4 text-primary" /> Agendamento simples
            </span>
          </div>
        </div>
      </section>

      {/* ============================================ COMO FUNCIONA */}
      <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionTitle
          eyebrow="Como funciona"
          title="Três passos para começar"
          subtitle="Do primeiro clique à primeira sessão, sem complicação."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Search,
              t: "1. Busque",
              d: "Filtre por especialidade, abordagem, cidade, idioma e valores até encontrar quem combina com você.",
            },
            {
              icon: UserRoundSearch,
              t: "2. Conheça",
              d: "Explore perfis completos, vídeos de apresentação e avaliações de outros pacientes.",
            },
            {
              icon: CalendarCheck,
              t: "3. Agende",
              d: "Solicite um horário direto pela plataforma e comece sua jornada de cuidado.",
            },
          ].map((s) => (
            <div
              key={s.t}
              className="rounded-2xl border border-border bg-surface p-7 shadow-sm transition hover:shadow-lg"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-soft text-primary">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================ ESPECIALIDADES */}
      <section id="especialidades" className="bg-surface-muted/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Especialidades"
            title="Para cada momento, um cuidado"
            subtitle="Escolha o tema que mais faz sentido para você agora."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {ESPECIALIDADES.map((e) => (
              <Link
                key={e}
                href={`/buscar?especialidade=${encodeURIComponent(e)}`}
                className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                {e}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ DESTAQUES */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between">
          <SectionTitle
            align="left"
            eyebrow="Profissionais em destaque"
            title="Terapeutas bem avaliados"
          />
          <Link
            href="/buscar"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {destaques.map((t) => (
            <TherapistCard key={t.id} t={t} />
          ))}
        </div>
      </section>

      {/* ============================================ BLOG */}
      <section className="bg-surface-muted/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Blog"
            title="Conteúdo que cuida"
            subtitle="Reflexões e guias escritos por profissionais."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {BLOG_POSTS.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
                  <Image
                    src={p.capa}
                    alt={p.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <Badge tone="primary">{p.categoria}</Badge>
                  <h3 className="mt-3 font-semibold text-foreground group-hover:text-primary">
                    {p.titulo}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {p.resumo}
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {p.autor} · {p.leitura}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ CTA TERAPEUTAS */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary px-8 py-16 text-center shadow-2xl shadow-primary/20">
          <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              É terapeuta? Fortaleça a sua presença digital.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/90">
              Crie seu perfil profissional, conquiste novos pacientes e tenha uma
              landing page premium com URL própria.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href="/para-terapeutas"
                variant="secondary"
                size="lg"
                className="w-full bg-white text-primary hover:bg-white/90 sm:w-auto"
              >
                Quero ser terapeuta parceiro
              </Button>
              <Button
                href="/planos"
                size="lg"
                className="w-full border border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto"
              >
                Ver planos
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-muted-foreground ${
            align === "center" ? "mx-auto max-w-xl" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
