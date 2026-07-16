import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/data";
import { Badge } from "@/components/ui";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Blog
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
          Conteúdo que cuida
        </h1>
        <p className="mt-3 text-muted-foreground">
          Reflexões, guias e ciência sobre saúde mental — escritos por profissionais.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {BLOG_POSTS.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
              <Image
                src={p.capa}
                alt={p.titulo}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <Badge tone="primary">{p.categoria}</Badge>
              <h2 className="mt-3 font-semibold text-foreground group-hover:text-primary">
                {p.titulo}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {p.resumo}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                {p.autor} · {p.data} · {p.leitura}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
