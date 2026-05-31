import Link from "next/link";

const featureCards = [
  {
    title: "Generación IA segura",
    description:
      "Historias adaptadas de 0 a 8 años con narración por voz e ilustraciones.",
  },
  {
    title: "Perfiles múltiples",
    description:
      "Cada niño tiene su perfil, progreso y recomendaciones personalizadas.",
  },
  {
    title: "Control parental",
    description:
      "Límites diarios, filtros de contenido y supervisión de actividad familiar.",
  },
  {
    title: "SaaS escalable",
    description:
      "Sistema de suscripciones, panel admin, SEO optimizado y experiencia PWA.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <section className="rounded-3xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 p-8 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.2em] text-indigo-100">Cuentos para Niños</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight">
          Plataforma SaaS de cuentos infantiles con IA, voz e ilustración
        </h1>
        <p className="mt-4 max-w-3xl text-indigo-100">
          Solución moderna para familias con perfiles infantiles, seguimiento lector,
          recomendaciones por edad, control parental y suscripciones.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/familia" className="rounded-xl bg-white px-4 py-2 font-semibold text-indigo-700">
            Ir al dashboard familiar
          </Link>
          <Link
            href="/control-parental"
            className="rounded-xl border border-white/60 px-4 py-2 font-semibold"
          >
            Configurar control parental
          </Link>
          <Link href="/admin" className="rounded-xl border border-white/60 px-4 py-2 font-semibold">
            Ver panel de administración
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {featureCards.map((feature) => (
          <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{feature.title}</h2>
            <p className="mt-2 text-slate-600">{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
