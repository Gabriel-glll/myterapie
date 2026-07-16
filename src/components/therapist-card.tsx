import Link from "next/link";
import Image from "next/image";
import { MapPin, Video, Users, Crown } from "lucide-react";
import type { Terapeuta } from "@/lib/types";
import { formatBRL } from "@/lib/utils";
import { Badge, Stars } from "./ui";

export function TherapistCard({ t }: { t: Terapeuta }) {
  return (
    <Link
      href={`/terapeuta/${t.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        <Image
          src={t.foto}
          alt={t.nome}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {t.plano === "premium" && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-[#3a2a12] shadow">
            <Crown className="h-3.5 w-3.5" /> Premium
          </span>
        )}
        {t.primeiraGratuita && (
          <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow">
            1ª grátis
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground">{t.nome}</h3>
            <p className="text-sm text-muted-foreground">{t.titulo}</p>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm">
          <Stars value={t.notaMedia} size={14} />
          <span className="font-medium text-foreground">{t.notaMedia.toFixed(1)}</span>
          <span className="text-muted-foreground">({t.totalAvaliacoes})</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {t.especialidades.slice(0, 2).map((e) => (
            <Badge key={e} tone="primary">
              {e}
            </Badge>
          ))}
          {t.especialidades.length > 2 && (
            <Badge>+{t.especialidades.length - 2}</Badge>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {t.cidade}/{t.estado}
          </span>
          {t.modalidades.includes("Online") && (
            <span className="inline-flex items-center gap-1">
              <Video className="h-3.5 w-3.5" /> Online
            </span>
          )}
          {t.publicos.includes("Casal") && (
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> Casal
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-muted-foreground">
            a partir de{" "}
            <span className="font-semibold text-foreground">
              {formatBRL(t.preco)}
            </span>
          </span>
          <span className="text-sm font-medium text-primary group-hover:underline">
            Ver perfil →
          </span>
        </div>
      </div>
    </Link>
  );
}
