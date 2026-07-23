"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  CalendarClock,
  History,
  UserCircle,
} from "lucide-react";

const tabs = [
  { href: "/paciente", label: "Início", icon: LayoutDashboard },
  { href: "/paciente/favoritos", label: "Favoritos", icon: Heart },
  { href: "/paciente/agendamentos", label: "Agendamentos", icon: CalendarClock },
  { href: "/paciente/historico", label: "Histórico", icon: History },
  { href: "/paciente/perfil", label: "Meu Perfil", icon: UserCircle },
];

export default function PacienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (usePathname() || "").replace(/\/$/, "");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Sub-navegação da área do paciente, integrada ao site */}
      <nav className="mb-8 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => {
          const active =
            pathname === t.href ||
            (t.href !== "/paciente" && pathname.startsWith(t.href));
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                  : "bg-surface-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </Link>
          );
        })}
      </nav>

      {children}
    </div>
  );
}
