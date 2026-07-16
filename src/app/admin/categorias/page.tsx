import { Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { ESPECIALIDADES, ABORDAGENS, IDIOMAS } from "@/lib/data";
import { Badge, Button } from "@/components/ui";

function Bloco({ titulo, itens }: { titulo: string; itens: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-foreground">{titulo}</h2>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4" /> Adicionar
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {itens.map((i) => (
          <Badge key={i} tone="primary">
            {i}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default function AdminCategorias() {
  return (
    <>
      <PageHeader
        title="Categorias"
        subtitle="Especialidades, abordagens e idiomas disponíveis na plataforma."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Bloco titulo="Especialidades" itens={ESPECIALIDADES} />
        <Bloco titulo="Abordagens" itens={ABORDAGENS} />
        <Bloco titulo="Idiomas" itens={IDIOMAS} />
        <Bloco titulo="Públicos" itens={["Infantil", "Adolescente", "Adulto", "Idoso", "Casal", "Familiar"]} />
      </div>
    </>
  );
}
