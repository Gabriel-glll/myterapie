import { Download, BarChart3, Users, CalendarCheck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui";

const RELATORIOS = [
  ["Terapeutas por especialidade", "Distribuição da base de profissionais"],
  ["Agendamentos por período", "Volume mensal de solicitações e sessões"],
  ["Conversão de visitantes", "Do perfil ao agendamento"],
  ["Retenção de pacientes", "Recorrência de sessões"],
  ["Receita por plano", "Mensalidades e extras"],
  ["Avaliações e satisfação", "Nota média e NPS"],
] as const;

export default function AdminRelatorios() {
  return (
    <>
      <PageHeader title="Relatórios" subtitle="Exporte dados e acompanhe indicadores." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Taxa de conversão" value="6.4%" icon={BarChart3} />
        <StatCard label="Retenção 90d" value="72%" icon={Users} />
        <StatCard label="Sessões/mês" value="642" icon={CalendarCheck} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RELATORIOS.map(([titulo, desc]) => (
          <div key={titulo} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <h3 className="font-medium text-foreground">{titulo}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              <Download className="h-4 w-4" /> Exportar CSV
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
