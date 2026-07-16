"use client";

import { useState } from "react";
import { Check, X, Clock, CalendarClock } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";

type Status = "pendente" | "aprovado" | "recusado" | "alteracao";

interface Solicitacao {
  id: string;
  paciente: string;
  data: string;
  hora: string;
  recorrencia: string;
  modalidade: string;
  obs: string;
  status: Status;
}

const INICIAIS: Solicitacao[] = [
  { id: "1", paciente: "Marina Lopes", data: "18/07", hora: "14:00", recorrencia: "Semanal", modalidade: "Online", obs: "Prefiro início de tarde.", status: "pendente" },
  { id: "2", paciente: "Rafael Costa", data: "19/07", hora: "09:00", recorrencia: "Única", modalidade: "Presencial", obs: "Primeira consulta.", status: "pendente" },
  { id: "3", paciente: "Camila Souza", data: "20/07", hora: "16:00", recorrencia: "Quinzenal", modalidade: "Online", obs: "", status: "pendente" },
];

const badge: Record<Status, string> = {
  pendente: "bg-accent/15 text-accent",
  aprovado: "bg-primary/15 text-primary",
  recusado: "bg-red-500/10 text-red-500",
  alteracao: "bg-secondary-soft text-primary",
};

export default function SolicitacoesPage() {
  const [lista, setLista] = useState(INICIAIS);
  const setStatus = (id: string, status: Status) =>
    setLista((l) => l.map((s) => (s.id === id ? { ...s, status } : s)));

  return (
    <>
      <PageHeader
        title="Solicitações"
        subtitle="Aprove, recuse ou proponha uma alteração de horário."
      />

      <div className="space-y-4">
        {lista.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-soft text-sm font-semibold text-primary">
                  {s.paciente.slice(0, 1)}
                </span>
                <div>
                  <p className="font-medium text-foreground">{s.paciente}</p>
                  <p className="text-sm text-muted-foreground">
                    {s.data} às {s.hora} · {s.modalidade} · {s.recorrencia}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${badge[s.status]}`}
              >
                {s.status}
              </span>
            </div>

            {s.obs && (
              <p className="mt-3 rounded-xl bg-surface-muted px-3 py-2 text-sm text-muted-foreground">
                “{s.obs}”
              </p>
            )}

            {s.status === "pendente" && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setStatus(s.id, "aprovado")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
                >
                  <Check className="h-4 w-4" /> Aprovar
                </button>
                <button
                  onClick={() => setStatus(s.id, "alteracao")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-surface-muted"
                >
                  <CalendarClock className="h-4 w-4" /> Sugerir alteração
                </button>
                <button
                  onClick={() => setStatus(s.id, "recusado")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10"
                >
                  <X className="h-4 w-4" /> Recusar
                </button>
              </div>
            )}

            {s.status !== "pendente" && (
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> Atualizado agora
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
