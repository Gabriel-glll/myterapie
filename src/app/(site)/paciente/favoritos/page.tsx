import { PageHeader } from "@/components/dashboard/shell";
import { TERAPEUTAS } from "@/lib/data";
import { TherapistCard } from "@/components/therapist-card";

export default function FavoritosPage() {
  const favoritos = TERAPEUTAS.slice(0, 4);
  return (
    <>
      <PageHeader title="Favoritos" subtitle="Terapeutas que você salvou." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favoritos.map((t) => (
          <TherapistCard key={t.id} t={t} />
        ))}
      </div>
    </>
  );
}
