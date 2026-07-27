"use client";

import { useEffect, useState } from "react";
import { Check, Save } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { Button } from "@/components/ui";
import { DIAS, HORAS, getAgenda, saveAgenda, gridPadrao, type AgendaGrid } from "@/lib/agenda-store";
import { getTerapeuta } from "@/lib/data";

// Terapeuta logado (protótipo): Ana Beatriz.
const SLUG = "ana-beatriz-moraes";

export default function AgendaPage() {
  const disp = getTerapeuta(SLUG)?.disponibilidade ?? {
    manha: true,
    tarde: true,
    noite: true,
  };
  const [grid, setGrid] = useState<AgendaGrid>(() => gridPadrao(disp));
  const [salvo, setSalvo] = useState(false);

  // Carrega a agenda salva no cliente.
  useEffect(() => {
    setGrid(getAgenda(SLUG, disp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (k: string) => {
    setGrid((g) => ({ ...g, [k]: !g[k] }));
    setSalvo(false);
  };

  function salvar() {
    saveAgenda(SLUG, grid);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2500);
  }

  return (
    <>
      <PageHeader
        title="Agenda"
        subtitle="Clique nos horários para alternar entre livre e indisponível. Ao salvar, a sua agenda é atualizada no seu perfil público."
      />

      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary" /> Livre
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-surface-muted border border-border" />{" "}
          Indisponível
        </span>
        <div className="ml-auto flex items-center gap-2">
          {salvo && (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              <Check className="h-4 w-4" /> Agenda atualizada no perfil
            </span>
          )}
          <Button variant="outline" size="sm">
            Configurar férias
          </Button>
          <Button size="sm" onClick={salvar}>
            <Save className="h-4 w-4" /> Salvar agenda
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <table className="w-full min-w-[560px] border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="w-16" />
              {DIAS.map((d) => (
                <th key={d} className="pb-2 text-sm font-semibold text-foreground">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HORAS.map((h) => (
              <tr key={h}>
                <td className="pr-2 text-right text-xs font-medium text-muted-foreground">
                  {h}
                </td>
                {DIAS.map((d) => {
                  const k = `${d}-${h}`;
                  const livre = grid[k];
                  return (
                    <td key={k}>
                      <button
                        onClick={() => toggle(k)}
                        className={`h-9 w-full rounded-lg text-xs font-medium transition ${
                          livre
                            ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                            : "border border-border bg-surface-muted text-muted-foreground hover:bg-surface"
                        }`}
                      >
                        {livre ? "Livre" : "—"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
