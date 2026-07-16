import { notFound } from "next/navigation";

const DOCS: Record<string, { titulo: string; paragrafos: string[] }> = {
  termos: {
    titulo: "Termos de Uso",
    paragrafos: [
      "Bem-vindo à MyTerapie. Ao utilizar nossa plataforma, você concorda com estes Termos de Uso.",
      "A MyTerapie é um marketplace que conecta pacientes e terapeutas. Não intermediamos o pagamento das consultas nem prestamos serviços de saúde diretamente.",
      "Os profissionais são responsáveis pelas informações de seus perfis e pelo atendimento prestado. Os pacientes são responsáveis pelas informações fornecidas ao solicitar agendamentos.",
      "É proibido o uso da plataforma para fins ilícitos ou que violem direitos de terceiros.",
    ],
  },
  privacidade: {
    titulo: "Política de Privacidade",
    paragrafos: [
      "Sua privacidade é prioridade. Esta política descreve como coletamos, usamos e protegemos seus dados.",
      "Coletamos apenas os dados necessários para o funcionamento da plataforma: cadastro, preferências de busca e histórico de agendamentos.",
      "Não compartilhamos seus dados com terceiros sem consentimento, exceto quando exigido por lei.",
      "Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento.",
    ],
  },
  lgpd: {
    titulo: "LGPD — Lei Geral de Proteção de Dados",
    paragrafos: [
      "A MyTerapie está em conformidade com a Lei nº 13.709/2018 (LGPD).",
      "Tratamos dados pessoais com base legal, finalidade específica e transparência.",
      "Você tem direito à confirmação do tratamento, acesso, correção, anonimização, portabilidade e eliminação dos seus dados.",
      "Nosso Encarregado de Dados (DPO) pode ser contatado pelo e-mail privacidade@myterapie.com.br.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(DOCS).map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  const { doc } = await params;
  return { title: DOCS[doc]?.titulo ?? "Legal" };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  const { doc } = await params;
  const content = DOCS[doc];
  if (!content) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {content.titulo}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Última atualização: julho de 2026
      </p>
      <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
        {content.paragrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
