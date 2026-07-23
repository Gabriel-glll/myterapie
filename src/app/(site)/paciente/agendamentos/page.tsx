import { Video, MapPin } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { Badge, Button } from "@/components/ui";

const AGENDAMENTOS = [
  ["Ana Beatriz Moraes", "Hoje, 14:00", "Online", "Confirmado", "semanal"],
  ["Carlos Eduardo Lima", "22/07, 09:00", "Presencial", "Pendente", "única"],
] as const;

export default function AgendamentosPage() {
  return (
    <>
      <PageHeader title="Agendamentos" subtitle="Suas solicitações e sessões." />
      <div className="space-y-4">
        {AGENDAMENTOS.map(([nome, quando, modo, status, rec]) => (
          <div key={nome} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-soft text-sm font-semibold text-primary">
                  {nome.slice(0, 1)}
                </span>
                <div>
                  <p className="font-medium text-foreground">{nome}</p>
                  <p className="text-sm text-muted-foreground">
                    {quando} · {rec}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  {modo === "Online" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                  {modo}
                </span>
                <Badge tone={status === "Confirmado" ? "primary" : "accent"}>{status}</Badge>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">Reagendar</Button>
              <Button variant="ghost" size="sm">Cancelar</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
