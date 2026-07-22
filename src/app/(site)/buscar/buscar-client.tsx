"use client";

import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X, Search } from "lucide-react";
import {
  TERAPEUTAS,
  ESPECIALIDADES,
  ABORDAGENS,
  IDIOMAS,
  PUBLICOS,
} from "@/lib/data";
import { TherapistCard } from "@/components/therapist-card";
import { Button } from "@/components/ui";

const ESTADOS = ["SP", "RJ", "MG", "PR", "RS", "BA", "PE"];

type Filtros = {
  q: string;
  estado: string;
  online: boolean;
  presencial: boolean;
  especialidade: string;
  abordagem: string;
  idioma: string;
  publico: string;
  precoMax: number;
  agendaAberta: boolean;
  convenio: boolean;
  primeiraGratuita: boolean;
  atendimentoSocial: boolean;
};

const base: Omit<Filtros, "q" | "especialidade"> = {
  estado: "",
  online: false,
  presencial: false,
  abordagem: "",
  idioma: "",
  publico: "",
  precoMax: 250,
  agendaAberta: false,
  convenio: false,
  primeiraGratuita: false,
  atendimentoSocial: false,
};

export function BuscarClient() {
  const [f, setF] = useState<Filtros>({ ...base, q: "", especialidade: "" });
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lê os parâmetros da URL no cliente (compatível com static export).
  // Aceita o handoff vindo do fluxo /descobrir.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if ([...p.keys()].length === 0) return;
    const precoMax = Number(p.get("precoMax"));
    setF((prev) => ({
      ...prev,
      q: p.get("q") ?? prev.q,
      especialidade: p.get("especialidade") ?? prev.especialidade,
      abordagem: p.get("abordagem") ?? prev.abordagem,
      idioma: p.get("idioma") ?? prev.idioma,
      publico: p.get("publico") ?? prev.publico,
      estado: p.get("estado") ?? prev.estado,
      online: p.get("online") === "1" || prev.online,
      presencial: p.get("presencial") === "1" || prev.presencial,
      primeiraGratuita: p.get("primeiraGratuita") === "1" || prev.primeiraGratuita,
      precoMax: precoMax > 0 ? precoMax : prev.precoMax,
    }));
  }, []);

  const set = <K extends keyof Filtros>(k: K, v: Filtros[K]) =>
    setF((prev) => ({ ...prev, [k]: v }));

  const resultados = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    return TERAPEUTAS.filter((t) => {
      if (
        q &&
        !`${t.nome} ${t.titulo} ${t.cidade} ${t.especialidades.join(" ")}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      if (f.estado && t.estado !== f.estado) return false;
      if (f.online && !t.modalidades.includes("Online")) return false;
      if (f.presencial && !t.modalidades.includes("Presencial")) return false;
      if (f.especialidade && !t.especialidades.includes(f.especialidade))
        return false;
      if (f.abordagem && !t.abordagens.includes(f.abordagem)) return false;
      if (f.idioma && !t.idiomas.includes(f.idioma)) return false;
      if (f.publico && !t.publicos.includes(f.publico as never)) return false;
      if (t.preco > f.precoMax) return false;
      if (f.agendaAberta && !t.agendaAberta) return false;
      if (f.convenio && !t.convenio) return false;
      if (f.primeiraGratuita && !t.primeiraGratuita) return false;
      if (f.atendimentoSocial && !t.atendimentoSocial) return false;
      return true;
    }).sort((a, b) => Number(b.destaque) - Number(a.destaque) || b.notaMedia - a.notaMedia);
  }, [f]);

  const painel = (
    <div className="space-y-6">
      <Field label="Buscar">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={f.q}
            onChange={(e) => set("q", e.target.value)}
            placeholder="Nome ou cidade"
            className="h-10 w-full bg-transparent text-sm outline-none"
          />
        </div>
      </Field>

      <Field label="Estado">
        <Select value={f.estado} onChange={(v) => set("estado", v)} options={["", ...ESTADOS]} placeholder="Todos" />
      </Field>

      <Field label="Modalidade">
        <div className="flex gap-2">
          <Toggle active={f.online} onClick={() => set("online", !f.online)}>
            Online
          </Toggle>
          <Toggle active={f.presencial} onClick={() => set("presencial", !f.presencial)}>
            Presencial
          </Toggle>
        </div>
      </Field>

      <Field label="Especialidade">
        <Select value={f.especialidade} onChange={(v) => set("especialidade", v)} options={["", ...ESPECIALIDADES]} placeholder="Todas" />
      </Field>

      <Field label="Abordagem">
        <Select value={f.abordagem} onChange={(v) => set("abordagem", v)} options={["", ...ABORDAGENS]} placeholder="Todas" />
      </Field>

      <Field label="Idioma">
        <Select value={f.idioma} onChange={(v) => set("idioma", v)} options={["", ...IDIOMAS]} placeholder="Todos" />
      </Field>

      <Field label="Público">
        <Select value={f.publico} onChange={(v) => set("publico", v)} options={["", ...PUBLICOS]} placeholder="Todos" />
      </Field>

      <Field label={`Valor até R$ ${f.precoMax}`}>
        <input
          type="range"
          min={80}
          max={250}
          step={10}
          value={f.precoMax}
          onChange={(e) => set("precoMax", Number(e.target.value))}
          className="w-full accent-[var(--primary)]"
        />
      </Field>

      <Field label="Filtros">
        <div className="space-y-2">
          <Check checked={f.agendaAberta} onChange={(v) => set("agendaAberta", v)}>
            Agenda aberta
          </Check>
          <Check checked={f.convenio} onChange={(v) => set("convenio", v)}>
            Aceita convênio
          </Check>
          <Check checked={f.primeiraGratuita} onChange={(v) => set("primeiraGratuita", v)}>
            Primeira consulta gratuita
          </Check>
          <Check checked={f.atendimentoSocial} onChange={(v) => set("atendimentoSocial", v)}>
            Atendimento social
          </Check>
        </div>
      </Field>

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => setF({ ...base, q: "", especialidade: "" })}
      >
        Limpar filtros
      </Button>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Encontre seu terapeuta
        </h1>
        <p className="mt-1 text-muted-foreground">
          {resultados.length} profissional{resultados.length === 1 ? "" : "is"} para
          você
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar desktop */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-surface p-5 shadow-sm">
            {painel}
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Botão filtros mobile */}
          <button
            onClick={() => setMobileOpen(true)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filtros
          </button>

          {resultados.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              Nenhum terapeuta encontrado com esses filtros. Tente ampliar sua busca.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {resultados.map((t) => (
                <TherapistCard key={t.id} t={t} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Drawer mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] overflow-y-auto bg-surface p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            {painel}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------- primitivos */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o === "" ? placeholder : o}
        </option>
      ))}
    </select>
  );
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-surface text-foreground hover:bg-surface-muted"
      }`}
    >
      {children}
    </button>
  );
}

function Check({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded accent-[var(--primary)]"
      />
      {children}
    </label>
  );
}
