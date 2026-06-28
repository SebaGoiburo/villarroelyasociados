// Convierte las claves técnicas de `sections` en etiquetas legibles y las agrupa
// por bloque, para el editor de contenidos del panel.

const GROUP_LABELS: Record<string, string> = {
  hero: "Hero (encabezado)",
  metrics: "Métricas / Bloque de autoridad",
  challenge: "Desafío de gestión",
  values: "Valores / Ejes de valor",
  services: "Servicios (encabezado)",
  method: "Metodología (pasos)",
  about: "Quiénes somos (resumen)",
  history: "Historia institucional",
  vision: "Nuestra mirada",
  director: "Director",
  problems: "Problemas frecuentes",
  help: "Cómo podemos acompañar",
  benefits: "Beneficios",
  faq: "Preguntas frecuentes",
  data: "Datos de contacto",
  form: "Formulario",
  empty: "Estado sin notas",
  ctaFinal: "Llamado a la acción final",
};

const TOKEN_LABELS: Record<string, string> = {
  title: "Título",
  text: "Texto",
  kicker: "Bajada superior",
  eyebrow: "Etiqueta",
  micro: "Microcopy",
  lead: "Bajada",
  cta: "Botón",
  ctaPrimary: "Botón principal",
  ctaSecondary: "Botón secundario",
  num: "Número",
  label: "Etiqueta",
  q: "Pregunta",
  a: "Respuesta",
  name: "Nombre",
  role: "Cargo",
  submit: "Botón enviar",
  success: "Mensaje de éxito",
  phone: "Teléfono",
  email: "Email",
  address: "Dirección",
  hours: "Horario",
  modality: "Modalidad",
  p1: "Párrafo 1",
  p2: "Párrafo 2",
  p3: "Párrafo 3",
  capacidad: "Capacidad",
  costos: "Costos",
  control: "Control",
  comunicacion: "Comunicación",
  competitividad: "Competitividad",
};

export function groupLabel(group: string): string {
  return GROUP_LABELS[group] ?? group.charAt(0).toUpperCase() + group.slice(1);
}

/** Etiqueta para el campo a partir de la clave completa (ej. "method.1.title"). */
export function fieldLabel(key: string): string {
  const parts = key.split(".");
  parts.shift(); // quitar el grupo
  if (parts.length === 0) return "Texto";
  return parts
    .map((p) => TOKEN_LABELS[p] ?? (/^\d+$/.test(p) ? `#${p}` : p))
    .join(" · ");
}

/** ¿Conviene un textarea (multilínea) para esta clave/valor? */
export function isMultiline(key: string, value: string): boolean {
  const last = key.split(".").pop() || "";
  if (["text", "a", "lead", "message", "success", "p1", "p2", "p3", "address"].includes(last))
    return true;
  return value.length > 80;
}

export type ContentGroup = { group: string; label: string; fields: { key: string; label: string; value: string; multiline: boolean }[] };

/** Agrupa las secciones por prefijo, preservando el orden de las claves. */
export function groupSections(sections: Record<string, string>): ContentGroup[] {
  const groups: ContentGroup[] = [];
  const index = new Map<string, ContentGroup>();
  for (const [key, value] of Object.entries(sections)) {
    const group = key.split(".")[0];
    let g = index.get(group);
    if (!g) {
      g = { group, label: groupLabel(group), fields: [] };
      index.set(group, g);
      groups.push(g);
    }
    g.fields.push({ key, label: fieldLabel(key), value, multiline: isMultiline(key, value) });
  }
  return groups;
}
