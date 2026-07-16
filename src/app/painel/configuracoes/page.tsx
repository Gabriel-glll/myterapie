import { PageHeader } from "@/components/dashboard/shell";
import { Button } from "@/components/ui";

function Row({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-4 last:border-0">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function Switch({ on = true }: { on?: boolean }) {
  return (
    <span
      className={`inline-flex h-6 w-11 items-center rounded-full px-0.5 ${
        on ? "justify-end bg-primary" : "justify-start bg-surface-muted border border-border"
      }`}
    >
      <span className="h-5 w-5 rounded-full bg-white shadow" />
    </span>
  );
}

export default function ConfiguracoesPage() {
  return (
    <>
      <PageHeader title="Configurações" subtitle="Preferências da sua conta." />

      <div className="max-w-2xl space-y-6">
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="font-semibold text-foreground">Conta</h2>
          <div className="mt-2">
            <Row title="E-mail" desc="ana.beatriz@email.com">
              <Button variant="outline" size="sm">Alterar</Button>
            </Row>
            <Row title="Senha" desc="Última alteração há 3 meses">
              <Button variant="outline" size="sm">Alterar</Button>
            </Row>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="font-semibold text-foreground">Notificações</h2>
          <div className="mt-2">
            <Row title="Novas solicitações" desc="Receber e-mail a cada solicitação">
              <Switch on />
            </Row>
            <Row title="Novas avaliações" desc="Avisar quando um paciente avaliar">
              <Switch on />
            </Row>
            <Row title="Novidades da plataforma" desc="Dicas e atualizações">
              <Switch on={false} />
            </Row>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="font-semibold text-foreground">Privacidade</h2>
          <div className="mt-2">
            <Row title="Perfil público" desc="Aparecer nas buscas e ter landing ativa">
              <Switch on />
            </Row>
            <Row title="Exportar meus dados (LGPD)" desc="Baixe uma cópia dos seus dados">
              <Button variant="outline" size="sm">Solicitar</Button>
            </Row>
          </div>
        </section>
      </div>
    </>
  );
}
