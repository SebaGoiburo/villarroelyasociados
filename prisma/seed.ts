import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PAGE_DEFAULTS } from "../lib/content-defaults";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seed: iniciando...");

  // 1) Administrador único (desde variables de entorno)
  const adminEmail = process.env.ADMIN_EMAIL || "admin@villarroelyasociados.com.ar";
  const adminPassword = process.env.ADMIN_PASSWORD || "villarroel2024";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {}, // no pisar la contraseña si el usuario ya existe
    create: { email: adminEmail, password: passwordHash, name: "Administrador" },
  });
  console.log(`✅ Admin: ${adminEmail}`);

  // 2) Configuración global (singleton) — solo crea si no existe
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });
  console.log("✅ SiteSettings (singleton)");

  // 3) Contenido de páginas — crea si no existe (no pisa ediciones del cliente)
  for (const page of PAGE_DEFAULTS) {
    await prisma.pageContent.upsert({
      where: { slug: page.slug },
      update: {}, // preservar lo editado en el panel
      create: {
        slug: page.slug,
        name: page.name,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        ogTitle: page.ogTitle ?? "",
        ogDescription: page.ogDescription ?? "",
        sections: JSON.stringify(page.sections),
      },
    });
    console.log(`✅ Página: ${page.name}`);
  }

  // 4) Notas de ejemplo en Recursos (solo si la tabla está vacía)
  const count = await prisma.resourcePost.count();
  if (count === 0) {
    const now = new Date();
    const samples = [
      {
        title: "Cómo saber si mi PyME necesita mejorar sus controles administrativos",
        slug: "pyme-mejorar-controles-administrativos",
        category: "Herramientas para PyMEs",
        excerpt:
          "Señales de desorden, riesgos frecuentes y pasos iniciales para ordenar la gestión.",
      },
      {
        title: "Qué documentación debería tener ordenada una asociación civil",
        slug: "documentacion-asociacion-civil",
        category: "Asociaciones y fundaciones",
        excerpt:
          "Un checklist institucional para mantener tu entidad al día, sin entrar en asesoramiento legal específico.",
      },
      {
        title:
          "Diferencias entre cumplir obligaciones y gestionar con información contable",
        slug: "cumplir-vs-gestionar-informacion-contable",
        category: "Gestión y planificación",
        excerpt:
          "Por qué la información contable es mucho más que un requisito formal para tu organización.",
      },
    ];

    for (const s of samples) {
      await prisma.resourcePost.create({
        data: {
          ...s,
          content: `<p>${s.excerpt}</p><p>Contenido de ejemplo. El administrador puede editar esta nota completa desde el panel.</p>`,
          seoTitle: s.title,
          seoDescription: s.excerpt,
          status: "published",
          publishedAt: now,
        },
      });
      console.log(`✅ Nota de ejemplo: ${s.title}`);
    }
  } else {
    console.log(`ℹ️  Recursos: ya existen ${count} notas, no se agregan ejemplos.`);
  }

  console.log("🌱 Seed: completado.");
}

main()
  .catch((e) => {
    console.error("❌ Seed falló:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
