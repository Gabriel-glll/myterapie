import { PlanCards } from "@/components/plan-cards";

export const metadata = { title: "Planos" };

export default function PlanosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Planos
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
          Escolha o plano ideal para a sua prática
        </h1>
        <p className="mt-3 text-muted-foreground">
          Sem intermediação de pagamento das consultas. Você paga apenas a
          mensalidade da plataforma e recebe seus pacientes diretamente.
        </p>
      </div>

      <div className="mt-14">
        <PlanCards />
      </div>

      <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border bg-surface-muted/50 p-6 text-center text-sm text-muted-foreground">
        Precisa de destaque, manutenção de site ou serviços adicionais? Oferecemos
        extras sob demanda. Fale com a nossa equipe após a assinatura.
      </div>
    </div>
  );
}
