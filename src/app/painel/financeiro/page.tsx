import { Wallet, TrendingUp, Receipt, Download } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button, Badge } from "@/components/ui";

const FATURAS = [
  ["12/07/2026", "Assinatura Premium", "R$ 149,00", "Pago"],
  ["12/06/2026", "Assinatura Premium", "R$ 149,00", "Pago"],
  ["12/06/2026", "Destaque nas buscas", "R$ 49,00", "Pago"],
  ["12/05/2026", "Assinatura Premium", "R$ 149,00", "Pago"],
] as const;

export default function FinanceiroPage() {
  return (
    <>
      <PageHeader
        title="Financeiro"
        subtitle="A plataforma não intermedia o pagamento das consultas — aqui você vê sua assinatura e extras."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Mensalidade atual" value="R$ 149" icon={Wallet} />
        <StatCard label="Extras no mês" value="R$ 49" icon={TrendingUp} />
        <StatCard label="Total pago (2026)" value="R$ 1.043" icon={Receipt} />
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Histórico de faturas</h2>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" /> Exportar
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Data</th>
                <th className="pb-3 font-medium">Descrição</th>
                <th className="pb-3 font-medium">Valor</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {FATURAS.map(([data, desc, valor, status], i) => (
                <tr key={i}>
                  <td className="py-3 text-muted-foreground">{data}</td>
                  <td className="py-3 text-foreground">{desc}</td>
                  <td className="py-3 font-medium text-foreground">{valor}</td>
                  <td className="py-3">
                    <Badge tone="primary">{status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
