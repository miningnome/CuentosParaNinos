import { profiles, readingProgress, stories, subscriptions } from "@/lib/in-memory-store";

export default function AdminPage() {
  const totalFamilies = new Set(profiles.map((profile) => profile.familyId)).size;
  const activeSubscriptions = subscriptions.filter((item) => item.active).length;
  const averageMinutes =
    readingProgress.length > 0
      ? Math.round(
          readingProgress.reduce((acc, item) => acc + item.minutesRead, 0) /
            readingProgress.length,
        )
      : 0;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Panel de Administración</h1>
        <p className="mt-1 text-slate-600">Moderación, métricas y operación de la plataforma.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric title="Familias" value={totalFamilies} />
        <Metric title="Perfiles" value={profiles.length} />
        <Metric title="Cuentos" value={stories.length} />
        <Metric title="Suscripciones activas" value={activeSubscriptions} />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-slate-900">Estado Operativo</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
          <li>Promedio de lectura por sesión: {averageMinutes} minutos.</li>
          <li>Moderación de contenido IA con filtros por perfil infantil.</li>
          <li>API REST preparada para integración con observabilidad y auditoría.</li>
          <li>Control de acceso administrativo por cabecera x-admin-key.</li>
        </ul>
      </section>
    </main>
  );
}

function Metric({ title, value }: { title: string; value: number }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
    </article>
  );
}
