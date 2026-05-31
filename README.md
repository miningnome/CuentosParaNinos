# Cuentos Para Niños

Plataforma SaaS de cuentos infantiles (0 a 8 años) con arquitectura base en **Next.js + TypeScript + Tailwind CSS + MongoDB + API REST**, orientada a familias.

## Incluye en esta implementación

- Generación de historias por IA (servicio base listo para conectar proveedor real).
- Narración por voz e ilustración modeladas como recursos por cuento.
- Perfiles múltiples por familia.
- Seguimiento de lectura y límites diarios.
- Recomendaciones personalizadas por edad e intereses.
- Control parental por perfil (filtros + tiempo).
- Suscripciones por plan (free/plus/premium) con límites mensuales.
- Panel de administración con métricas operativas.
- SEO técnico base (metadata, `robots`, `sitemap`).
- PWA base (`manifest` y navegación preparada).

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- MongoDB (Mongoose modelado listo)
- API REST en `app/api/*`

## Rutas principales

- `/` Landing del producto
- `/familia` Dashboard familiar
- `/control-parental` Panel de control parental
- `/admin` Panel de administración

## API REST

- `GET/POST /api/profiles`
- `GET/POST /api/stories`
- `GET /api/recommendations?profileId=...`
- `GET/POST /api/reading-progress`
- `GET/POST /api/subscriptions`
- `GET /api/admin/metrics` (requiere header `x-admin-key`)

Headers útiles:

- `x-family-id`: contexto familiar (por defecto `family-demo`)
- `x-admin-key`: autenticación simple para endpoints admin

## Variables de entorno

Crea `.env.local`:

```bash
MONGODB_URI=mongodb://localhost:27017/cuentos_para_ninos
MONGODB_DB=cuentos_para_ninos
ADMIN_PANEL_KEY=dev-admin-key
```

> Si `MONGODB_URI` no está configurada, la app usa almacenamiento en memoria para desarrollo local.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Notas de seguridad

- Validación de payloads con Zod en endpoints.
- Restricciones de edad (0-8) y límites diarios de consumo.
- Separación de contexto familiar por header y control admin dedicado.
