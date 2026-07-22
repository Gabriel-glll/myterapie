import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin,
  Video,
  Globe,
  MessageCircle,
  AtSign,
  BadgeCheck,
  ArrowLeft,
  CalendarCheck,
  Gift,
} from "lucide-react";
import { TERAPEUTAS, getTerapeuta } from "@/lib/data";
import { formatBRL } from "@/lib/utils";
import { Badge, Button, Stars, Card } from "@/components/ui";
import { AgendaWidget } from "@/components/agenda-widget";

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
  if (!t) return { title: "Landing page" };
  return { title: `${t.nome} — Landing page`, description: t.sobre };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTerapeuta(slug);
  if (!t) notFound();

  return (
    <div>
      {/* ===================================================== HERO / CAPA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/15 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <Link
            href={`/terapeuta/${t.slug}`}
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar ao perfil
          </Link>

          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 border-surface shadow-2xl">
              <Image src={t.foto} alt={t.nome} fill sizes="144px" className="object-cover" />
            </div>
            <div>
              <Badge tone="primary" className="mb-3">
                <BadgeCheck className="h-3.5 w-3.5" /> Profissional verificado
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {t.nome}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{t.titulo}</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
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
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <Button href="/entrar" size="lg">
                  <CalendarCheck className="h-5 w-5" /> Agendar consulta
                </Button>
                {t.whatsapp && (
                  <a
                    href={`https://wa.me/${t.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium hover:bg-surface-muted"
                  >
                    <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-14 px-4 py-14 sm:px-6">
        {/* Biografia */}
        <section>
          <h2 className="text-2xl font-bold text-foreground">Sobre mim</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t.sobre}</p>
        </section>

        {/* Vídeo — disponível apenas na landing page */}
        {t.video && (
          <section>
            <h2 className="text-2xl font-bold text-foreground">Apresentação em vídeo</h2>
            <div className="mt-4 aspect-video overflow-hidden rounded-2xl border border-border shadow-lg">
              <iframe
                src={t.video}
                title={`Vídeo de ${t.nome}`}
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Especialidades */}
        <section>
          <h2 className="text-2xl font-bold text-foreground">Especialidades</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {t.especialidades.map((e) => (
              <Badge key={e} tone="primary" className="px-4 py-2 text-sm">
                {e}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {t.abordagens.map((a) => (
              <Badge key={a} className="px-4 py-2 text-sm">
                {a}
              </Badge>
            ))}
          </div>
          {(t.primeiraGratuita || t.convenio || t.atendimentoSocial) && (
            <div className="mt-5 flex flex-wrap gap-2">
              {t.primeiraGratuita && (
                <Badge tone="primary">
                  <Gift className="h-3.5 w-3.5" /> 1ª consulta gratuita
                </Badge>
              )}
              {t.convenio && <Badge>Aceita convênio</Badge>}
              {t.atendimentoSocial && <Badge>Atendimento social</Badge>}
            </div>
          )}
        </section>

        {/* Agenda */}
        <section>
          <h2 className="text-2xl font-bold text-foreground">Agende sua consulta</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A partir de{" "}
            <span className="font-semibold text-foreground">{formatBRL(t.preco)}</span>.
          </p>
          <div className="mt-5 max-w-xl">
            <AgendaWidget terapeuta={t.nome} agendaAberta={t.agendaAberta} />
          </div>
        </section>

        {/* Avaliações */}
        <section>
          <h2 className="text-2xl font-bold text-foreground">
            O que dizem os pacientes
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {t.avaliacoes.map((a) => (
              <Card key={a.id}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{a.paciente}</span>
                  <Stars value={a.nota} size={14} />
                </div>
                <p className="mt-2 text-muted-foreground">{a.comentario}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Contato / redes / mapa */}
        <section className="grid gap-4 sm:grid-cols-2">
          {t.instagram && (
            <a
              href={`https://instagram.com/${t.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 transition hover:bg-surface-muted"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-soft text-primary">
                <AtSign className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium text-foreground">Instagram</p>
                <p className="text-sm text-muted-foreground">@{t.instagram}</p>
              </div>
            </a>
          )}
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-soft text-primary">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium text-foreground">Localização</p>
              <p className="text-sm text-muted-foreground">
                {t.cidade}, {t.estado}
              </p>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-10 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Pronto para dar o primeiro passo?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-white/90">
            Agende sua consulta com {t.nome.split(" ")[0]} e comece a sua jornada.
          </p>
          <Button
            href="/entrar"
            size="lg"
            className="mt-6 bg-white text-primary hover:bg-white/90"
          >
            <CalendarCheck className="h-5 w-5" /> Agendar agora
          </Button>
        </section>
      </div>
    </div>
  );
}
