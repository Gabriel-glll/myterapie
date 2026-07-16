"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, UserRound, HeartHandshake } from "lucide-react";
import { Button } from "./ui";

export function AuthForm({ mode }: { mode: "entrar" | "cadastro" }) {
  const router = useRouter();
  const [tipo, setTipo] = useState<"paciente" | "terapeuta">("paciente");
  const [planoParam, setPlanoParam] = useState("");

  // Lê ?plano= da URL no cliente (compatível com static export).
  useEffect(() => {
    const plano = new URLSearchParams(window.location.search).get("plano");
    if (plano) {
      setPlanoParam(plano);
      setTipo("terapeuta");
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Protótipo: sem backend. Direciona ao painel correspondente.
    // (Integração com Supabase Auth já preparada em src/lib/supabase.)
    router.push(tipo === "terapeuta" ? "/painel" : "/paciente");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "cadastro" && (
        <div className="grid grid-cols-2 gap-2">
          <TipoBtn
            active={tipo === "paciente"}
            onClick={() => setTipo("paciente")}
            icon={UserRound}
            label="Sou paciente"
          />
          <TipoBtn
            active={tipo === "terapeuta"}
            onClick={() => setTipo("terapeuta")}
            icon={HeartHandshake}
            label="Sou terapeuta"
          />
        </div>
      )}

      {mode === "cadastro" && (
        <InputField icon={User} type="text" placeholder="Nome completo" required />
      )}
      <InputField icon={Mail} type="email" placeholder="E-mail" required />
      <InputField icon={Lock} type="password" placeholder="Senha" required />

      {mode === "cadastro" && tipo === "terapeuta" && planoParam && (
        <p className="rounded-xl bg-secondary-soft px-4 py-3 text-sm text-primary">
          Plano selecionado: <strong className="capitalize">{planoParam}</strong>. Após
          a confirmação do pagamento, você poderá começar o cadastro por etapas.
        </p>
      )}

      <Button type="submit" size="lg" className="w-full">
        {mode === "entrar" ? "Entrar" : "Criar conta"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Protótipo — acesso direto ao painel de demonstração.
      </p>
    </form>
  );
}

function TipoBtn({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-sm font-medium transition ${
        active
          ? "border-primary bg-secondary-soft text-primary"
          : "border-border bg-surface text-muted-foreground hover:bg-surface-muted"
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );
}

function InputField({
  icon: Icon,
  ...props
}: { icon: React.ComponentType<{ className?: string }> } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 focus-within:border-primary">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <input
        {...props}
        className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
