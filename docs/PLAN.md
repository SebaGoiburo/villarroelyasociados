# Villarroel & Asociados — Spec técnico y plan de trabajo

> Documento de continuidad. Si se reinicia el contexto, leer esto primero para
> saber qué está hecho, cómo está armado y qué falta. Mantener actualizado al
> cerrar cada etapa.

Última actualización: **Etapas 1-8 completadas. Pendiente: deploy con las cuentas del cliente (ver docs/DEPLOY.md).**

---

## 1. Objetivo

Sitio institucional de **Villarroel & Asociados Consultora** (estudio contable /
consultora, San Martín, Mendoza) **+ panel admin** (`/admin`) para que el cliente
autogestione contenidos, configuración, píxeles y notas sin tocar código.
Objetivo de conversión: consultas por **WhatsApp** y **formulario**.

## 2. Stack y decisiones (confirmadas con el cliente)

- **Next.js 15 (App Router) + TypeScript + React 19**. Migrado desde un sitio
  estático previo (conservado en `legacy/`).
- **Hosting destino: Vercel.** Implica filesystem efímero → DB e imágenes externas.
- **Base de datos: Prisma.**
  - DEV: **SQLite** (`file:./dev.db`), provider `sqlite` en `prisma/schema.prisma`.
  - PROD: **Postgres (Neon)** → cambiar `provider = "postgresql"` y `DATABASE_URL`.
  - Campos JSON guardados como **String** (texto JSON) para compatibilidad SQLite/PG.
- **Email: Resend** (Etapa 7). Requiere API key + idealmente DNS del dominio (SPF/DKIM).
- **Imágenes (logo/notas): Vercel Blob** en prod; en dev se guardan en `/public/uploads`.
- **Auth: admin único.** bcrypt + JWT (`jose`) en cookie httpOnly. Middleware en edge.
- **Píxeles: por ID** (no script crudo) — Meta, GA4, GTM, Google Ads.
- **Edición de contenidos: secciones predefinidas** (no page-builder libre).
- **Logo: solo PNG/JPG/WebP** (SVG descartado por XSS, salvo pedido expreso).
- Tipografía: **Hanken Grotesk** (next/font). Diseño = `app/globals.css` (portado).

## 3. Estructura del proyecto

```
app/
  layout.tsx                      Root: <html><body>, fuente, metadataBase
  globals.css                     Sistema visual del sitio público (+ .prose)
  sitemap.ts, robots.ts           SEO dinámico (incluye notas publicadas)
  (public)/                       Route group del sitio público
    layout.tsx                    Header + Footer + WAFloat + Pixels + Analytics
    page.tsx                      Inicio
    quienes-somos/page.tsx
    servicios/page.tsx
    asociaciones-civiles-fundaciones/page.tsx
    recursos/page.tsx
    recursos/[slug]/page.tsx      Detalle de nota (JSON-LD Article)
    contacto/page.tsx             (JSON-LD LocalBusiness)
    politicas-de-privacidad/page.tsx (placeholder, noindex)
  admin/
    admin.css                     Estilos del panel (independientes del público)
    actions.ts                    logoutAction (server action)
    login/page.tsx                Login (client, useActionState)
    login/actions.ts              loginAction (server action)
    (panel)/                      Route group protegido (con sidebar)
      layout.tsx                  Guard getSession() + AdminSidebar
      page.tsx                    Dashboard
      contenidos/page.tsx         [placeholder → Etapa 5]
      configuracion/page.tsx      [placeholder → Etapa 3]
      medicion/page.tsx           [placeholder → Etapa 4]
      recursos/page.tsx           [placeholder → Etapa 6]
  api/
    contact/route.ts              POST formulario (valida+honeypot; email en Etapa 7)
components/
  Header.tsx (client), Footer.tsx, WhatsAppFloat.tsx, SiteAnalytics.tsx (client),
  Pixels.tsx, Faq.tsx (client), CtaBand.tsx, ContactForm.tsx (client),
  ResourcesGrid.tsx (client), Icons.tsx, ServiceIcon.tsx
  admin/AdminSidebar.tsx (client)
lib/
  prisma.ts        Singleton PrismaClient
  settings.ts      getSettings() (upsert singleton) + DEFAULT_SETTINGS
  content.ts       getPageContent(slug): merge DB sobre defaults; helper c(key)
  content-defaults.ts  Copy por defecto de las 6 páginas (PAGE_DEFAULTS)
  services.ts      Los 8 servicios (SERVICES) + tipos de icono
  whatsapp.ts      normalizeWhatsappNumber, buildWhatsappUrl
  auth.ts          signSession/verifySession/getSession/set+clearSessionCookie
middleware.ts      Protege /admin y /api/admin (verifica JWT en edge)
prisma/
  schema.prisma    Models: User, SiteSettings, PageContent, ResourcePost
  seed.ts          Admin + settings + páginas + 3 notas de ejemplo
legacy/            Sitio estático original (referencia, excluido del build)
docs/PLAN.md       Este documento
```

## 4. Modelos de datos (prisma/schema.prisma)

- **User**: id, email (unique), password (hash), name, timestamps.
- **SiteSettings** (id="singleton"): siteName, logoUrl; whatsapp{Enabled,Number,
  Message,ButtonText,Floating,CtaEnabled}; contactRecipientEmail; metaPixel{Enabled,Id};
  googleTagManager{Enabled,Id}; googleAnalytics{Enabled,Id}; googleAds{Enabled,
  ConversionId,ConversionLabel}; updatedAt.
- **PageContent**: id, slug (unique), name, seoTitle, seoDescription, ogTitle,
  ogDescription, ogImage, **sections (String JSON clave→texto)**, updatedAt.
- **ResourcePost**: id, title, slug (unique), excerpt, content (HTML), featuredImage,
  seoTitle, seoDescription, status("draft"|"published"), isFeatured, category,
  createdAt, updatedAt, publishedAt.

Slugs de páginas: `inicio`, `quienes-somos`, `servicios`,
`asociaciones-civiles-fundaciones`, `recursos`, `contacto`.

## 5. Variables de entorno (.env)

```
DATABASE_URL          dev: file:./dev.db | prod: postgresql://... (Neon)
AUTH_SECRET           secreto largo aleatorio (firma JWT)
ADMIN_EMAIL           admin@villarroelyasoc.com.ar
ADMIN_PASSWORD        villarroel2024 (DEV; se hashea en el seed)
RESEND_API_KEY        (Etapa 7)
EMAIL_FROM            remitente verificado en Resend
BLOB_READ_WRITE_TOKEN (Etapa 3/prod; vacío en dev usa /public/uploads)
NEXT_PUBLIC_SITE_URL  http://localhost:3000 (dev) / dominio real (prod)
```
Plantilla completa en `.env.example`. El `.env` real está gitignored.

## 6. Comandos

```
npm install            instala (postinstall corre prisma generate)
npm run setup          prisma db push + seed (crea/llena la DB)
npm run dev            servidor de desarrollo (localhost:3000)
npm run build          prisma generate + next build
npm run db:studio      Prisma Studio (inspeccionar DB)
npm run db:seed        re-correr el seed (no pisa ediciones del cliente)
```
Nota Windows: si un `mv`/borrado falla por "permission denied", suele ser el dev
server con el archivo abierto → `taskkill //F //IM node.exe` y reintentar.

## 7. Credenciales de prueba

- Panel: `admin@villarroelyasoc.com.ar` / `villarroel2024` (definidas en `.env`).

## 8. Datos de marca (NAP)

- Dirección: Albuera 21, 1° Piso, Oficina A, San Martín, Mendoza, Argentina
- Email: info@villarroelyasoc.com.ar
- WhatsApp/Tel: +54 9 263 346-6645 · link base `https://wa.me/549263346645`
- Horario: lunes a viernes 9:00–16:00 · Presencial y virtual · Desde 2004
- Director: Dr. Juan Antonio Villarroel

## 9. Plan por etapas y estado

- [x] **Etapa 1 — Scaffold + público.** Next.js+Prisma, schema, seed, 6 páginas
      DB-driven reusando el diseño, SEO/JSON-LD/sitemap/robots, API contacto base.
- [x] **Etapa 2 — Auth + /admin.** login bcrypt+JWT, middleware, route groups,
      sidebar, Dashboard, placeholders de secciones.
- [x] **Etapa 3 — Configuración general.** `/admin/configuracion` con server action
      `updateSettings`: WhatsApp (número normalizado, mensaje, texto botón, 3 toggles),
      contactRecipientEmail validado, logo upload (preview + validación, `lib/upload.ts`
      dev→/public/uploads prod→Vercel Blob). `revalidatePath` refleja en público.
      Verificado: cambio en DB se refleja en home.
- [x] **Etapa 4 — Medición/Píxeles.** `/admin/medicion` (server action `updatePixels`
      con validación de formatos): Meta, GTM, GA4, Ads. Pixels.tsx inyecta por ID.
      Eventos: form_submit + fbq Lead + Ads conversion (ContactForm);
      click_whatsapp + fbq WhatsAppClick + Ads conversion (SiteAnalytics). Config de
      Ads expuesta al cliente vía window.__VA_ADS. Verificado inyección Meta/GA4/Ads.
- [x] **Etapa 5 — Contenidos por página.** `/admin/contenidos` (lista) +
      `/admin/contenidos/[slug]` (editor). SEO (title/desc/OG) + secciones agrupadas
      automáticamente por prefijo con labels legibles (lib/content-labels.ts:
      groupSections/fieldLabel/isMultiline). Server action `updatePageContent` guarda
      sections JSON + revalida la ruta pública. Verificado: editar H1 se refleja en home.
- [x] **Etapa 6 — Recursos CRUD.** `/admin/recursos` (lista) + `/nuevo` + `/[id]`
      (editar). Editor **Markdown** (textarea) → render con `marked` + **sanitize-html**
      (lib/markdown.ts) en el público. Imagen destacada (upload), slug auto+único
      (lib/slug.ts), estado draft/published, destacar, fecha, SEO. Eliminar con
      confirm. Actions: createPost/updatePost/deletePost + revalidate.
      Verificado: crear→listar→render MD (h2/strong)→borrar.
- [x] **Etapa 7 — Formulario + Resend.** `api/contact`: envía email a
      `contactRecipientEmail` con Resend (replyTo del visitante, HTML escapado),
      rate-limit 5/min por IP (lib/rate-limit.ts), honeypot, validación server.
      En dev sin RESEND_API_KEY → loguea y responde ok. Verificado: ok/honeypot/422/429.
- [x] **Etapa 8 — Cierre.** Repaso de seguridad (sanitización MD, validación server,
      secretos solo server, /admin protegido, rate-limit). Build final verde (21 rutas).
      Docs: `docs/GUIA-ADMIN.md` (uso del panel), `docs/DEPLOY.md` (Vercel+Neon+Resend+
      Blob + migración a Postgres), README actualizado al stack Next.js.
      **Pendiente real = deploy con cuentas del cliente** (no es código): ver DEPLOY.md.

## 10. Pendientes del cliente (para producción)

- Cuenta **Neon** → `DATABASE_URL` Postgres.
- Cuenta **Resend** → API key + verificar dominio (DNS SPF/DKIM).
- Cuenta **Vercel** → deploy + token de **Vercel Blob**.
- Confirmar número WhatsApp definitivo, URLs de redes sociales, fotos reales,
  texto legal de privacidad.

## 11. Convenciones / notas de implementación

- Server Components por defecto; `"use client"` solo donde hay interacción
  (Header, Faq, ContactForm, ResourcesGrid, AdminSidebar, login).
- Mutaciones del panel → **server actions** + `revalidatePath`. Validación SIEMPRE
  server-side; el cliente solo mejora UX.
- WhatsApp: usar `buildWhatsappUrl(settings, customMessage?)`. Nunca hardcodear nº.
- Contenido público: `getPageContent(slug)` + `c("clave")`. Nunca texto fijo que
  deba ser editable.
- Settings: `getSettings()` (cachea por request, upsert singleton).
- Eventos analytics: `trackEvent()` en components/SiteAnalytics.tsx
  (dataLayer + gtag) y `fbq` para Meta. Eventos: click_whatsapp, click_email,
  click_phone, form_submit (+ Lead/WhatsAppClick en Meta).
- El público nunca debe quedar en blanco: helpers tienen fallback a defaults si la
  DB falla.
```
