import { profiles, readingProgress, stories, subscriptions } from "@/lib/in-memory-store";
import { getRecommendations } from "@/lib/recommendation-engine";

export default function FamilyDashboardPage() {
  const familyId = "family-demo";
  const familyProfiles = profiles.filter((profile) => profile.familyId === familyId);
  const latestStories = stories.slice(0, 4);
  const subscription = subscriptions.find((item) => item.familyId === familyId);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Familiar</h1>
        <p className="mt-1 text-slate-600">Seguimiento de lectura, recomendaciones y plan activo.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Perfiles infantiles</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{familyProfiles.length}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Cuentos generados</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{stories.length}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Plan activo</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{subscription?.plan ?? "free"}</p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-900">Perfiles</h2>
          <div className="mt-4 space-y-4">
            {familyProfiles.map((profile) => {
              const recommendations = getRecommendations(profile);

              return (
                <div key={profile.id} className="rounded-xl border border-slate-100 p-4">
                  <h3 className="font-semibold text-slate-900">
                    {profile.name} · {profile.age} años
                  </h3>
                  <p className="text-sm text-slate-600">
                    Lectura hoy: {profile.readingMinutesToday}/{profile.maxMinutesPerDay} min
                  </p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
                    {recommendations.map((rec) => (
                      <li key={`${profile.id}-${rec.theme}`}>{rec.reason}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-900">Últimos cuentos</h2>
          <div className="mt-4 space-y-3">
            {latestStories.map((story) => (
              <div key={story.id} className="rounded-xl border border-slate-100 p-4">
                <h3 className="font-semibold text-slate-900">{story.title}</h3>
                <p className="text-sm text-slate-600">Tema: {story.theme}</p>
                <p className="text-sm text-slate-600">Narración: {story.voiceNarrationUrl}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Registros de progreso: {readingProgress.length} sesiones.
          </p>
        </article>
      </section>
    </main>
  );
}
