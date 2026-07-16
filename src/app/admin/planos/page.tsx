import { PageHeader } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { PLANOS } from "@/lib/data";
import { formatBRL } from "@/lib/utils";
import { Users } from "lucide-react";
import { Button } from "@/components/ui";

const ASSINANTES: Record<string, number> = { inicial: 43, completo: 47, premium: 38 };

export default function AdminPlanos() {
  return (
    <>
      <PageHeader title="Planos" subtitle="Gerencie os planos e acompanhe assinaturas." />
      <div className="grid gap-4 lg:grid-cols-3">
        {PLANOS.map((p) => (
          <div key={p.tier} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{p.nome}</h3>
              <span className="text-lg font-bold text-foreground">{formatBRL(p.preco)}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{p.descricao}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-primary">
              <Users className="h-4 w-4" /> {ASSINANTES[p.tier]} assinantes
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Receita: {formatBRL(p.preco * ASSINANTES[p.tier])}/mês
            </p>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              Editar plano
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <StatCard
          label="Receita recorrente mensal (MRR)"
          value={formatBRL(
            PLANOS.reduce((acc, p) => acc + p.preco * ASSINANTES[p.tier], 0),
          )}
          icon={Users}
        />
      </div>
    </>
  );
}
