"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/shell";
import { Button } from "@/components/ui";

const DIAS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const HORAS = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "19:00"];

export default function AgendaPage() {
  // true = livre, false = indisponível
  const [grid, setGrid] = useState<Record<string, boolean>>(() => {
    const g: Record<string, boolean> = {};
    DIAS.forEach((d) =>
      HORAS.forEach((h) => {
        g[`${d}-${h}`] = !(h === "11:00" || d === "Sáb"); // almoço + sábado
      }),
    );
    return g;
  });

  const toggle = (k: string) => setGrid((g) => ({ ...g, [k]: !g[k] }));

  return (
    <>
      <PageHeader
        title="Agenda"
        subtitle="Clique nos horários para alternar entre livre e indisponível."
      />

      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary" /> Livre
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-surface-muted border border-border" />{" "}
          Indisponível
        </span>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm">
            Configurar férias
          </Button>
          <Button size="sm">Salvar agenda</Button>
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
