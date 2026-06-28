// Datos de los 8 servicios. Se usan en Inicio (tarjetas) y Servicios (detalle).
// El copy de cada servicio puede migrarse a la DB en una etapa posterior;
// por ahora vive aquí como fuente única.

export type Service = {
  id: string; // ancla / slug
  title: string;
  shortTitle: string; // para tarjetas compactas
  tagline: string;
  includes: string[];
  benefits: string[];
  idealFor: string;
  ctaText: string;
  waMessage: string;
  accent: "blue" | "red" | "green" | "orange" | "teal";
  icon: ServiceIconKey;
};

export type ServiceIconKey =
  | "contable"
  | "impositiva"
  | "auditoria"
  | "societario"
  | "ong"
  | "consultoria"
  | "planeamiento"
  | "digital";

export const SERVICES: Service[] = [
  {
    id: "asesoramiento-contable",
    title: "Asesoramiento Contable Integral",
    shortTitle: "Asesoramiento Contable Integral",
    tagline:
      "Información contable clara para planificar, controlar y decidir.",
    includes: [
      "Registración y análisis de información",
      "Reportes de gestión",
      "Seguimiento de obligaciones",
      "Revisión de documentación",
      "Acompañamiento permanente",
    ],
    benefits: [
      "Mejor control financiero",
      "Información confiable",
      "Mayor capacidad de planificación",
      "Trazabilidad para decidir con datos",
    ],
    idealFor:
      "Empresas, PyMEs, comercios, emprendedores y organizaciones sin fines de lucro.",
    ctaText: "Consultar por asesoramiento contable",
    waMessage:
      "Hola Villarroel & Asociados, quiero consultar por asesoramiento contable. Mi nombre es [nombre] y represento a [organización].",
    accent: "blue",
    icon: "contable",
  },
  {
    id: "gestion-impositiva",
    title: "Gestión Impositiva y Fiscal",
    shortTitle: "Gestión Impositiva y Fiscal",
    tagline:
      "Planificación y cumplimiento para reducir riesgos y optimizar recursos.",
    includes: [
      "Liquidaciones y vencimientos",
      "Análisis de situación fiscal",
      "Planificación",
      "Controles preventivos",
      "Acompañamiento frente a requerimientos",
    ],
    benefits: [
      "Reducción de riesgos",
      "Seguridad jurídica",
      "Cumplimiento ordenado",
      "Optimización de recursos dentro del marco legal",
    ],
    idealFor:
      "Empresas, PyMEs, profesionales, comercios y organizaciones que requieren seguimiento fiscal permanente.",
    ctaText: "Consultar por gestión impositiva",
    waMessage:
      "Hola Villarroel & Asociados, quiero consultar por gestión impositiva. Mi nombre es [nombre] y represento a [organización].",
    accent: "red",
    icon: "impositiva",
  },
  {
    id: "auditoria",
    title: "Auditoría y Estados Contables",
    shortTitle: "Auditoría y Estados Contables",
    tagline: "Transparencia, confiabilidad y mejores controles para la gestión.",
    includes: [
      "Preparación y revisión de estados contables",
      "Análisis de estados contables",
      "Auditorías e informes",
      "Controles asociados a la calidad de la información",
    ],
    benefits: [
      "Mejores controles",
      "Información estratégica",
      "Mayor previsibilidad",
      "Transparencia ante organismos, socios y terceros",
    ],
    idealFor:
      "Empresas, cooperativas, asociaciones civiles, fundaciones y entidades que deben presentar información confiable.",
    ctaText: "Consultar por estados contables",
    waMessage:
      "Hola Villarroel & Asociados, quiero consultar por estados contables. Mi nombre es [nombre] y represento a [organización].",
    accent: "teal",
    icon: "auditoria",
  },
  {
    id: "societario",
    title: "Constitución y Asesoramiento Societario",
    shortTitle: "Constitución y Asesoramiento Societario",
    tagline:
      "Acompañamiento para crear, ordenar y fortalecer estructuras jurídicas.",
    includes: [
      "Constitución de sociedades",
      "Asesoramiento de estructura",
      "Modificaciones y trámites",
      "Seguimiento documental",
    ],
    benefits: [
      "Formalización",
      "Seguridad jurídica",
      "Fortalecimiento institucional",
      "Prevención de errores en etapas iniciales",
    ],
    idealFor:
      "Emprendedores, empresas, sociedades existentes y proyectos en proceso de formalización.",
    ctaText: "Consultar por constitución de sociedades",
    waMessage:
      "Hola Villarroel & Asociados, quiero consultar por constitución de sociedades. Mi nombre es [nombre] y represento a [organización].",
    accent: "orange",
    icon: "societario",
  },
  {
    id: "asociaciones",
    title: "Asociaciones Civiles y Fundaciones",
    shortTitle: "Asociaciones y Fundaciones",
    tagline:
      "Regularización, cumplimiento y transparencia para entidades sin fines de lucro.",
    includes: [
      "Constitución y regularización",
      "Estados contables",
      "Documentación institucional",
      "Obligaciones formales",
      "Acompañamiento a comisiones directivas",
    ],
    benefits: [
      "Regularización institucional",
      "Transparencia",
      "Cumplimiento normativo",
      "Mayor confianza para socios, donantes y organismos",
    ],
    idealFor:
      "Asociaciones civiles, fundaciones, entidades comunitarias y organizaciones sociales.",
    ctaText: "Consultar por mi asociación o fundación",
    waMessage:
      "Hola Villarroel & Asociados, quiero consultar por mi asociación o fundación. Mi nombre es [nombre] y represento a [organización].",
    accent: "green",
    icon: "ong",
  },
  {
    id: "consultoria",
    title: "Consultoría Organizacional y Gestión",
    shortTitle: "Consultoría Organizacional",
    tagline:
      "Mejora continua, procesos y coordinación para organizaciones más eficientes.",
    includes: [
      "Diagnóstico de procesos",
      "Revisión de circuitos administrativos",
      "Controles e indicadores",
      "Comunicación interna",
      "Herramientas de seguimiento",
    ],
    benefits: [
      "Mayor eficiencia",
      "Mejor coordinación",
      "Optimización de procesos",
      "Reducción de errores y duplicaciones",
    ],
    idealFor:
      "Empresas, PyMEs y organizaciones sociales que necesitan ordenar o escalar su gestión.",
    ctaText: "Solicitar diagnóstico de gestión",
    waMessage:
      "Hola Villarroel & Asociados, quiero solicitar un diagnóstico de gestión. Mi nombre es [nombre] y represento a [organización].",
    accent: "blue",
    icon: "consultoria",
  },
  {
    id: "planeamiento",
    title: "Planeamiento y Desarrollo Empresarial",
    shortTitle: "Planeamiento y Desarrollo",
    tagline:
      "Visión estratégica para consolidar proyectos y crecer con sustentabilidad.",
    includes: [
      "Planificación y análisis de recursos",
      "Proyecciones",
      "Evaluación de alternativas",
      "Organización de prioridades",
      "Seguimiento de objetivos",
    ],
    benefits: [
      "Visión estratégica",
      "Mejor utilización de recursos",
      "Desarrollo sostenible",
      "Mayor previsibilidad en decisiones de crecimiento",
    ],
    idealFor:
      "Empresas, PyMEs y emprendimientos en etapa de consolidación o expansión.",
    ctaText: "Consultar por planeamiento",
    waMessage:
      "Hola Villarroel & Asociados, quiero consultar por planeamiento. Mi nombre es [nombre] y represento a [organización].",
    accent: "orange",
    icon: "planeamiento",
  },
  {
    id: "transformacion-digital",
    title: "Transformación Digital y Optimización de Procesos",
    shortTitle: "Transformación Digital y Procesos",
    tagline:
      "Herramientas tecnológicas, automatización e IA aplicada a la gestión.",
    includes: [
      "Relevamiento de procesos",
      "Digitalización administrativa",
      "Automatización de tareas repetitivas",
      "Tableros y flujos de trabajo",
      "Incorporación responsable de IA",
    ],
    benefits: [
      "Digitalización y automatización",
      "Mayor eficiencia operativa",
      "Reducción de tareas manuales",
      "Mejor acceso a información",
    ],
    idealFor:
      "Organizaciones en proceso de modernización o con procesos administrativos poco integrados.",
    ctaText: "Consultar por transformación digital",
    waMessage:
      "Hola Villarroel & Asociados, quiero consultar por transformación digital. Mi nombre es [nombre] y represento a [organización].",
    accent: "teal",
    icon: "digital",
  },
];
