import { Check, Crown } from "lucide-react";
import { PLANOS } from "@/lib/data";
import { formatBRL } from "@/lib/utils";
import { Button } from "./ui";

export function PlanCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {PLANOS.map((p) => (
        <div
          key={p.tier}
          className={`relative flex flex-col rounded-3xl border p-8 shadow-sm transition ${
            p.destaque
              ? "border-primary bg-surface shadow-xl shadow-primary/10 lg:-translate-y-3"
              : "border-border bg-surface"
          }`}
        >
          {p.destaque && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow">
              Mais popular
            </span>
          )}
          {p.tier === "premium" && (
            <Crown className="absolute right-6 top-6 h-6 w-6 text-accent" />
          )}
          <h3 className="text-lg font-semibold text-foreground">{p.nome}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{p.descricao}</p>
          <div className="mt-5 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground">
              {formatBRL(p.preco)}
            </span>
            <span className="text-sm text-muted-foreground">/mês</span>
          </div>
          <ul className="mt-6 flex-1 space-y-3">
            {p.recursos.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {r}
              </li>
            ))}
          </ul>
          <Button
            href={`/cadastro?plano=${p.tier}`}
            variant={p.destaque ? "primary" : "outline"}
            size="lg"
            className="mt-8 w-full"
          >
            Assinar {p.nome}
          </Button>
        </div>
      ))}
    </div>
  );
}
