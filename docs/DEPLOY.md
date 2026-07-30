# Deploy a producción (Vercel + Neon + Resend)

Pasos para publicar el sitio. Requiere cuentas (gratuitas) en Neon, Resend y Vercel.

## 1. Base de datos — Neon (Postgres)

1. Crear un proyecto en https://neon.tech y copiar el **connection string**
   (`postgresql://...?sslmode=require`).
2. En `prisma/schema.prisma`, cambiar el provider:
   ```prisma
   datasource db {
     provider = "postgresql"   // antes: "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
3. Con el `DATABASE_URL` de Neon en el entorno, crear tablas y seed:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

## 2. Email — Resend

1. Crear cuenta en https://resend.com y generar una **API key**.
2. (Recomendado) Verificar el dominio `villarroelyasociados.com.ar` agregando los
   registros **SPF/DKIM** que indica Resend en el DNS. Sin esto, usar el remitente
   de prueba `onboarding@resend.dev`.
3. Definir `RESEND_API_KEY` y `EMAIL_FROM` (ej. `Villarroel & Asociados <info@villarroelyasociados.com.ar>`).

## 3. Imágenes — Vercel Blob

1. En el proyecto de Vercel: Storage → **Blob** → crear store.
2. Copiar el token y definir `BLOB_READ_WRITE_TOKEN`.
   (Si está vacío, en local las imágenes van a `/public/uploads`.)

## 4. Deploy — Vercel

1. Subir el repo a GitHub e importarlo en https://vercel.com.
2. Cargar las **Environment Variables** (Settings → Environment Variables):
   ```
   DATABASE_URL            (Neon)
   AUTH_SECRET             (string largo aleatorio; generar uno nuevo para prod)
   ADMIN_EMAIL             admin@villarroelyasociados.com.ar
   ADMIN_PASSWORD          (contraseña fuerte; solo se usa en el seed)
   RESEND_API_KEY          (Resend)
   EMAIL_FROM              Villarroel & Asociados <info@villarroelyasociados.com.ar>
   BLOB_READ_WRITE_TOKEN   (Vercel Blob)
   NEXT_PUBLIC_SITE_URL    https://www.villarroelyasociados.com.ar
   ```
3. Deploy. El `build` corre `prisma generate` automáticamente.
4. Una vez con la DB de Neon conectada, correr el seed una sola vez (localmente
   apuntando a Neon, o con un script de migración) para crear admin + contenidos.
5. Configurar el **dominio** en Vercel y apuntar el DNS.

## 5. Post-deploy (checklist)

- [ ] Entrar a `/admin`, iniciar sesión y **cambiar la contraseña** del admin.
- [ ] Configuración general: confirmar WhatsApp, email y subir el logo real.
- [ ] Medición: cargar los IDs reales de Meta/Google si corresponde.
- [ ] Cargar las URLs reales de redes sociales (hoy placeholders en Footer.tsx).
- [ ] Reemplazar fotos placeholder por imágenes reales.
- [ ] Probar el formulario (que llegue el email) y el botón de WhatsApp.
- [ ] Verificar `tudominio.com/sitemap.xml` y enviar a Google Search Console.
- [ ] Redactar el texto real de Políticas de privacidad.

## Notas

- **AUTH_SECRET**: usar un valor nuevo y secreto en producción (no el de dev).
- **Cambiar la contraseña del admin**: hoy se setea por seed. Para cambiarla,
  actualizar el hash en la DB (o agregar una pantalla de cambio de contraseña en
  una iteración futura).
- El sitio estático original quedó en `legacy/` (no se publica).
