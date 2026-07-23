import Link from "next/link";
import Image from "next/image";
import { MapPin, Video, Globe, Users } from "lucide-react";
import type { Terapeuta } from "@/lib/types";
import { formatBRL } from "@/lib/utils";
import { Badge, Stars } from "./ui";

export function TherapistCard({ t }: { t: Terapeuta }) {
  return (
    <Link
      href={`/terapeuta/${t.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 sm:flex-row"
    >
      {/* Foto — à esquerda no desktop (card retangular) */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface-muted sm:aspect-auto sm:w-56 md:w-64">
        <Image
          src={t.foto}
          alt={t.nome}
          fill
          sizes="(max-width: 640px) 100vw, 288px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {t.primeiraGratuita && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow">
            1ª grátis
          </span>
        )}
      </div>

      {/* Conteúdo — à direita */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-bold leading-tight text-foreground">{t.nome}</h3>
        <p className="mt-1 text-base text-muted-foreground">{t.titulo}</p>

        <div className="mt-3 flex items-center gap-2">
          <Stars value={t.notaMedia} size={20} />
          <span className="text-lg font-bold text-foreground">
            {t.notaMedia.toFixed(1)}
          </span>
          <span className="text-base text-muted-foreground">({t.totalAvaliacoes})</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {t.especialidades.slice(0, 3).map((e) => (
            <Badge key={e} tone="primary" className="px-3.5 py-1.5 text-sm">
              {e}
            </Badge>
          ))}
          {t.especialidades.length > 3 && (
            <Badge className="px-3.5 py-1.5 text-sm">
              +{t.especialidades.length - 3}
            </Badge>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> {t.cidade}/{t.estado}
          </span>
          {t.modalidades.includes("Online") && (
            <span className="inline-flex items-center gap-1.5">
              <Video className="h-4 w-4" /> Online
            </span>
          )}
          {t.modalidades.includes("Presencial") && (
            <span className="inline-flex items-center gap-1.5">
              <Globe className="h-4 w-4" /> Presencial
            </span>
          )}
          {t.publicos.includes("Casal") && (
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" /> Casal
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
          <span className="text-base text-muted-foreground">
            a partir de{" "}
            <span className="text-lg font-bold text-foreground">
              {formatBRL(t.preco)}
            </span>
          </span>
          <span className="text-base font-semibold text-primary group-hover:underline">
            Ver perfil →
          </span>
        </div>
      </div>
    </Link>
  );
}
