import { PageHeader } from "@/components/dashboard/shell";
import { Button } from "@/components/ui";

function Input({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <input
        defaultValue={value}
        className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}

export default function PacientePerfilPage() {
  return (
    <>
      <PageHeader title="Meu Perfil" subtitle="Seus dados pessoais." />
      <div className="max-w-xl space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <Input label="Nome completo" value="Marina Lopes" />
        <Input label="E-mail" value="marina@email.com" />
        <div className="grid grid-cols-2 gap-3">
          <Input label="CPF" value="123.456.789-00" />
          <Input label="Data de nascimento" value="15/03/1992" />
        </div>
        <Input label="Endereço completo" value="Rua das Flores, 123 — Apto 45, Jardim Paulista" />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Cidade" value="São Paulo" />
          <Input label="Estado" value="SP" />
        </div>
        <Input label="Telefone" value="(11) 99999-0000" />
        <Input label="Convênio" value="Unimed — Plano Completo" />
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar</Button>
        </div>
      </div>
    </>
  );
}
