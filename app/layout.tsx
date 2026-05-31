import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cuentos Para Niños | Plataforma SaaS infantil",
  description:
    "Plataforma SaaS de cuentos infantiles con IA, narración por voz, ilustraciones, perfiles múltiples, control parental y suscripciones.",
  keywords: [
    "cuentos infantiles",
    "IA para niños",
    "lectura infantil",
    "control parental",
    "plataforma educativa",
  ],
  applicationName: "Cuentos Para Niños",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cuentos Para Niños",
    description: "Historias personalizadas para niños de 0 a 8 años.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold text-indigo-700">
              Cuentos Para Niños
            </Link>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
              <Link href="/familia">Familia</Link>
              <Link href="/control-parental">Control parental</Link>
              <Link href="/admin">Admin</Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
