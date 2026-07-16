import Link from "next/link";
import { Heart, CalendarClock, History, Search, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { TERAPEUTAS } from "@/lib/data";
import { TherapistCard } from "@/components/therapist-card";
import { Button } from "@/components/ui";

export default function PacienteHome() {
  const sugestoes = TERAPEUTAS.slice(0, 3);
  return (
    <>
      <PageHeader
        title="Olá, Marina 👋"
        subtitle="Continue a sua jornada de cuidado."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Favoritos" value="4" icon={Heart} />
        <StatCard label="Agendamentos ativos" value="2" icon={CalendarClock} />
        <StatCard label="Sessões realizadas" value="11" icon={History} />
      </div>

      {/* Próxima sessão */}
      <div className="mt-6 rounded-2xl border border-primary bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
        <p className="text-sm font-medium text-primary">Próxima sessão</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-foreground">Ana Beatriz Moraes</p>
            <p className="text-sm text-muted-foreground">Hoje às 14:00 · Online</p>
          </div>
          <Button size="sm">Entrar na sessão</Button>
        </div>
      </div>

      {/* Sugestões */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Sugestões para você</h2>
        <Link href="/buscar" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <Search className="h-4 w-4" /> Buscar mais
        </Link>
      </div>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sugestoes.map((t) => (
          <TherapistCard key={t.id} t={t} />
        ))}
      </div>
    </>
  );
}
