import { Check, X } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { Badge } from "@/components/ui";

const SOLICITACOES = [
  ["Ana Beatriz Moraes", "Especialidade", "Terapia do luto perinatal", "Pendente"],
  ["Carlos Eduardo Lima", "Abordagem", "Análise Bioenergética", "Pendente"],
  ["Fernanda Souza", "Idioma", "Francês", "Aprovado"],
  ["Marcos Vieira", "Especialidade", "Dependência química", "Pendente"],
] as const;

export default function AdminSolicitacoes() {
  return (
    <>
      <PageHeader
        title="Solicitações de categoria"
        subtitle="Novas categorias solicitadas por terapeutas (via e-mail)."
      />
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted/50 text-left text-muted-foreground">
              <th className="p-4 font-medium">Solicitante</th>
              <th className="p-4 font-medium">Tipo</th>
              <th className="p-4 font-medium">Valor</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {SOLICITACOES.map(([quem, tipo, valor, status], i) => (
              <tr key={i} className="hover:bg-surface-muted/40">
                <td className="p-4 font-medium text-foreground">{quem}</td>
                <td className="p-4 text-muted-foreground">{tipo}</td>
                <td className="p-4 text-foreground">{valor}</td>
                <td className="p-4">
                  <Badge tone={status === "Aprovado" ? "primary" : "accent"}>{status}</Badge>
                </td>
                <td className="p-4">
                  {status === "Pendente" ? (
                    <div className="flex gap-2">
                      <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Check className="h-4 w-4" />
                      </button>
                      <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-red-500">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
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
