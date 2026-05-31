import { profiles } from "@/lib/in-memory-store";

export default function ParentalControlPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Control Parental</h1>
        <p className="mt-1 text-slate-600">
          Configuración de límites de uso y filtros de seguridad por perfil infantil.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {profiles.map((profile) => (
          <article key={profile.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">{profile.name}</h2>
            <p className="text-sm text-slate-600">Edad: {profile.age} años</p>
            <p className="text-sm text-slate-600">
              Tiempo diario: {profile.readingMinutesToday}/{profile.maxMinutesPerDay} min
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Filtros activos: {profile.contentFilters.join(", ") || "sin restricciones"}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-slate-900">Buenas prácticas implementadas</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
          <li>Límite diario de lectura por niño con control por perfil.</li>
          <li>Bloqueo de generación de cuentos al alcanzar límite configurado.</li>
          <li>Restricción de acceso administrativo mediante clave dedicada.</li>
          <li>Validación estricta de payloads con Zod en API REST.</li>
        </ul>
      </section>
    </main>
  );
}
