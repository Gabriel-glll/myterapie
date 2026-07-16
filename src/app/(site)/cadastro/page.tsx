import Link from "next/link";
import { Logo } from "@/components/logo";
import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Criar conta" };

export default function CadastroPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 sm:px-6">
      <Logo />
      <h1 className="mt-8 text-2xl font-bold text-foreground">Crie sua conta</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Comece sua jornada na MyTerapie.
      </p>

      <div className="mt-8 w-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <AuthForm mode="cadastro" />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Já tem conta?{" "}
        <Link href="/entrar" className="font-medium text-primary hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  );
}
