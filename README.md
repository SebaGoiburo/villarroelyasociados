# Villarroel & Asociados Consultora — Sitio + Panel admin

Sitio institucional con **Next.js 15** (App Router + TypeScript) y **panel de
administración** (`/admin`) para autogestionar contenidos, configuración, píxeles y
notas. Objetivo de conversión: consultas por **WhatsApp** y **formulario**.

## Stack

- **Next.js 15 / React 19 / TypeScript**
- **Prisma** — SQLite en desarrollo, **Postgres (Neon)** en producción
- **Auth** propia (bcrypt + JWT con `jose`) para un admin único
- **Resend** (email del formulario) · **Vercel Blob** (imágenes) · **Vercel** (hosting)

## Puesta en marcha (desarrollo)

```bash
npm install            # instala dependencias (corre prisma generate)
cp .env.example .env   # ya viene un .env de dev con SQLite
npm run setup          # crea la DB (SQLite) y carga el seed
npm run dev            # http://localhost:3000  ·  panel en /admin
```

Credenciales de admin (dev, definidas en `.env`):
`admin@villarroelyasociados.com.ar` / (contraseña: ver `.env`)

## Scripts

| Script | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | `prisma generate` + build de producción |
| `npm run setup` | `prisma db push` + seed |
| `npm run db:seed` | Re-cargar seed (no pisa ediciones del cliente) |
| `npm run db:studio` | Prisma Studio (inspeccionar la DB) |

## Documentación

- [`docs/PLAN.md`](docs/PLAN.md) — spec técnico, arquitectura y estado por etapa.
- [`docs/GUIA-ADMIN.md`](docs/GUIA-ADMIN.md) — guía de uso del panel para el cliente.
- [`docs/DEPLOY.md`](docs/DEPLOY.md) — deploy a Vercel + Neon + Resend + Blob.

## Estructura

```
app/(public)/   Sitio público (6 páginas + recursos/[slug])
app/admin/      Panel: login + (panel) protegido
app/api/        API del formulario de contacto
components/     UI pública + components/admin/
lib/            prisma, settings, content, services, whatsapp, auth, upload,
                markdown, slug, rate-limit, content-defaults, content-labels
prisma/         schema.prisma + seed.ts
docs/           PLAN, GUIA-ADMIN, DEPLOY
legacy/         Sitio estático original (referencia, no se publica)
```

## Qué es editable desde `/admin`

- **Contenidos**: textos y SEO de cada página.
- **Configuración**: logo, WhatsApp (número/mensaje/toggles), email del formulario.
- **Medición**: Meta Pixel, GTM, GA4, Google Ads (por ID, sin pegar scripts).
- **Recursos**: CRUD de notas (Markdown sanitizado, imagen, estado, SEO).

## Pendientes del cliente para producción

Ver checklist en [`docs/DEPLOY.md`](docs/DEPLOY.md): cuentas Neon/Resend/Vercel,
DNS para email, URLs de redes sociales, fotos reales y texto de privacidad.
