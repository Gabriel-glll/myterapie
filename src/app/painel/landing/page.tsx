import Link from "next/link";
import { ExternalLink, Crown, Image as ImageIcon, Video, Star, MapPin, AtSign, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { Button, Badge } from "@/components/ui";

const SECOES = [
  ["Foto e capa", ImageIcon],
  ["Biografia", Star],
  ["Especialidades", Star],
  ["Vídeo de apresentação", Video],
  ["Agenda", MapPin],
  ["Avaliações", Star],
  ["Artigos", Star],
  ["Instagram", AtSign],
  ["Mapa", MapPin],
  ["Botão WhatsApp", MessageCircle],
] as const;

export default function LandingPage() {
  return (
    <>
      <PageHeader
        title="Landing Page Premium"
        subtitle="Seu mini site pessoal com URL própria, focado em conversão."
      />

      <div className="rounded-2xl border border-primary bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Crown className="h-8 w-8 text-accent" />
            <div>
              <p className="font-semibold text-foreground">Sua landing está publicada</p>
              <p className="text-sm text-muted-foreground">
                myterapie.com/terapeuta/ana-beatriz-moraes
              </p>
            </div>
          </div>
          <Button href="/terapeuta/ana-beatriz-moraes" variant="outline">
            Ver página <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECOES.map(([nome, Icon]) => (
          <div
            key={nome}
            className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-soft text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-foreground">{nome}</span>
            </div>
            <Badge tone="primary">Ativo</Badge>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button>Editar landing page</Button>
      </div>
    </>
  );
}
