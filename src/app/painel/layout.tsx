"use client";

import {
  LayoutDashboard,
  UserCircle,
  CalendarDays,
  Inbox,
  Star,
  LayoutTemplate,
  CreditCard,
  Wallet,
  Settings,
} from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard/shell";

const items: NavItem[] = [
  { href: "/painel", label: "Dashboard", icon: LayoutDashboard },
  { href: "/painel/perfil", label: "Meu Perfil", icon: UserCircle },
  { href: "/painel/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/painel/solicitacoes", label: "Solicitações", icon: Inbox },
  { href: "/painel/avaliacoes", label: "Avaliações", icon: Star },
  { href: "/painel/landing", label: "Landing Page", icon: LayoutTemplate },
  { href: "/painel/plano", label: "Meu Plano", icon: CreditCard },
  { href: "/painel/financeiro", label: "Financeiro", icon: Wallet },
  { href: "/painel/configuracoes", label: "Configurações", icon: Settings },
];

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell items={items} role="Terapeuta" user="Ana Beatriz">
      {children}
    </DashboardShell>
  );
}
