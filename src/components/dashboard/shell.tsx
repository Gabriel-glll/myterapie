"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogOut, ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export type NavItem = { href: string; label: string; icon: LucideIcon };

export function DashboardShell({
  items,
  role,
  user,
  children,
}: {
  items: NavItem[];
  role: string;
  user: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1">
      {items.map((it) => {
        const active =
          pathname === it.href ||
          (it.href !== items[0].href && pathname.startsWith(it.href));
        return (
          <Link
            key={it.href}
            href={it.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
            }`}
          >
            <it.icon className="h-[18px] w-[18px]" />
            {it.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface p-4 lg:flex">
        <div className="px-2">
          <Logo />
        </div>
        <p className="mt-1 px-2 text-xs font-medium uppercase tracking-wide text-primary">
          {role}
        </p>
        <div className="mt-6 flex-1">{nav}</div>
        <div className="mt-4 border-t border-border pt-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface-muted"
          >
            <ArrowLeft className="h-[18px] w-[18px]" /> Voltar ao site
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface-muted"
          >
            <LogOut className="h-[18px] w-[18px]" /> Sair
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border glass px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm text-muted-foreground">
              Olá, <span className="font-medium text-foreground">{user}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white sm:flex">
              {user.slice(0, 1)}
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-surface p-4 shadow-2xl">
            <div className="flex items-center justify-between px-2">
              <Logo />
              <button onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 px-2 text-xs font-medium uppercase tracking-wide text-primary">
              {role}
            </p>
            <div className="mt-6">{nav}</div>
            <Link href="/" className="mt-4 flex items-center gap-3 rounded-xl border-t border-border px-3 py-2.5 pt-4 text-sm text-muted-foreground">
              <ArrowLeft className="h-[18px] w-[18px]" /> Voltar ao site
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------- page helpers */
export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
