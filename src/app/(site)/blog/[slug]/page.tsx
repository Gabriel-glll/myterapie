import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS, getPost } from "@/lib/data";
import { Badge } from "@/components/ui";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  return p ? { title: p.titulo, description: p.resumo } : { title: "Artigo" };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar ao blog
      </Link>

      <div className="mt-6">
        <Badge tone="primary">{p.categoria}</Badge>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          {p.titulo}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Por {p.autor} · {p.data} · {p.leitura} de leitura
        </p>
      </div>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
        <Image src={p.capa} alt={p.titulo} fill sizes="768px" className="object-cover" />
      </div>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/90">
        <p className="text-xl font-medium text-foreground">{p.resumo}</p>
        {p.conteudo.map((par, i) => (
          <p key={i}>{par}</p>
        ))}
      </div>
    </article>
  );
}
