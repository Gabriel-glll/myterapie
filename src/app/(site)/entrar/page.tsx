import Link from "next/link";
import { Logo } from "@/components/logo";
import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Entrar" };

export default function EntrarPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 sm:px-6">
      <Logo />
      <h1 className="mt-8 text-2xl font-bold text-foreground">Bem-vindo de volta</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Entre para agendar, favoritar e avaliar.
      </p>

      <div className="mt-8 w-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <AuthForm mode="entrar" />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Não tem conta?{" "}
        <Link href="/cadastro" className="font-medium text-primary hover:underline">
          Criar conta
        </Link>
      </p>
    </div>
  );
}
