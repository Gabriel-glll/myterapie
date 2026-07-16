import { Wallet, TrendingUp, CreditCard, Star } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui";

const RECEITAS = [
  ["Assinaturas (mensalidades)", "R$ 12.180", "primary"],
  ["Destaques", "R$ 1.470", "accent"],
  ["Manutenção de sites", "R$ 990", "accent"],
  ["Serviços adicionais", "R$ 680", "accent"],
] as const;

export default function AdminFinanceiro() {
  return (
    <>
      <PageHeader title="Financeiro" subtitle="Receita da plataforma (mensalidades + extras)." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="MRR" value="R$ 14.320" icon={Wallet} trend="+11%" />
        <StatCard label="Assinaturas ativas" value="128" icon={CreditCard} />
        <StatCard label="Receita de extras" value="R$ 3.140" icon={Star} />
        <StatCard label="Crescimento" value="+18%" icon={TrendingUp} />
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="font-semibold text-foreground">Composição da receita</h2>
        <div className="mt-4 space-y-4">
          {RECEITAS.map(([nome, valor, tone]) => (
            <div
              key={nome}
              className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <span className="text-sm text-foreground">{nome}</span>
              <div className="flex items-center gap-3">
                <span className="font-medium text-foreground">{valor}</span>
                <Badge tone={tone}>ok</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
