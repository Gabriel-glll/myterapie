import Link from "next/link";
import { Eye, Inbox, Star, CalendarCheck, ArrowRight, Crown } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Stars, Button } from "@/components/ui";

export default function PainelDashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Um resumo da sua atividade na MyTerapie."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Visitas ao perfil" value="1.284" icon={Eye} trend="+12%" />
        <StatCard label="Solicitações novas" value="7" icon={Inbox} trend="+3" />
        <StatCard label="Consultas no mês" value="24" icon={CalendarCheck} />
        <StatCard label="Nota média" value="4.9" icon={Star} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Próximas consultas */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Próximas consultas</h2>
            <Link href="/painel/agenda" className="text-sm text-primary hover:underline">
              Ver agenda
            </Link>
          </div>
          <div className="mt-4 divide-y divide-border">
            {[
              ["Marina Lopes", "Hoje, 14:00", "Online"],
              ["Rafael Costa", "Amanhã, 09:00", "Presencial"],
              ["Juliana P.", "Qui, 16:00", "Online"],
            ].map(([nome, quando, modo]) => (
              <div key={nome} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-soft text-sm font-semibold text-primary">
                    {nome.slice(0, 1)}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{nome}</p>
                    <p className="text-xs text-muted-foreground">{quando}</p>
                  </div>
                </div>
                <span className="rounded-full bg-surface-muted px-3 py-1 text-xs text-muted-foreground">
                  {modo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade premium */}
        <div className="rounded-2xl border border-primary bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
          <Crown className="h-8 w-8 text-accent" />
          <h3 className="mt-3 font-semibold text-foreground">
            Você está no plano Premium
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Sua Landing Page está ativa e recebendo visitas.
          </p>
          <Button href="/painel/landing" size="sm" className="mt-4 w-full">
            Editar Landing Page <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Últimas avaliações */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="font-semibold text-foreground">Últimas avaliações</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            ["Marina L.", "Espaço seguro e acolhedor. Recomendo!"],
            ["Rafael C.", "Escuta atenta e muito humana."],
          ].map(([nome, txt]) => (
            <div key={nome} className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{nome}</span>
                <Stars value={5} size={14} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{txt}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
