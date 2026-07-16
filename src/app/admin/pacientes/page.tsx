import { PageHeader } from "@/components/dashboard/shell";
import { Badge } from "@/components/ui";

const PACIENTES = [
  ["Marina Lopes", "marina@email.com", "São Paulo/SP", "11 sessões"],
  ["Rafael Costa", "rafael@email.com", "Rio de Janeiro/RJ", "3 sessões"],
  ["Camila Souza", "camila@email.com", "Belo Horizonte/MG", "7 sessões"],
  ["Diego Ramos", "diego@email.com", "Curitiba/PR", "1 sessão"],
  ["Beatriz Melo", "beatriz@email.com", "Salvador/BA", "5 sessões"],
] as const;

export default function AdminPacientes() {
  return (
    <>
      <PageHeader title="Pacientes" subtitle="1.940 pacientes cadastrados." />
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted/50 text-left text-muted-foreground">
              <th className="p-4 font-medium">Nome</th>
              <th className="p-4 font-medium">E-mail</th>
              <th className="p-4 font-medium">Local</th>
              <th className="p-4 font-medium">Atividade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {PACIENTES.map(([nome, email, local, ativ]) => (
              <tr key={email} className="hover:bg-surface-muted/40">
                <td className="p-4 font-medium text-foreground">{nome}</td>
                <td className="p-4 text-muted-foreground">{email}</td>
                <td className="p-4 text-muted-foreground">{local}</td>
                <td className="p-4">
                  <Badge>{ativ}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
