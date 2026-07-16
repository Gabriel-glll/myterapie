import { Check, Crown } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { PLANOS } from "@/lib/data";
import { formatBRL } from "@/lib/utils";
import { Button, Badge } from "@/components/ui";

export default function PlanoPage() {
  const atual = "premium";
  return (
    <>
      <PageHeader title="Meu Plano" subtitle="Gerencie sua assinatura e extras." />

      <div className="rounded-2xl border border-primary bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Crown className="h-8 w-8 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Plano atual</p>
              <p className="text-xl font-bold text-foreground">Premium · {formatBRL(149)}/mês</p>
            </div>
          </div>
          <div className="text-right">
            <Badge tone="primary">Ativo</Badge>
            <p className="mt-1 text-xs text-muted-foreground">Renova em 12/08/2026</p>
          </div>
        </div>
      </div>

      <h2 className="mt-8 font-semibold text-foreground">Comparar planos</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {PLANOS.map((p) => (
          <div
            key={p.tier}
            className={`rounded-2xl border p-5 ${
              p.tier === atual ? "border-primary bg-surface" : "border-border bg-surface"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{p.nome}</h3>
              {p.tier === atual && <Badge tone="primary">Atual</Badge>}
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {formatBRL(p.preco)}
              <span className="text-sm font-normal text-muted-foreground">/mês</span>
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {p.recursos.slice(0, 4).map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {r}
                </li>
              ))}
            </ul>
            {p.tier !== atual && (
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Mudar para {p.nome}
              </Button>
            )}
          </div>
        ))}
      </div>

      <h2 className="mt-8 font-semibold text-foreground">Extras</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          ["Destaque nas buscas", "R$ 49/mês"],
          ["Manutenção do site", "R$ 99/mês"],
          ["Serviços adicionais", "Sob consulta"],
        ].map(([nome, preco]) => (
          <div key={nome} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <p className="font-medium text-foreground">{nome}</p>
            <p className="mt-1 text-sm text-muted-foreground">{preco}</p>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              Contratar
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
