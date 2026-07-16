"use client";

import { LayoutDashboard, Heart, CalendarClock, History, UserCircle } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard/shell";

const items: NavItem[] = [
  { href: "/paciente", label: "Início", icon: LayoutDashboard },
  { href: "/paciente/favoritos", label: "Favoritos", icon: Heart },
  { href: "/paciente/agendamentos", label: "Agendamentos", icon: CalendarClock },
  { href: "/paciente/historico", label: "Histórico", icon: History },
  { href: "/paciente/perfil", label: "Meu Perfil", icon: UserCircle },
];

export default function PacienteLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell items={items} role="Paciente" user="Marina">
      {children}
    </DashboardShell>
  );
}
