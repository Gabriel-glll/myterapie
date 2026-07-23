import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin,
  Video,
  Globe,
  GraduationCap,
  Languages,
  BadgeCheck,
  Gift,
  HeartHandshake,
  ExternalLink,
  Star,
} from "lucide-react";
import { TERAPEUTAS, getTerapeuta } from "@/lib/data";
import { formatBRL } from "@/lib/utils";
import { Badge, Button, Stars, Card } from "@/components/ui";
import { AgendaWidget } from "@/components/agenda-widget";
import { ProfileCarousel, type Slide } from "@/components/profile-carousel";

export function generateStaticParams() {
  return TERAPEUTAS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTerapeuta(slug);
  if (!t) return { title: "Terapeuta não encontrado" };
  return { title: `${t.nome} — ${t.titulo}`, description: t.sobre };
}

export default async function TerapeutaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTerapeuta(slug);
  if (!t) notFound();

  /* ------------------------------------------- slides (cada um preenche a tela) */
  const foto = (id: string) =>
    `https://images.unsplash.com/${id}?w=640&q=80&auto=format&fit=crop`;

  const slides: Slide[] = [
    {
      label: "Sobre",
      image: t.foto,
      imageAlt: t.nome,
      content: (
        <div>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">Sobre</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {t.sobre}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {t.especialidades.slice(0, 3).map((e) => (
              <Badge key={e} tone="primary">
                {e}
              </Badge>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "Especialidades",
      image: foto("photo-1506126613408-eca07ce68773"),
      imageAlt: "Bem-estar e equilíbrio",
      content: (
        <div>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Especialidades
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {t.especialidades.map((e) => (
              <Badge key={e} tone="primary" className="px-4 py-1.5 text-sm">
                {e}
              </Badge>
            ))}
          </div>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Abordagem
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {t.abordagens.map((a) => (
              <Badge key={a} className="px-4 py-1.5 text-sm">
                {a}
              </Badge>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "Formação",
      image: foto("photo-1481627834876-b7833e8f5570"),
      imageAlt: "Livros e estudo",
      content: (
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
            <GraduationCap className="h-6 w-6 text-primary" /> Formação
          </h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            {t.formacao.map((fo) => (
              <li key={fo}>• {fo}</li>
            ))}
          </ul>
          <h3 className="mt-5 flex items-center gap-2 font-semibold text-foreground">
            <Languages className="h-5 w-5 text-primary" /> Idiomas
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {t.idiomas.map((i) => (
              <Badge key={i}>{i}</Badge>
            ))}
          </div>
          <h3 className="mt-5 font-semibold text-foreground">Público atendido</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {t.publicos.map((p) => (
              <Badge key={p} tone="primary">
                {p}
              </Badge>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "Agenda",
      image: foto("photo-1506784983877-45594efa4cbe"),
      imageAlt: "Agenda e planejamento",
      content: (
        <div>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">Agenda</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Escolha data e horário. A solicitação é enviada ao terapeuta para
            aprovação.
          </p>
          <div className="mt-4">
            <AgendaWidget terapeuta={t.nome} agendaAberta={t.agendaAberta} />
          </div>
        </div>
      ),
    },
    {
      label: "Avaliações",
      image: foto("photo-1521791136064-7986c2920216"),
      imageAlt: "Confiança e acolhimento",
      content: (
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              Avaliações
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-soft px-3 py-1 text-sm font-semibold text-primary">
              <Star className="h-4 w-4 fill-current" /> {t.notaMedia.toFixed(1)} ·{" "}
              {t.totalAvaliacoes}
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {t.avaliacoes.map((a) => (
              <Card key={a.id} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{a.paciente}</span>
                  <Stars value={a.nota} size={14} />
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{a.comentario}</p>
              </Card>
            ))}
            <p className="text-center text-xs text-muted-foreground">
              Somente pacientes autenticados podem avaliar.{" "}
              <Link href="/entrar" className="font-medium text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="pb-16">
      {/* ===================================================== HERO / PRINCIPAIS */}
      <section className="relative overflow-hidden border-b border-border bg-aurora">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-3xl border-4 border-surface shadow-xl sm:h-40 sm:w-40">
            <Image src={t.foto} alt={t.nome} fill sizes="160px" className="object-cover" />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="primary">
                <BadgeCheck className="h-3.5 w-3.5" /> Verificado
              </Badge>
              {t.crp && <span className="text-xs text-muted-foreground">{t.crp}</span>}
              {/* link da landing page junto às principais informações */}
              <Link
                href={`/terapeuta/${t.slug}/landing`}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-secondary-soft px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Ver landing page
              </Link>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.nome}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">{t.titulo}</p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {t.cidade}/{t.estado}
              </span>
              {t.modalidades.map((m) => (
                <span key={m} className="inline-flex items-center gap-1.5">
                  {m === "Online" ? <Video className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                  {m}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5">
                <Stars value={t.notaMedia} size={15} />
                <span className="font-medium text-foreground">{t.notaMedia.toFixed(1)}</span>
                ({t.totalAvaliacoes})
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {t.primeiraGratuita && (
                <Badge tone="primary">
                  <Gift className="h-3.5 w-3.5" /> 1ª consulta gratuita
                </Badge>
              )}
              {t.agendaAberta && <Badge>Agenda aberta</Badge>}
              {t.convenio && <Badge>Aceita convênio</Badge>}
              {t.atendimentoSocial && (
                <Badge>
                  <HeartHandshake className="h-3.5 w-3.5" /> Atendimento social
                </Badge>
              )}
            </div>
          </div>

          {/* Preço + agendar (principais ações) */}
          <div className="w-full shrink-0 md:w-56">
            <Card className="p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Consulta</span>
                <span className="text-2xl font-bold text-foreground">
                  {formatBRL(t.preco)}
                </span>
              </div>
              <Button href="/entrar" size="lg" className="mt-4 w-full">
                Solicitar agendamento
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                É necessário entrar para agendar.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ===================================================== CARROSSEL DE INFORMAÇÕES */}
      <div className="pt-10">
        <ProfileCarousel slides={slides} />
      </div>
    </div>
  );
}
