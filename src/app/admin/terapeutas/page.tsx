import { Search } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { TERAPEUTAS } from "@/lib/data";
import { formatBRL } from "@/lib/utils";
import { Badge, Button, Stars } from "@/components/ui";

export default function AdminTerapeutas() {
  return (
    <>
      <PageHeader title="Terapeutas" subtitle={`${TERAPEUTAS.length} profissionais cadastrados.`} />

      <div className="mb-4 flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-surface px-3 sm:max-w-xs">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Buscar..." className="h-10 w-full bg-transparent text-sm outline-none" />
        </div>
        <Button size="sm">Exportar</Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted/50 text-left text-muted-foreground">
              <th className="p-4 font-medium">Nome</th>
              <th className="p-4 font-medium">Cidade</th>
              <th className="p-4 font-medium">Plano</th>
              <th className="p-4 font-medium">Valor</th>
              <th className="p-4 font-medium">Nota</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {TERAPEUTAS.map((t) => (
              <tr key={t.id} className="hover:bg-surface-muted/40">
                <td className="p-4">
                  <p className="font-medium text-foreground">{t.nome}</p>
                  <p className="text-xs text-muted-foreground">{t.titulo}</p>
                </td>
                <td className="p-4 text-muted-foreground">{t.cidade}/{t.estado}</td>
                <td className="p-4">
                  <Badge tone={t.plano === "premium" ? "accent" : "primary"}>{t.plano}</Badge>
                </td>
                <td className="p-4 text-foreground">{formatBRL(t.preco)}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1">
                    <Stars value={t.notaMedia} size={12} />
                    <span className="text-xs text-muted-foreground">{t.notaMedia.toFixed(1)}</span>
                  </span>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" /> Ativo
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
