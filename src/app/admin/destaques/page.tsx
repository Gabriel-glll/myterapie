import { Star } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { TERAPEUTAS } from "@/lib/data";
import { Badge } from "@/components/ui";

export default function AdminDestaques() {
  return (
    <>
      <PageHeader
        title="Destaques"
        subtitle="Escolha os profissionais em destaque na home e nas buscas."
      />
      <div className="space-y-3">
        {TERAPEUTAS.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-soft text-sm font-semibold text-primary">
                {t.nome.slice(0, 1)}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{t.nome}</p>
                <p className="text-xs text-muted-foreground">
                  {t.titulo} · {t.plano}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {t.destaque && (
                <Badge tone="accent">
                  <Star className="h-3 w-3" /> Em destaque
                </Badge>
              )}
              <span
                className={`inline-flex h-6 w-11 items-center rounded-full px-0.5 ${
                  t.destaque
                    ? "justify-end bg-primary"
                    : "justify-start border border-border bg-surface-muted"
                }`}
              >
                <span className="h-5 w-5 rounded-full bg-white shadow" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
