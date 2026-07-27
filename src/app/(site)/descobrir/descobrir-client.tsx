"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  MapPin,
  Video,
  RotateCcw,
} from "lucide-react";
import { TERAPEUTAS, ABORDAGENS, PUBLICOS } from "@/lib/data";
import type { Terapeuta, Disponibilidade } from "@/lib/types";
import { formatBRL } from "@/lib/utils";
import { Button, Stars } from "@/components/ui";

/* ------------------------------------------------------------- perguntas */
type Answers = {
  modalidade: string[];
  genero: string[];
  publico: string[];
  horario: string[];
  abordagem: string[];
  primeiraGratuita: string[];
};

const vazio: Answers = {
  modalidade: [],
  genero: [],
  publico: [],
  horario: [],
  abordagem: [],
  primeiraGratuita: [],
};

type Step = {
  key: keyof Answers;
  titulo: string;
  subtitulo: string;
  options: { label: string; value: string }[];
};

const HLABEL: Record<string, string> = { manha: "manhã", tarde: "tarde", noite: "noite" };

const STEPS: Step[] = [
  {
    key: "modalidade",
    titulo: "Como você prefere ser atendido?",
    subtitulo: "Pode escolher mais de uma opção.",
    options: [
      { label: "Online", value: "Online" },
      { label: "Presencial", value: "Presencial" },
    ],
  },
  {
    key: "genero",
    titulo: "Prefere um profissional homem ou mulher?",
    subtitulo: "Marque um, os dois, ou nenhum se tanto faz.",
    options: [
      { label: "Homem", value: "homem" },
      { label: "Mulher", value: "mulher" },
    ],
  },
  {
    key: "publico",
    titulo: "Para quem é o atendimento?",
    subtitulo: "Pode escolher mais de uma opção.",
    options: PUBLICOS.map((p) => ({ label: p, value: p })),
  },
  {
    key: "horario",
    titulo: "Qual horário você prefere?",
    subtitulo: "Comparamos com a agenda disponível de cada profissional.",
    options: [
      { label: "Manhã", value: "manha" },
      { label: "Tarde", value: "tarde" },
      { label: "Noite", value: "noite" },
    ],
  },
  {
    key: "abordagem",
    titulo: "Tem preferência de abordagem?",
    subtitulo: "Opcional — pode escolher mais de uma.",
    options: ABORDAGENS.map((a) => ({ label: a, value: a })),
  },
  {
    key: "primeiraGratuita",
    titulo: "Quer priorizar quem oferece 1ª consulta gratuita?",
    subtitulo: "Opcional.",
    options: [{ label: "Sim, é importante", value: "sim" }],
  },
];

/* ------------------------------------------------------- recomendação/score */
type Rec = { t: Terapeuta; score: number; reasons: string[] };

function recomendar(ans: Answers): Rec[] {
  const recs: Rec[] = [];
  for (const t of TERAPEUTAS) {
    const reasons: string[] = [];
    let score = 0;

    if (ans.modalidade.length) {
      const m = ans.modalidade.filter((x) => t.modalidades.includes(x as never));
      if (!m.length) continue;
      score += 2;
      reasons.push(`Atende ${m.join(" e ").toLowerCase()}, como você prefere.`);
    }
    if (ans.genero.length) {
      if (!ans.genero.includes(t.genero)) continue;
      score += 1;
      reasons.push(
        `Profissional ${t.genero === "mulher" ? "mulher" : "homem"}, como você preferiu.`,
      );
    }
    if (ans.publico.length) {
      const m = ans.publico.filter((p) => t.publicos.includes(p as never));
      if (!m.length) continue;
      score += 2;
      reasons.push(`Tem experiência com ${m.join(", ").toLowerCase()}.`);
    }
    if (ans.horario.length) {
      const m = ans.horario.filter(
        (h) => t.disponibilidade[h as keyof Disponibilidade],
      );
      if (!m.length) continue;
      score += 2;
      reasons.push(
        `Tem horário de ${m.map((h) => HLABEL[h]).join(", ")} disponível na agenda.`,
      );
    }
    if (ans.abordagem.length) {
      const m = ans.abordagem.filter((a) => t.abordagens.includes(a));
      if (m.length) {
        score += 2;
        reasons.push(`Trabalha com ${m.join(", ")}.`);
      }
    }
    if (ans.primeiraGratuita.includes("sim") && t.primeiraGratuita) {
      score += 1.5;
      reasons.push("Oferece a primeira consulta gratuita.");
    }

    // qualidade — o destaque é uma forma adicional de recomendação
    score += t.notaMedia;
    if (t.destaque) score += 1;
    reasons.push(`Nota ${t.notaMedia.toFixed(1)} em ${t.totalAvaliacoes} avaliações.`);

    recs.push({ t, score, reasons: reasons.slice(0, 3) });
  }
  return recs.sort((a, b) => b.score - a.score);
}

function toQuery(ans: Answers): string {
  const p = new URLSearchParams();
  if (ans.modalidade.includes("Online")) p.set("online", "1");
  if (ans.modalidade.includes("Presencial")) p.set("presencial", "1");
  if (ans.publico[0]) p.set("publico", ans.publico[0]);
  if (ans.abordagem[0]) p.set("abordagem", ans.abordagem[0]);
  if (ans.primeiraGratuita.includes("sim")) p.set("primeiraGratuita", "1");
  const s = p.toString();
  return s ? `/buscar?${s}` : "/buscar";
}

/* --------------------------------------------------------------- componente */
export function DescobrirClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(vazio);
  const [done, setDone] = useState(false);

  const total = STEPS.length;
  const current = STEPS[step];
  const selecionadas = answers[current.key];

  function toggle(value: string) {
    setAnswers((prev) => {
      const arr = prev[current.key];
      return {
        ...prev,
        [current.key]: arr.includes(value)
          ? arr.filter((x) => x !== value)
          : [...arr, value],
      };
    });
  }

  function proximo() {
    if (step < total - 1) setStep(step + 1);
    else setDone(true);
  }

  const recs = useMemo(() => (done ? recomendar(answers) : []), [done, answers]);
  const top3 = recs.slice(0, 3);

  function reiniciar() {
    setAnswers(vazio);
    setStep(0);
    setDone(false);
  }

  /* ----------------------------------------------------------- RESULTADO */
  if (done) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary-soft px-4 py-1.5 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" /> Recomendações para você
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {top3.length > 0
              ? "Encontramos ótimas opções para você"
              : "Não encontramos uma combinação exata"}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {top3.length > 0
              ? "Com base nas suas respostas, estes profissionais são os que mais combinam com você."
              : "Vamos te levar para a busca completa, onde você pode ajustar os filtros com calma."}
          </p>
        </div>

        {top3.length > 0 ? (
          <>
            <div className="mt-10 space-y-5">
              {top3.map((rec, idx) => (
                <RecCard key={rec.t.id} rec={rec} rank={idx + 1} />
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="text-sm text-muted-foreground">
                Nenhum deles te conquistou? Veja a lista completa de profissionais.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button href={toQuery(answers)} variant="outline" size="lg">
                  Ver todos os resultados <ArrowRight className="h-4 w-4" />
                </Button>
                <button
                  onClick={reiniciar}
                  className="inline-flex items-center gap-2 rounded-full px-5 text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  <RotateCcw className="h-4 w-4" /> Refazer perguntas
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-3">
            <Button href={toQuery(answers)} size="lg">
              Ir para a busca com filtros <ArrowRight className="h-4 w-4" />
            </Button>
            <button
              onClick={reiniciar}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              <RotateCcw className="h-4 w-4" /> Refazer perguntas
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ------------------------------------------------------------ PERGUNTAS */
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      {/* Progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Pergunta {step + 1} de {total}
          </span>
          <span>{Math.round(((step + 1) / total) * 100)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {current.titulo}
      </h1>
      <p className="mt-2 text-muted-foreground">{current.subtitulo}</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {current.options.map((opt) => {
          const isSel = selecionadas.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              className={`flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left text-sm font-medium transition ${
                isSel
                  ? "border-primary bg-secondary-soft text-primary"
                  : "border-border bg-surface text-foreground hover:border-primary/60 hover:bg-surface-muted"
              }`}
            >
              {opt.label}
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                  isSel
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border"
                }`}
              >
                {isSel && <Check className="h-4 w-4" />}
              </span>
            </button>
          );
        })}
      </div>

      {/* Navegação */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>
        <Button onClick={proximo} size="lg">
          {step === total - 1 ? "Ver recomendações" : "Próximo"}{" "}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Prefere ir direto?{" "}
        <Link href="/buscar" className="font-medium text-primary hover:underline">
          Ir para a busca completa
        </Link>
      </p>
    </div>
  );
}

/* ----------------------------------------------------------- card de recomendação */
function RecCard({ rec, rank }: { rec: Rec; rank: number }) {
  const { t, reasons } = rec;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:shadow-lg">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-48">
          <Image src={t.foto} alt={t.nome} fill sizes="192px" className="object-cover" />
          <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow">
            {rank}º
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{t.nome}</h3>
              <p className="text-sm text-muted-foreground">{t.titulo}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Stars value={t.notaMedia} size={14} />
              </div>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {formatBRL(t.preco)}
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {t.cidade}/{t.estado}
            </span>
            {t.modalidades.includes("Online") && (
              <span className="inline-flex items-center gap-1">
                <Video className="h-3.5 w-3.5" /> Online
              </span>
            )}
          </div>

          <div className="mt-4 rounded-xl bg-surface-muted/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Por que combina com você
            </p>
            <ul className="mt-2 space-y-1.5">
              {reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <Button href={`/terapeuta/${t.slug}`} className="w-full sm:w-auto">
              Ver perfil e agendar <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
