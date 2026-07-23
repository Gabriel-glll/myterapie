import { PageHeader } from "@/components/dashboard/shell";
import { Stars, Button } from "@/components/ui";

const HISTORICO = [
  ["Ana Beatriz Moraes", "10/07/2026", true],
  ["Ana Beatriz Moraes", "03/07/2026", true],
  ["Fernanda Souza", "20/06/2026", false],
  ["Ana Beatriz Moraes", "26/06/2026", true],
] as const;

export default function HistoricoPage() {
  return (
    <>
      <PageHeader title="Histórico" subtitle="Suas sessões realizadas." />
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted/50 text-left text-muted-foreground">
              <th className="p-4 font-medium">Terapeuta</th>
              <th className="p-4 font-medium">Data</th>
              <th className="p-4 font-medium">Avaliação</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {HISTORICO.map(([nome, data, avaliado], i) => (
              <tr key={i}>
                <td className="p-4 font-medium text-foreground">{nome}</td>
                <td className="p-4 text-muted-foreground">{data}</td>
                <td className="p-4">
                  {avaliado ? (
                    <Stars value={5} size={14} />
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  {!avaliado && (
                    <Button variant="outline" size="sm">
                      Avaliar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
