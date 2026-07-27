"use client";

import { useEffect, useState } from "react";
import { Clock, CalendarDays, Check } from "lucide-react";
import { Button } from "./ui";
import type { Disponibilidade } from "@/lib/types";
import {
  DIAS,
  HORAS,
  getAgenda,
  gridPadrao,
  type AgendaGrid,
} from "@/lib/agenda-store";

export function AgendaWidget({
  terapeuta,
  slug,
  disponibilidade,
  agendaAberta,
}: {
  terapeuta: string;
  slug: string;
  disponibilidade: Disponibilidade;
  agendaAberta: boolean;
}) {
  const [grid, setGrid] = useState<AgendaGrid>(() => gridPadrao(disponibilidade));
  const [dia, setDia] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);
  const [recorrencia, setRecorrencia] = useState<"unica" | "semanal" | "quinzenal">("unica");
  const [obs, setObs] = useState("");

  // Lê a agenda do terapeuta e reage a atualizações (mesma aba e entre abas).
  useEffect(() => {
    const load = () => setGrid(getAgenda(slug, disponibilidade));
    load();
    const onStorage = (e: StorageEvent) => {
      if (e.key === `myterapie_agenda_${slug}`) load();
    };
    const onCustom = (e: Event) => {
      if ((e as CustomEvent).detail?.slug === slug) load();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("agenda-updated", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("agenda-updated", onCustom);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!agendaAberta) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface p-6 text-center text-sm text-muted-foreground">
        {terapeuta} está com a agenda fechada no momento. Você pode favoritar o
        perfil e ser avisado quando abrir.
      </div>
    );
  }

  // Horários livres do dia selecionado, conforme a agenda do terapeuta.
  const horariosDoDia = dia
    ? HORAS.filter((h) => grid[`${dia}-${h}`])
    : [];

  // Dias com pelo menos um horário livre.
  const diasComVaga = DIAS.filter((d) => HORAS.some((h) => grid[`${d}-${h}`]));

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      {/* Dias */}
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <CalendarDays className="h-4 w-4 text-primary" /> Escolha o dia
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {DIAS.map((d) => {
          const temVaga = diasComVaga.includes(d);
          return (
            <button
              key={d}
              disabled={!temVaga}
              onClick={() => {
                setDia(d);
                setHora(null);
              }}
              className={`rounded-xl border py-2 text-sm font-medium transition ${
                dia === d
                  ? "border-primary bg-primary text-primary-foreground"
                  : temVaga
                    ? "border-border bg-surface hover:bg-surface-muted"
                    : "cursor-not-allowed border-border bg-surface-muted/50 text-muted-foreground/40"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      {/* Horários */}
      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
        <Clock className="h-4 w-4 text-primary" /> Horários disponíveis
      </div>
      {!dia ? (
        <p className="mt-3 text-sm text-muted-foreground">Selecione um dia primeiro.</p>
      ) : horariosDoDia.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Sem horários livres nesse dia.
        </p>
      ) : (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {horariosDoDia.map((h) => (
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
      )}

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
