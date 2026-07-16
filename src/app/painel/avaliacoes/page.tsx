import { PageHeader } from "@/components/dashboard/shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Stars } from "@/components/ui";
import { Star, MessageSquare, ThumbsUp } from "lucide-react";

const AVALIACOES = [
  ["Marina L.", 5, "A Ana me ajudou a entender questões que eu carregava há anos. Espaço seguro e acolhedor.", "12/05/2026"],
  ["Rafael C.", 5, "Profissional excelente, escuta atenta e muito humana.", "28/04/2026"],
  ["Juliana P.", 5, "Mudou minha forma de lidar com a ansiedade.", "01/06/2026"],
  ["Diego R.", 4, "Ótimo acompanhamento, recomendo.", "15/03/2026"],
] as const;

export default function AvaliacoesPage() {
  return (
    <>
      <PageHeader title="Avaliações" subtitle="O que seus pacientes dizem." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Nota média" value="4.9" icon={Star} />
        <StatCard label="Total de avaliações" value="42" icon={MessageSquare} />
        <StatCard label="Recomendação" value="98%" icon={ThumbsUp} />
      </div>

      <div className="mt-6 space-y-4">
        {AVALIACOES.map(([nome, nota, txt, data]) => (
          <div key={nome} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-soft text-sm font-semibold text-primary">
                  {nome.slice(0, 1)}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{nome}</p>
                  <p className="text-xs text-muted-foreground">{data}</p>
                </div>
              </div>
              <Stars value={nota} size={15} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{txt}</p>
          </div>
        ))}
      </div>
    </>
  );
}
