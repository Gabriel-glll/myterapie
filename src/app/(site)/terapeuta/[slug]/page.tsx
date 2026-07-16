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
  AtSign,
  MessageCircle,
  Crown,
  BadgeCheck,
  Gift,
  HeartHandshake,
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
  if (!t) return { title: "Terapeuta não encontrado" };
  return {
    title: `${t.nome} — ${t.titulo}`,
    description: t.sobre,
  };
}

export default async function TerapeutaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTerapeuta(slug);
  if (!t) notFound();

  const premium = t.plano === "premium";

  return (
    <div>
      {/* ===================================================== HERO */}
      <section className="relative overflow-hidden border-b border-border bg-aurora">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center">
          <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-3xl border-4 border-surface shadow-xl">
            <Image src={t.foto} alt={t.nome} fill sizes="160px" className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {premium && (
                <Badge tone="accent">
                  <Crown className="h-3.5 w-3.5" /> Landing Premium
                </Badge>
              )}
              <Badge tone="primary">
                <BadgeCheck className="h-3.5 w-3.5" /> Verificado
              </Badge>
              {t.crp && <span className="text-xs text-muted-foreground">{t.crp}</span>}
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
          </div>
        </div>
      </section>

      {/* ===================================================== CORPO */}
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {/* Sobre */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">Sobre</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t.sobre}</p>
          </section>

          {/* Especialidades & abordagens */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">Especialidades</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.especialidades.map((e) => (
                <Badge key={e} tone="primary">
                  {e}
                </Badge>
              ))}
            </div>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Abordagem
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {t.abordagens.map((a) => (
                <Badge key={a}>{a}</Badge>
              ))}
            </div>
          </section>

          {/* Vídeo (premium) */}
          {premium && t.video && (
            <section>
              <h2 className="text-xl font-semibold text-foreground">Apresentação</h2>
              <div className="mt-3 aspect-video overflow-hidden rounded-2xl border border-border">
                <iframe
                  src={t.video}
                  title={`Vídeo de ${t.nome}`}
                  className="h-full w-full"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {/* Formação & idiomas */}
          <section className="grid gap-6 sm:grid-cols-2">
            <Card>
              <h3 className="flex items-center gap-2 font-semibold text-foreground">
                <GraduationCap className="h-5 w-5 text-primary" /> Formação
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {t.formacao.map((fo) => (
                  <li key={fo}>• {fo}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="flex items-center gap-2 font-semibold text-foreground">
                <Languages className="h-5 w-5 text-primary" /> Idiomas
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.idiomas.map((i) => (
                  <Badge key={i}>{i}</Badge>
                ))}
              </div>
              <h3 className="mt-4 flex items-center gap-2 font-semibold text-foreground">
                Público atendido
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {t.publicos.map((p) => (
                  <Badge key={p} tone="primary">
                    {p}
                  </Badge>
                ))}
              </div>
            </Card>
          </section>

          {/* Agenda */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">Agenda</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Escolha data e horário. A solicitação é enviada ao terapeuta para
              aprovação.
            </p>
            <div className="mt-4">
              <AgendaWidget terapeuta={t.nome} agendaAberta={t.agendaAberta} />
            </div>
          </section>

          {/* Avaliações */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Avaliações ({t.totalAvaliacoes})
              </h2>
              <div className="flex items-center gap-2">
                <Stars value={t.notaMedia} />
                <span className="font-semibold text-foreground">
                  {t.notaMedia.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              {t.avaliacoes.map((a) => (
                <Card key={a.id}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{a.paciente}</span>
                    <Stars value={a.nota} size={14} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{a.comentario}</p>
                </Card>
              ))}
              <div className="rounded-2xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                Somente pacientes autenticados podem avaliar.{" "}
                <Link href="/entrar" className="font-medium text-primary hover:underline">
                  Entrar
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* ===================================== SIDEBAR STICKY */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <Card className="p-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Consulta</span>
                <span className="text-2xl font-bold text-foreground">
                  {formatBRL(t.preco)}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                {t.primeiraGratuita && (
                  <Perk icon={Gift}>Primeira consulta gratuita</Perk>
                )}
                {t.agendaAberta && <Perk icon={BadgeCheck}>Agenda aberta</Perk>}
                {t.convenio && <Perk icon={BadgeCheck}>Aceita convênio</Perk>}
                {t.atendimentoSocial && (
                  <Perk icon={HeartHandshake}>Atendimento social</Perk>
                )}
              </div>

              <Button href="/entrar" size="lg" className="mt-5 w-full">
                Solicitar agendamento
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                É necessário entrar para agendar.
              </p>

              {premium && (t.whatsapp || t.instagram) && (
                <div className="mt-4 flex gap-2">
                  {t.whatsapp && (
                    <a
                      href={`https://wa.me/${t.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-surface-muted"
                    >
                      <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp
                    </a>
                  )}
                  {t.instagram && (
                    <a
                      href={`https://instagram.com/${t.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-surface-muted"
                    >
                      <AtSign className="h-4 w-4 text-primary" /> Instagram
                    </a>
                  )}
                </div>
              )}
            </Card>

            {premium && (
              <Card className="overflow-hidden p-0">
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary/15 to-secondary/20 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> {t.cidade}, {t.estado}
                  </span>
                </div>
              </Card>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Perk({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-foreground">
      <Icon className="h-4 w-4 text-primary" />
      {children}
    </div>
  );
}
