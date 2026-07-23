"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  PartyPopper,
  Crown,
  User,
  FileText,
  GraduationCap,
  Languages,
  Sparkles,
  Wallet,
  LayoutTemplate,
  Plus,
  X,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui";
import { getSession } from "@/lib/auth";
import { ESPECIALIDADES, ABORDAGENS, IDIOMAS, PUBLICOS } from "@/lib/data";

const CONVENIOS = ["Unimed", "Bradesco Saúde", "Amil", "SulAmérica", "Hapvida", "NotreDame"];

type Form = {
  nome: string;
  titulo: string;
  cidade: string;
  estado: string;
  crp: string;
  telefone: string;
  sobre: string;
  formacao: string[];
  idiomas: string[];
  especialidades: string[];
  abordagens: string[];
  valor: string;
  online: boolean;
  presencial: boolean;
  primeiraGratuita: boolean;
  convenios: string[];
  publicos: string[];
  video: string;
  instagram: string;
};

const vazio: Form = {
  nome: "",
  titulo: "",
  cidade: "",
  estado: "",
  crp: "",
  telefone: "",
  sobre: "",
  formacao: [""],
  idiomas: [],
  especialidades: [],
  abordagens: [],
  valor: "",
  online: true,
  presencial: false,
  primeiraGratuita: false,
  convenios: [],
  publicos: [],
  video: "",
  instagram: "",
};

// Plano do assinante (protótipo). O terapeuta de teste assinou o Premium.
const PLANO: "inicial" | "completo" | "premium" = "premium";

export function OnboardingWizard() {
  const [form, setForm] = useState<Form>(vazio);
  const [step, setStep] = useState(0); // 0 = boas-vindas
  const [feito, setFeito] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (s?.nome) setForm((f) => ({ ...f, nome: s.nome }));
  }, []);

  const set = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((f) => ({ ...f, [k]: v }));
  const toggle = (k: "idiomas" | "especialidades" | "abordagens" | "convenios" | "publicos", v: string) =>
    setForm((f) => ({
      ...f,
      [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v],
    }));

  /* --------------------------------------------------------- passos */
  const steps = [
    { key: "pessoais", label: "Informações pessoais", icon: User },
    { key: "sobre", label: "Sobre você", icon: FileText },
    { key: "formacao", label: "Formação", icon: GraduationCap },
    { key: "idiomas", label: "Idiomas", icon: Languages },
    { key: "especialidades", label: "Especialidades", icon: Sparkles },
    { key: "atendimento", label: "Atendimento e valores", icon: Wallet },
    ...(PLANO === "premium"
      ? [{ key: "landing", label: "Landing Page Premium", icon: LayoutTemplate }]
      : []),
  ];
  const totalPassos = steps.length;

  /* --------------------------------------------------------- topo */
  const Header = (
    <header className="sticky top-0 z-40 border-b border-border glass">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-3">
          {step > 0 && !feito && (
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Passo {step} de {totalPassos}
            </span>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );

  /* --------------------------------------------------------- CONCLUÍDO */
  if (feito) {
    return (
      <div className="min-h-screen">
        {Header}
        <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <Check className="h-8 w-8" />
          </span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Cadastro concluído! 🎉
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Seu perfil foi publicado na MyTerapie. Agora você já aparece nas buscas
            e pode receber solicitações de agendamento.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/painel" size="lg">
              Ir para o meu painel <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/terapeuta/ana-beatriz-moraes" variant="outline" size="lg">
              Ver meu perfil
            </Button>
          </div>
          {PLANO === "premium" && (
            <Link
              href="/terapeuta/ana-beatriz-moraes/landing"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <Crown className="h-4 w-4" /> Ver minha Landing Page Premium
            </Link>
          )}
        </div>
      </div>
    );
  }

  /* --------------------------------------------------------- BOAS-VINDAS */
  if (step === 0) {
    return (
      <div className="min-h-screen">
        {Header}
        <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/25">
            <PartyPopper className="h-8 w-8" />
          </span>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary-soft px-4 py-1.5 text-sm font-semibold text-primary">
            <Check className="h-4 w-4" /> Pagamento confirmado
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Bem-vindo(a){form.nome ? `, ${form.nome.split(" ")[0]}` : ""}! 👋
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-muted-foreground">
            Sua assinatura do{" "}
            <span className="inline-flex items-center gap-1 font-semibold text-primary">
              {PLANO === "premium" && <Crown className="h-4 w-4 text-accent" />}
              Plano {PLANO === "premium" ? "Premium" : PLANO === "completo" ? "Completo" : "Inicial"}
            </span>{" "}
            está ativa. Vamos montar o seu perfil em {totalPassos} etapas rápidas.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-5 text-left shadow-sm">
            <p className="text-sm font-semibold text-foreground">O que você vai preencher:</p>
            <ul className="mt-3 space-y-2">
              {steps.map((s) => (
                <li key={s.key} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-soft text-primary">
                    <s.icon className="h-4 w-4" />
                  </span>
                  {s.label}
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={() => setStep(1)} size="lg" className="mt-8 w-full sm:w-auto">
            Começar cadastro <ArrowRight className="h-5 w-5" />
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            Prefere depois?{" "}
            <Link href="/painel" className="font-medium text-primary hover:underline">
              Ir direto para o painel
            </Link>
          </p>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------------- ETAPAS */
  const stepKey = steps[step - 1].key;

  function avancar() {
    if (step < totalPassos) setStep(step + 1);
    else setFeito(true);
  }

  return (
    <div className="min-h-screen">
      {Header}
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {/* Progresso */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{steps[step - 1].label}</span>
            <span>
              {step}/{totalPassos}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${(step / totalPassos) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          {stepKey === "pessoais" && (
            <div className="space-y-4">
              <Field label="Nome completo">
                <Text value={form.nome} onChange={(v) => set("nome", v)} placeholder="Seu nome" />
              </Field>
              <Field label="Título profissional">
                <Text value={form.titulo} onChange={(v) => set("titulo", v)} placeholder="Ex: Psicanalista clínica" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Cidade">
                  <Text value={form.cidade} onChange={(v) => set("cidade", v)} placeholder="Cidade" />
                </Field>
                <Field label="Estado">
                  <Text value={form.estado} onChange={(v) => set("estado", v)} placeholder="UF" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Registro (CRP)">
                  <Text value={form.crp} onChange={(v) => set("crp", v)} placeholder="CRP 00/000000" />
                </Field>
                <Field label="Telefone / WhatsApp">
                  <Text value={form.telefone} onChange={(v) => set("telefone", v)} placeholder="(11) 90000-0000" />
                </Field>
              </div>
            </div>
          )}

          {stepKey === "sobre" && (
            <Field label="Sobre você (máx. 200 caracteres)">
              <textarea
                value={form.sobre}
                onChange={(e) => set("sobre", e.target.value.slice(0, 200))}
                rows={5}
                placeholder="Fale um pouco sobre a sua escuta e como você acolhe seus pacientes…"
                className="w-full resize-none rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-primary"
              />
              <p className="mt-1 text-right text-xs text-muted-foreground">
                {form.sobre.length}/200
              </p>
            </Field>
          )}

          {stepKey === "formacao" && (
            <Field label="Formação acadêmica">
              <div className="space-y-3">
                {form.formacao.map((fo, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={fo}
                      onChange={(e) =>
                        set(
                          "formacao",
                          form.formacao.map((x, j) => (j === i ? e.target.value : x)),
                        )
                      }
                      placeholder="Ex: Psicanálise — Instituto Sedes Sapientiae"
                      className="h-11 flex-1 rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
                    />
                    {form.formacao.length > 1 && (
                      <button
                        onClick={() => set("formacao", form.formacao.filter((_, j) => j !== i))}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => set("formacao", [...form.formacao, ""])}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <Plus className="h-4 w-4" /> Adicionar formação
                </button>
              </div>
            </Field>
          )}

          {stepKey === "idiomas" && (
            <ChipStep
              label="Quais idiomas você atende?"
              options={IDIOMAS}
              selected={form.idiomas}
              onToggle={(v) => toggle("idiomas", v)}
            />
          )}

          {stepKey === "especialidades" && (
            <div className="space-y-6">
              <ChipStep
                label="Especialidades"
                options={ESPECIALIDADES}
                selected={form.especialidades}
                onToggle={(v) => toggle("especialidades", v)}
                requestLabel="Solicitar nova especialidade"
              />
              <ChipStep
                label="Abordagem"
                options={ABORDAGENS}
                selected={form.abordagens}
                onToggle={(v) => toggle("abordagens", v)}
                requestLabel="Solicitar nova abordagem"
              />
            </div>
          )}

          {stepKey === "atendimento" && (
            <div className="space-y-5">
              <Field label="Valor da consulta (R$)">
                <Text value={form.valor} onChange={(v) => set("valor", v)} placeholder="Ex: 180" type="number" />
              </Field>
              <div>
                <span className="mb-2 block text-sm font-medium text-foreground">Modalidades</span>
                <div className="flex gap-2">
                  <Toggle active={form.online} onClick={() => set("online", !form.online)}>
                    Online
                  </Toggle>
                  <Toggle active={form.presencial} onClick={() => set("presencial", !form.presencial)}>
                    Presencial
                  </Toggle>
                </div>
              </div>
              <ChipStep
                label="Público atendido"
                options={[...PUBLICOS]}
                selected={form.publicos}
                onToggle={(v) => toggle("publicos", v)}
              />
              <ChipStep
                label="Convênios aceitos (opcional)"
                options={CONVENIOS}
                selected={form.convenios}
                onToggle={(v) => toggle("convenios", v)}
                requestLabel="Solicitar novo convênio"
              />
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.primeiraGratuita}
                  onChange={(e) => set("primeiraGratuita", e.target.checked)}
                  className="h-4 w-4 accent-[var(--primary)]"
                />
                Ofereço a primeira consulta gratuita
              </label>
            </div>
          )}

          {stepKey === "landing" && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 rounded-xl bg-secondary-soft p-3 text-sm text-primary">
                <Crown className="h-5 w-5 text-accent" />
                Recurso exclusivo do seu Plano Premium: uma landing page pessoal focada
                em conversão.
              </div>
              <Field label="Vídeo de apresentação (link do YouTube)">
                <Text
                  value={form.video}
                  onChange={(v) => set("video", v)}
                  placeholder="https://youtube.com/…"
                />
              </Field>
              <Field label="Instagram (opcional)">
                <Text value={form.instagram} onChange={(v) => set("instagram", v)} placeholder="@seu.perfil" />
              </Field>
              <div className="rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
                Foto de capa e galeria podem ser enviadas depois, direto no painel da
                Landing Page.
              </div>
            </div>
          )}
        </div>

        {/* Navegação */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </button>
          <Button onClick={avancar} size="lg">
            {step === totalPassos ? "Concluir cadastro" : "Continuar"}{" "}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ primitivos */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

function Text({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
    />
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
      className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-surface text-foreground hover:bg-surface-muted"
      }`}
    >
      {children}
    </button>
  );
}

function ChipStep({
  label,
  options,
  selected,
  onToggle,
  requestLabel,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  requestLabel?: string;
}) {
  return (
    <div>
      <span className="mb-3 block text-sm font-medium text-foreground">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <button
              key={o}
              onClick={() => onToggle(o)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                on
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-foreground hover:bg-surface-muted"
              }`}
            >
              {on && <Check className="mr-1 inline h-3.5 w-3.5" />}
              {o}
            </button>
          );
        })}
        {requestLabel && (
          <button className="rounded-full border border-dashed border-border px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground">
            + {requestLabel}
          </button>
        )}
      </div>
    </div>
  );
}
