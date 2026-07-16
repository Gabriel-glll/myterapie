import { Users, UserRound, Wallet, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { TERAPEUTAS } from "@/lib/data";
import { Badge } from "@/components/ui";

export default function AdminDashboard() {
  const barras = [42, 55, 48, 63, 72, 68, 84, 91, 76, 88, 95, 102];
  const max = Math.max(...barras);

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Visão geral da plataforma." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Terapeutas ativos" value="128" icon={Users} trend="+8" />
        <StatCard label="Pacientes" value="1.940" icon={UserRound} trend="+124" />
        <StatCard label="MRR" value="R$ 14.320" icon={Wallet} trend="+11%" />
        <StatCard label="Agendamentos/mês" value="642" icon={TrendingUp} trend="+18%" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Gráfico */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm lg:col-span-2">
          <h2 className="font-semibold text-foreground">Novos cadastros (12 meses)</h2>
          <div className="mt-6 flex h-48 items-end gap-2">
            {barras.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary to-secondary transition-all hover:opacity-80"
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribuição de planos */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="font-semibold text-foreground">Planos</h2>
          <div className="mt-4 space-y-4">
            {[
              ["Premium", 38, "bg-primary"],
              ["Completo", 47, "bg-secondary"],
              ["Inicial", 43, "bg-accent"],
            ].map(([nome, qtd, cor]) => (
              <div key={nome as string}>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{nome}</span>
                  <span className="text-muted-foreground">{qtd}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className={`h-full ${cor}`}
                    style={{ width: `${((qtd as number) / 128) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Últimos terapeutas */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="font-semibold text-foreground">Terapeutas recentes</h2>
        <div className="mt-4 divide-y divide-border">
          {TERAPEUTAS.slice(0, 4).map((t) => (
            <div key={t.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{t.nome}</p>
                <p className="text-xs text-muted-foreground">
                  {t.titulo} · {t.cidade}/{t.estado}
                </p>
              </div>
              <Badge tone={t.plano === "premium" ? "accent" : "primary"}>{t.plano}</Badge>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
