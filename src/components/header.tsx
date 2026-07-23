"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, UserCircle } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui";
import { getSession, logout, panelPath, type SessionUser } from "@/lib/auth";

const links = [
  { href: "/buscar", label: "Encontrar terapeuta" },
  { href: "/para-terapeutas", label: "Sou terapeuta" },
  { href: "/planos", label: "Planos" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Recarrega a sessão a cada navegação (login/logout refletem na hora).
  useEffect(() => {
    setUser(getSession());
  }, [pathname]);

  function sair() {
    logout();
    setUser(null);
    setOpen(false);
    router.push("/");
  }

  const areaLabel = user?.role === "terapeuta" ? "Meu painel" : "Minha área";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-surface-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {user ? (
            <>
              <Button href={panelPath(user.role)} variant="outline" size="sm">
                <UserCircle className="h-4 w-4" /> {areaLabel}
              </Button>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white">
                {user.nome.slice(0, 1)}
              </span>
              <button
                onClick={sair}
                aria-label="Sair"
                title="Sair"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Button href="/entrar" variant="outline" size="sm">
                Entrar
              </Button>
              <Button href="/cadastro" size="sm">
                Criar conta
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-surface px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-foreground hover:bg-surface-muted"
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <div className="mt-2 flex flex-col gap-2">
                <Button
                  href={panelPath(user.role)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <UserCircle className="h-4 w-4" /> {areaLabel} — {user.nome}
                </Button>
                <button
                  onClick={sair}
                  className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" /> Sair
                </button>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <Button href="/entrar" variant="outline" size="sm" className="flex-1">
                  Entrar
                </Button>
                <Button href="/cadastro" size="sm" className="flex-1">
                  Criar conta
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
