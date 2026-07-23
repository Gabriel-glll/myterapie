"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  Copy,
  Palette,
  LayoutList,
  FileText,
  Phone,
  FileDown,
  Crown,
} from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { getSession } from "@/lib/auth";
import { ESPECIALIDADES } from "@/lib/data";

/* ------------------------------------------------------- variáveis padrão */
type Secoes = {
  hero: boolean;
  sobre: boolean;
  especialidades: boolean;
  video: boolean;
  depoimentos: boolean;
  blog: boolean;
  agenda: boolean;
  faq: boolean;
  localizacao: boolean;
  redes: boolean;
};

type Config = {
  nome: string;
  titulo: string;
  slug: string;
  corPrincipal: string;
  corSecundaria: string;
  estilo: string;
  modo: string;
  secoes: Secoes;
  heroFrase: string;
  heroSub: string;
  sobreTexto: string;
  especialidades: string[];
  videoLink: string;
  faqTexto: string;
  whatsapp: string;
  instagram: string;
  email: string;
  cidade: string;
  estado: string;
  ctaTexto: string;
  ctaDestino: string;
  observacoes: string;
};

const SECOES_INFO: { key: keyof Secoes; label: string; desc: string }[] = [
  { key: "hero", label: "Introdução (topo)", desc: "Foto, nome e frase de destaque" },
  { key: "sobre", label: "Sobre você", desc: "Sua história e forma de atender" },
  { key: "especialidades", label: "Especialidades", desc: "Temas e abordagens que você atende" },
  { key: "video", label: "Vídeo de apresentação", desc: "Um vídeo do YouTube" },
  { key: "depoimentos", label: "Depoimentos", desc: "Avaliações de pacientes" },
  { key: "blog", label: "Blog / Artigos", desc: "Seus textos e conteúdos" },
  { key: "agenda", label: "Agenda / Agendamento", desc: "Botão e horários" },
  { key: "faq", label: "Perguntas frequentes (FAQ)", desc: "Dúvidas comuns" },
  { key: "localizacao", label: "Localização / Mapa", desc: "Onde você atende" },
  { key: "redes", label: "Redes sociais", desc: "Instagram, WhatsApp" },
];

const ESTILOS = ["Minimalista", "Aconchegante", "Moderno", "Clássico", "Premium"];
const MODOS = ["Claro", "Escuro", "Ambos (claro e escuro)"];

const inicial: Config = {
  nome: "",
  titulo: "",
  slug: "",
  corPrincipal: "#0FB5AE",
  corSecundaria: "#4CC9F0",
  estilo: "Aconchegante",
  modo: "Ambos (claro e escuro)",
  secoes: {
    hero: true,
    sobre: true,
    especialidades: true,
    video: false,
    depoimentos: true,
    blog: false,
    agenda: true,
    faq: false,
    localizacao: true,
    redes: true,
  },
  heroFrase: "",
  heroSub: "",
  sobreTexto: "",
  especialidades: [],
  videoLink: "",
  faqTexto: "",
  whatsapp: "",
  instagram: "",
  email: "",
  cidade: "",
  estado: "",
  ctaTexto: "Agendar consulta",
  ctaDestino: "Agenda",
  observacoes: "",
};

/* ------------------------------------------------------ gerador do .md */
function buildMd(c: Config): string {
  const sim = (b: boolean) => (b ? "[x]" : "[ ]");
  const data = new Date().toLocaleDateString("pt-BR");
  return `# Landing Page — Configuração
> Gerado pela MyTerapie em ${data}. Envie este arquivo para a equipe criar a sua página.

## Profissional
- Nome: ${c.nome || "—"}
- Título: ${c.titulo || "—"}
- URL desejada (slug): ${c.slug || "—"}

## Identidade visual
- Cor principal: ${c.corPrincipal}
- Cor secundária: ${c.corSecundaria}
- Estilo: ${c.estilo}
- Modo: ${c.modo}

## Seções ativas
${SECOES_INFO.map((s) => `- ${sim(c.secoes[s.key])} ${s.label}`).join("\n")}

## Conteúdo
### Introdução (hero)
- Frase de destaque: ${c.heroFrase || "—"}
- Subtítulo: ${c.heroSub || "—"}

### Sobre
${c.sobreTexto || "—"}

### Especialidades
${c.especialidades.length ? c.especialidades.map((e) => `- ${e}`).join("\n") : "—"}

### Vídeo
- Link: ${c.videoLink || "—"}

### FAQ
${c.faqTexto || "—"}

## Contato
- WhatsApp: ${c.whatsapp || "—"}
- Instagram: ${c.instagram || "—"}
- E-mail: ${c.email || "—"}
- Cidade/Estado: ${[c.cidade, c.estado].filter(Boolean).join("/") || "—"}

## Chamada para ação (CTA)
- Texto do botão: ${c.ctaTexto || "—"}
- Destino: ${c.ctaDestino}

## Observações
${c.observacoes || "—"}
`;
}

/* ------------------------------------------------------------- componente */
const STEPS = [
  { label: "Identidade", icon: Palette },
  { label: "Seções", icon: LayoutList },
  { label: "Conteúdo", icon: FileText },
  { label: "Contato", icon: Phone },
  { label: "Revisão", icon: FileDown },
];

export function LandingConfigurator() {
  const [c, setC] = useState<Config>(inicial);
  const [step, setStep] = useState(0);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (s?.nome) setC((p) => ({ ...p, nome: s.nome }));
  }, []);

  const set = <K extends keyof Config>(k: K, v: Config[K]) =>
    setC((p) => ({ ...p, [k]: v }));
  const toggleSecao = (k: keyof Secoes) =>
    setC((p) => ({ ...p, secoes: { ...p.secoes, [k]: !p.secoes[k] } }));
  const toggleEsp = (e: string) =>
    setC((p) => ({
      ...p,
      especialidades: p.especialidades.includes(e)
        ? p.especialidades.filter((x) => x !== e)
        : [...p.especialidades, e],
    }));

  const md = useMemo(() => buildMd(c), [c]);

  function baixar() {
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `landing-${c.slug || "config"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(md);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const total = STEPS.length;

  return (
    <div className="max-w-3xl">
      {/* Cabeçalho */}
      <div className="mb-6 flex items-start gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-soft text-primary">
          <Crown className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Configurar Landing Page
          </h1>
          <p className="text-sm text-muted-foreground">
            Responda as perguntas e baixe o arquivo <strong>.md</strong>. Envie para a
            nossa equipe e a sua página é criada com o seu jeito.
          </p>
        </div>
      </div>

      {/* Passos */}
      <div className="mb-6 flex flex-wrap gap-2">
        {STEPS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setStep(i)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition ${
              i === step
                ? "bg-primary text-primary-foreground"
                : "bg-surface-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <s.icon className="h-4 w-4" /> {s.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        {/* ----------------------------------------------- 0. IDENTIDADE */}
        {step === 0 && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome do profissional">
                <Text value={c.nome} onChange={(v) => set("nome", v)} placeholder="Seu nome" />
              </Field>
              <Field label="Título / profissão">
                <Text value={c.titulo} onChange={(v) => set("titulo", v)} placeholder="Ex: Psicanalista clínica" />
              </Field>
            </div>
            <Field label="URL desejada (endereço da sua página)">
              <div className="flex items-center rounded-xl border border-border bg-surface px-3">
                <span className="text-sm text-muted-foreground">myterapie.com/</span>
                <input
                  value={c.slug}
                  onChange={(e) =>
                    set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))
                  }
                  placeholder="seu-nome"
                  className="h-11 flex-1 bg-transparent px-1 text-sm outline-none"
                />
              </div>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Cor principal">
                <ColorInput value={c.corPrincipal} onChange={(v) => set("corPrincipal", v)} />
              </Field>
              <Field label="Cor secundária">
                <ColorInput value={c.corSecundaria} onChange={(v) => set("corSecundaria", v)} />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Estilo visual">
                <Select value={c.estilo} onChange={(v) => set("estilo", v)} options={ESTILOS} />
              </Field>
              <Field label="Modo de cores">
                <Select value={c.modo} onChange={(v) => set("modo", v)} options={MODOS} />
              </Field>
            </div>
          </div>
        )}

        {/* ----------------------------------------------- 1. SEÇÕES */}
        {step === 1 && (
          <div>
            <p className="mb-4 text-sm text-muted-foreground">
              Escolha o que a sua landing page vai ter:
            </p>
            <div className="space-y-2">
              {SECOES_INFO.map((s) => (
                <button
                  key={s.key}
                  onClick={() => toggleSecao(s.key)}
                  className="flex w-full items-center justify-between rounded-xl border border-border p-4 text-left transition hover:bg-surface-muted"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                  <Switch on={c.secoes[s.key]} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------- 2. CONTEÚDO */}
        {step === 2 && (
          <div className="space-y-5">
            <Field label="Frase de destaque (topo da página)">
              <Text
                value={c.heroFrase}
                onChange={(v) => set("heroFrase", v)}
                placeholder="Ex: Um espaço seguro para cuidar de você"
              />
            </Field>
            <Field label="Subtítulo do topo">
              <Text
                value={c.heroSub}
                onChange={(v) => set("heroSub", v)}
                placeholder="Ex: Psicanálise online e presencial em São Paulo"
              />
            </Field>
            <Field label="Texto do 'Sobre você'">
              <textarea
                value={c.sobreTexto}
                onChange={(e) => set("sobreTexto", e.target.value)}
                rows={4}
                placeholder="Conte sobre a sua escuta, sua abordagem e para quem você atende…"
                className="w-full resize-none rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-primary"
              />
            </Field>
            <div>
              <span className="mb-2 block text-sm font-medium text-foreground">
                Especialidades em destaque
              </span>
              <div className="flex flex-wrap gap-2">
                {ESPECIALIDADES.map((e) => {
                  const on = c.especialidades.includes(e);
                  return (
                    <button
                      key={e}
                      onClick={() => toggleEsp(e)}
                      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                        on
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-surface text-foreground hover:bg-surface-muted"
                      }`}
                    >
                      {on && <Check className="mr-1 inline h-3.5 w-3.5" />}
                      {e}
                    </button>
                  );
                })}
              </div>
            </div>
            {c.secoes.video && (
              <Field label="Link do vídeo de apresentação (YouTube)">
                <Text value={c.videoLink} onChange={(v) => set("videoLink", v)} placeholder="https://youtube.com/…" />
              </Field>
            )}
            {c.secoes.faq && (
              <Field label="Perguntas frequentes (uma por linha: Pergunta | Resposta)">
                <textarea
                  value={c.faqTexto}
                  onChange={(e) => set("faqTexto", e.target.value)}
                  rows={3}
                  placeholder={"Como funciona a primeira sessão? | É uma conversa para nos conhecermos.\nAtende por convênio? | Sim, Unimed e Bradesco."}
                  className="w-full resize-none rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-primary"
                />
              </Field>
            )}
          </div>
        )}

        {/* ----------------------------------------------- 3. CONTATO */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="WhatsApp">
                <Text value={c.whatsapp} onChange={(v) => set("whatsapp", v)} placeholder="(11) 90000-0000" />
              </Field>
              <Field label="Instagram">
                <Text value={c.instagram} onChange={(v) => set("instagram", v)} placeholder="@seu.perfil" />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="E-mail">
                <Text value={c.email} onChange={(v) => set("email", v)} placeholder="voce@email.com" />
              </Field>
              <Field label="Cidade / Estado">
                <div className="grid grid-cols-[1fr_80px] gap-2">
                  <Text value={c.cidade} onChange={(v) => set("cidade", v)} placeholder="Cidade" />
                  <Text value={c.estado} onChange={(v) => set("estado", v)} placeholder="UF" />
                </div>
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Texto do botão principal (CTA)">
                <Text value={c.ctaTexto} onChange={(v) => set("ctaTexto", v)} placeholder="Ex: Agendar consulta" />
              </Field>
              <Field label="O botão leva para">
                <Select
                  value={c.ctaDestino}
                  onChange={(v) => set("ctaDestino", v)}
                  options={["Agenda", "WhatsApp", "Formulário de contato"]}
                />
              </Field>
            </div>
            <Field label="Observações (algo específico que você queira na página)">
              <textarea
                value={c.observacoes}
                onChange={(e) => set("observacoes", e.target.value)}
                rows={3}
                placeholder="Ex: quero um tom mais acolhedor, incluir um versículo, uma cor de fundo suave…"
                className="w-full resize-none rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-primary"
              />
            </Field>
          </div>
        )}

        {/* ----------------------------------------------- 4. REVISÃO */}
        {step === 4 && (
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-foreground">Pronto! 🎉</h2>
                <p className="text-sm text-muted-foreground">
                  Baixe o arquivo e envie para a nossa equipe criar a sua landing.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copiar}>
                  <Copy className="h-4 w-4" /> {copiado ? "Copiado!" : "Copiar"}
                </Button>
                <Button size="sm" onClick={baixar}>
                  <Download className="h-4 w-4" /> Baixar .md
                </Button>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {SECOES_INFO.filter((s) => c.secoes[s.key]).map((s) => (
                <Badge key={s.key} tone="primary">
                  {s.label}
                </Badge>
              ))}
            </div>
            <pre className="max-h-96 overflow-auto rounded-xl border border-border bg-surface-muted/50 p-4 text-xs leading-relaxed text-foreground">
              {md}
            </pre>
          </div>
        )}
      </div>

      {/* Navegação */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>
        {step < total - 1 ? (
          <Button onClick={() => setStep(step + 1)} size="lg">
            Continuar <ArrowRight className="h-5 w-5" />
          </Button>
        ) : (
          <Button onClick={baixar} size="lg">
            <Download className="h-5 w-5" /> Baixar configuração
          </Button>
        )}
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
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
    />
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function ColorInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
        aria-label="Escolher cor"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 flex-1 bg-transparent text-sm uppercase outline-none"
      />
    </div>
  );
}

function Switch({ on }: { on: boolean }) {
  return (
    <span
      className={`inline-flex h-6 w-11 shrink-0 items-center rounded-full px-0.5 transition ${
        on ? "justify-end bg-primary" : "justify-start border border-border bg-surface-muted"
      }`}
    >
      <span className="h-5 w-5 rounded-full bg-white shadow" />
    </span>
  );
}
