"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, UserRound, HeartHandshake, AlertCircle } from "lucide-react";
import { Button } from "./ui";
import { login, setSession, panelPath, TEST_ACCOUNTS } from "@/lib/auth";

export function AuthForm({ mode }: { mode: "entrar" | "cadastro" }) {
  const router = useRouter();
  const [tipo, setTipo] = useState<"paciente" | "terapeuta">("paciente");
  const [planoParam, setPlanoParam] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");

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
    setErro("");

    if (mode === "entrar") {
      // Protótipo: valida contra as contas de teste.
      const user = login(email, senha);
      if (!user) {
        setErro("E-mail ou senha inválidos. Use uma conta de teste abaixo.");
        return;
      }
      // Terapeuta de teste entra como "acabei de assinar o plano" (onboarding).
      router.push(user.role === "terapeuta" ? "/comecar" : panelPath(user.role));
      return;
    }

    // Cadastro (protótipo): cria a sessão com o tipo escolhido.
    setSession({
      nome: nome || (tipo === "terapeuta" ? "Novo terapeuta" : "Novo paciente"),
      email,
      role: tipo,
    });
    // Terapeuta recém-assinante vai para o cadastro por etapas.
    router.push(tipo === "terapeuta" ? "/comecar" : "/paciente");
  }

  function preencherTeste(role: "paciente" | "terapeuta") {
    const acc = TEST_ACCOUNTS.find((a) => a.role === role);
    if (acc) {
      setEmail(acc.email);
      setSenha(acc.senha);
      setErro("");
    }
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
        <InputField
          icon={User}
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      )}
      <InputField
        icon={Mail}
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        icon={Lock}
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      {erro && (
        <p className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
          <AlertCircle className="h-4 w-4 shrink-0" /> {erro}
        </p>
      )}

      {mode === "cadastro" && tipo === "terapeuta" && planoParam && (
        <p className="rounded-xl bg-secondary-soft px-4 py-3 text-sm text-primary">
          Plano selecionado: <strong className="capitalize">{planoParam}</strong>. Após
          a confirmação do pagamento, você poderá começar o cadastro por etapas.
        </p>
      )}

      <Button type="submit" size="lg" className="w-full">
        {mode === "entrar" ? "Entrar" : "Criar conta"}
      </Button>

      {mode === "entrar" && (
        <div className="rounded-xl border border-dashed border-border bg-surface-muted/50 p-3 text-xs">
          <p className="mb-2 font-semibold text-foreground">Contas de teste</p>
          <button
            type="button"
            onClick={() => preencherTeste("paciente")}
            className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-muted-foreground transition hover:bg-surface hover:text-foreground"
          >
            <span>👤 Paciente — paciente@myterapie.com</span>
            <span className="font-medium text-primary">usar</span>
          </button>
          <button
            type="button"
            onClick={() => preencherTeste("terapeuta")}
            className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-muted-foreground transition hover:bg-surface hover:text-foreground"
          >
            <span>💚 Terapeuta — terapeuta@myterapie.com</span>
            <span className="font-medium text-primary">usar</span>
          </button>
          <p className="mt-2 px-2 text-muted-foreground">
            Senha das duas: <strong className="text-foreground">teste123</strong>
          </p>
        </div>
      )}
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
