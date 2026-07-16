import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {/* Versículo em destaque */}
        <div className="mb-12 rounded-2xl bg-aurora border border-border px-6 py-8 text-center">
          <p className="mx-auto max-w-2xl text-lg font-medium italic text-foreground">
            “Se nós, porém, nos julgássemos a nós mesmos, não seríamos julgados.”
          </p>
          <p className="mt-2 text-sm font-semibold text-primary">
            1 Coríntios 11:31
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Conectando pessoas a terapeutas de confiança para uma jornada de
              cuidado e autoconhecimento.
            </p>
          </div>

          <FooterCol
            title="Plataforma"
            items={[
              ["Encontrar terapeuta", "/buscar"],
              ["Sou terapeuta", "/para-terapeutas"],
              ["Planos", "/planos"],
              ["Blog", "/blog"],
            ]}
          />
          <FooterCol
            title="Institucional"
            items={[
              ["Como funciona", "/#como-funciona"],
              ["Especialidades", "/#especialidades"],
              ["Entrar", "/entrar"],
              ["Criar conta", "/cadastro"],
            ]}
          />
          <FooterCol
            title="Legal"
            items={[
              ["Termos de uso", "/legal/termos"],
              ["Política de Privacidade", "/legal/privacidade"],
              ["LGPD", "/legal/lgpd"],
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} MyTerapie. Todos os direitos reservados.</p>
          <p>Feito com cuidado 💚</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-foreground">{title}</h4>
      <ul className="space-y-2">
        {items.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-muted-foreground transition hover:text-primary"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
