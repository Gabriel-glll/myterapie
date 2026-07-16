"use client";

import { useState } from "react";
import { Clock, CalendarDays, Check } from "lucide-react";
import { Button } from "./ui";

const DIAS = ["Seg", "Ter", "Qua", "Qui", "Sex"];
const HORARIOS = ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00", "17:00", "19:00"];

export function AgendaWidget({
  terapeuta,
  agendaAberta,
}: {
  terapeuta: string;
  agendaAberta: boolean;
}) {
  const [dia, setDia] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);
  const [recorrencia, setRecorrencia] = useState<"unica" | "semanal" | "quinzenal">("unica");
  const [obs, setObs] = useState("");

  if (!agendaAberta) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface p-6 text-center text-sm text-muted-foreground">
        {terapeuta} está com a agenda fechada no momento. Você pode favoritar o
        perfil e ser avisado quando abrir.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      {/* Dias */}
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <CalendarDays className="h-4 w-4 text-primary" /> Escolha o dia
      </div>
      <div className="mt-3 grid grid-cols-5 gap-2">
        {DIAS.map((d) => (
          <button
            key={d}
            onClick={() => setDia(d)}
            className={`rounded-xl border py-2 text-sm font-medium transition ${
              dia === d
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface hover:bg-surface-muted"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Horários */}
      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
        <Clock className="h-4 w-4 text-primary" /> Horários disponíveis
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {HORARIOS.map((h) => (
          <button
            key={h}
            onClick={() => setHora(h)}
            className={`rounded-xl border py-2 text-sm transition ${
              hora === h
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface hover:bg-surface-muted"
            }`}
          >
            {h}
          </button>
        ))}
      </div>

      {/* Recorrência */}
      <div className="mt-5 text-sm font-medium text-foreground">Recorrência</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {(["unica", "semanal", "quinzenal"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRecorrencia(r)}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize transition ${
              recorrencia === r
                ? "border-primary bg-secondary-soft text-primary"
                : "border-border bg-surface hover:bg-surface-muted"
            }`}
          >
            {r === "unica" ? "Única" : r}
          </button>
        ))}
      </div>

      {/* Observações */}
      <textarea
        value={obs}
        onChange={(e) => setObs(e.target.value)}
        placeholder="Observações (opcional)"
        rows={2}
        className="mt-4 w-full resize-none rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-primary"
      />

      <Button href="/entrar" size="lg" className="mt-4 w-full" disabled={!dia || !hora}>
        {dia && hora ? (
          <>
            <Check className="h-4 w-4" /> Solicitar {dia} às {hora}
          </>
        ) : (
          "Selecione dia e horário"
        )}
      </Button>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Entre para confirmar a solicitação de agendamento.
      </p>
    </div>
  );
}
