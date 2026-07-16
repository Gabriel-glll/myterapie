import { Plus, Pencil } from "lucide-react";
import { PageHeader } from "@/components/dashboard/shell";
import { BLOG_POSTS } from "@/lib/data";
import { Badge, Button } from "@/components/ui";

export default function AdminBlog() {
  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader title="Blog" subtitle="Gerencie os artigos publicados." />
        <Button size="sm">
          <Plus className="h-4 w-4" /> Novo artigo
        </Button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted/50 text-left text-muted-foreground">
              <th className="p-4 font-medium">Título</th>
              <th className="p-4 font-medium">Categoria</th>
              <th className="p-4 font-medium">Autor</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {BLOG_POSTS.map((p) => (
              <tr key={p.slug} className="hover:bg-surface-muted/40">
                <td className="p-4 font-medium text-foreground">{p.titulo}</td>
                <td className="p-4">
                  <Badge tone="primary">{p.categoria}</Badge>
                </td>
                <td className="p-4 text-muted-foreground">{p.autor}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" /> Publicado
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary">
                    <Pencil className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
