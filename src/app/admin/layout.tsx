"use client";

import {
  LayoutDashboard,
  Users,
  UserRound,
  CreditCard,
  Tags,
  Inbox,
  Newspaper,
  Wallet,
  Star,
  BarChart3,
} from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard/shell";

const items: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/terapeutas", label: "Terapeutas", icon: Users },
  { href: "/admin/pacientes", label: "Pacientes", icon: UserRound },
  { href: "/admin/planos", label: "Planos", icon: CreditCard },
  { href: "/admin/categorias", label: "Categorias", icon: Tags },
  { href: "/admin/solicitacoes", label: "Solicitações", icon: Inbox },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/destaques", label: "Destaques", icon: Star },
  { href: "/admin/financeiro", label: "Financeiro", icon: Wallet },
  { href: "/admin/relatorios", label: "Relatórios", icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell items={items} role="Administrador" user="Admin">
      {children}
    </DashboardShell>
  );
}
