import {
  TrendingUp,
  Users,
  Globe,
  Star,
  CalendarCheck,
  LayoutTemplate,
  ArrowRight,
} from "lucide-react";
import { PlanCards } from "@/components/plan-cards";
import { Button, Badge } from "@/components/ui";

export const metadata = { title: "Sou terapeuta" };

const beneficios = [
  {
    icon: TrendingUp,
    t: "Aumente sua presença digital",
    d: "Seja encontrado por pacientes que buscam exatamente a sua especialidade.",
  },
  {
    icon: Users,
    t: "Conquiste novos pacientes",
    d: "Receba solicitações de agendamento diretamente pela plataforma.",
  },
  {
    icon: Star,
    t: "Fortaleça sua reputação",
    d: "Avaliações reais de pacientes constroem a sua imagem profissional.",
  },
  {
    icon: LayoutTemplate,
    t: "Landing page premium",
    d: "Um mini site pessoal, lindo e focado em conversão, com URL própria.",
  },
  {
    icon: CalendarCheck,
    t: "Gestão de agenda",
    d: "Controle horários livres e indisponíveis, férias e almoço.",
  },
  {
    icon: Globe,
    t: "Online ou presencial",
    d: "Atenda como preferir e defina suas modalidades e valores.",
  },
];

const passos = [
  ["1", "Escolha seu plano", "Inicial, Completo ou Premium."],
  ["2", "Confirme o pagamento", "Assinatura mensal simples e segura."],
  ["3", "Complete o cadastro", "Preencha seu perfil por etapas."],
  ["4", "Publique e receba", "Seu perfil no ar, recebendo solicitações."],
];

export default function ParaTerapeutasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-aurora">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <Badge tone="primary" className="mb-5">
            Para terapeutas
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Fortaleça sua imagem e{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              conquiste pacientes
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            A MyTerapie ajuda terapeutas a construir uma presença digital premium.
            Comece hoje e leve sua prática para o próximo nível.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/cadastro" size="lg">
              Começar agora <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="#planos" size="lg" variant="outline">
              Ver planos
            </Button>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((b) => (
            <div
              key={b.t}
              className="rounded-2xl border border-border bg-surface p-7 shadow-sm transition hover:shadow-lg"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-soft text-primary">
                <b.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Passos */}
      <section className="bg-surface-muted/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
            Como começar
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {passos.map(([n, t, d]) => (
              <div key={n} className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/25">
                  {n}
                </span>
                <h3 className="mt-4 font-semibold text-foreground">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
          Escolha seu plano
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          A plataforma não intermedia o pagamento das consultas.
        </p>
        <div className="mt-12">
          <PlanCards />
        </div>
      </section>
    </>
  );
}
