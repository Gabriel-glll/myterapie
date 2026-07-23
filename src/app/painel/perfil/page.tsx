import { PageHeader } from "@/components/dashboard/shell";
import { Button, Badge } from "@/components/ui";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="font-semibold text-foreground">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Input({ label, value, ...props }: { label: string; value?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <input
        defaultValue={value}
        {...props}
        className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}

export default function PerfilPage() {
  return (
    <>
      <PageHeader title="Meu Perfil" subtitle="Cadastro por etapas — plano Premium." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Group title="Informações pessoais">
          <Input label="Nome completo" value="Ana Beatriz Moraes" />
          <Input label="Título profissional" value="Psicanalista clínica" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Cidade" value="São Paulo" />
            <Input label="Estado" value="SP" />
          </div>
          <Input label="Registro (CRP)" value="CRP 06/123456" />
        </Group>

        <Group title="Sobre (máx. 200 caracteres)">
          <textarea
            defaultValue="Escuta a sua história com acolhimento e profundidade, ajudando você a compreender padrões e retomar o sentido da sua jornada."
            maxLength={200}
            rows={5}
            className="w-full resize-none rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-primary"
          />
          <Input label="Instagram" value="anabeatriz.psi" />
          <Input label="WhatsApp" value="5511999990001" />
        </Group>

        <Group title="Formação">
          <Input label="Formação 1" value="Psicanálise — Instituto Sedes Sapientiae" />
          <Input label="Formação 2" value="Pós em Clínica Psicanalítica — PUC-SP" />
          <button className="text-sm font-medium text-primary hover:underline">
            + Adicionar formação
          </button>
        </Group>

        <Group title="Atendimento & Valores">
          <Input label="Valor da consulta (R$)" value="180" type="number" />
          <div>
            <span className="mb-2 block text-sm font-medium text-foreground">
              Modalidades
            </span>
            <div className="flex flex-wrap gap-2">
              <Badge tone="primary">Online</Badge>
              <Badge tone="primary">Presencial</Badge>
              <button className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground">
                Solicitar nova categoria
              </button>
            </div>
          </div>
          <div>
            <span className="mb-2 block text-sm font-medium text-foreground">
              Idiomas
            </span>
            <div className="flex flex-wrap gap-2">
              <Badge>Português</Badge>
              <Badge>Inglês</Badge>
            </div>
          </div>
          <div>
            <span className="mb-2 block text-sm font-medium text-foreground">
              Especialidades
            </span>
            <div className="flex flex-wrap gap-2">
              <Badge tone="primary">Ansiedade</Badge>
              <Badge tone="primary">Autoconhecimento</Badge>
              <Badge tone="primary">Relacionamentos</Badge>
              <button className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground">
                Solicitar nova categoria
              </button>
            </div>
          </div>
          <div>
            <span className="mb-2 block text-sm font-medium text-foreground">
              Convênios aceitos
            </span>
            <div className="flex flex-wrap gap-2">
              <Badge tone="primary">Unimed</Badge>
              <Badge tone="primary">Bradesco Saúde</Badge>
              <Badge tone="primary">Amil</Badge>
              <Badge tone="primary">SulAmérica</Badge>
              <button className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground">
                Solicitar novo convênio
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Não atende por convênio? Deixe em branco.
            </p>
          </div>
        </Group>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline">Pré-visualizar</Button>
        <Button>Salvar alterações</Button>
      </div>
    </>
  );
}
