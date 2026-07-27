import type { Disponibilidade } from "./types";

export const DIAS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const;
export const HORAS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "19:00",
] as const;

export type AgendaGrid = Record<string, boolean>; // `${dia}-${hora}` -> livre?

const KEY = (slug: string) => `myterapie_agenda_${slug}`;

/** Período do dia de um horário. */
export function periodoDe(hora: string): keyof Disponibilidade {
  const h = parseInt(hora.slice(0, 2), 10);
  if (h < 12) return "manha";
  if (h < 18) return "tarde";
  return "noite";
}

/** Agenda padrão a partir da disponibilidade por período do terapeuta. */
export function gridPadrao(disp: Disponibilidade): AgendaGrid {
  const g: AgendaGrid = {};
  for (const d of DIAS) {
    for (const h of HORAS) {
      const p = periodoDe(h);
      // livre se o período está disponível, exceto almoço (11h) e sábado
      g[`${d}-${h}`] = disp[p] && h !== "11:00" && d !== "Sáb";
    }
  }
  return g;
}

/** Lê a agenda salva (localStorage) ou cai no padrão. */
export function getAgenda(slug: string, disp: Disponibilidade): AgendaGrid {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(KEY(slug));
      if (raw) return JSON.parse(raw) as AgendaGrid;
    } catch {
      /* ignore */
    }
  }
  return gridPadrao(disp);
}

/** Salva a agenda e notifica outras abas/perfis abertos. */
export function saveAgenda(slug: string, grid: AgendaGrid) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY(slug), JSON.stringify(grid));
  // dispara evento para o mesmo documento (o 'storage' só cobre outras abas)
  window.dispatchEvent(new CustomEvent("agenda-updated", { detail: { slug } }));
}

/** Períodos disponíveis derivados de uma grade. */
export function periodosDisponiveis(grid: AgendaGrid): Disponibilidade {
  const disp: Disponibilidade = { manha: false, tarde: false, noite: false };
  for (const [k, livre] of Object.entries(grid)) {
    if (!livre) continue;
    const hora = k.split("-")[1];
    disp[periodoDe(hora)] = true;
  }
  return disp;
}
