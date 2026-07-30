// Contenido por defecto de cada página pública.
// El seed lo carga en la DB (PageContent). El panel /admin edita estos valores.
// `sections` es un diccionario clave -> texto. Las páginas leen por clave con
// fallback a estos defaults, así nunca quedan vacías.

export type PageDefault = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  sections: Record<string, string>;
};

export const PAGE_DEFAULTS: PageDefault[] = [
  {
    slug: "inicio",
    name: "Inicio",
    seoTitle:
      "Estudio contable y consultora para PyMEs en Mendoza | Villarroel & Asociados",
    seoDescription:
      "Asesoramiento contable, impositivo y organizacional para empresas, PyMEs, asociaciones civiles y fundaciones en Mendoza.",
    sections: {
      "hero.kicker": "Estudio contable y consultora integral · San Martín, Mendoza",
      "hero.title":
        "Consultoría contable, impositiva y organizacional para tomar mejores decisiones.",
      "hero.text":
        "Acompañamos a empresas, PyMEs, emprendedores, asociaciones civiles y fundaciones a ordenar su gestión, cumplir con seguridad y transformar información técnica en herramientas concretas para crecer con previsibilidad.",
      "hero.ctaPrimary": "Solicitar consulta por WhatsApp",
      "hero.ctaSecondary": "Conocer servicios",
      "hero.micro": "Atención presencial y virtual · Lunes a viernes de 9:00 a 16:00",
      "metrics.1.num": "+22 años",
      "metrics.1.label": "de trayectoria profesional",
      "metrics.2.num": "2004",
      "metrics.2.label": "acompañando organizaciones",
      "metrics.3.num": "Mixta",
      "metrics.3.label": "atención presencial y virtual",
      "metrics.4.num": "8",
      "metrics.4.label": "áreas de práctica profesional",
      "challenge.eyebrow": "El desafío de gestionar una organización",
      "challenge.title":
        "Cumplir es importante. Gestionar con información confiable es decisivo.",
      "challenge.text":
        "Las organizaciones crecen cuando pueden anticiparse, ordenar sus procesos y tomar decisiones con datos claros. Nuestro trabajo integra cumplimiento contable e impositivo, planificación, control y acompañamiento profesional para que cada decisión se apoye en información confiable.",
      "challenge.item1": "Reducir riesgos fiscales y administrativos.",
      "challenge.item2": "Mejorar controles internos y trazabilidad.",
      "challenge.item3": "Optimizar recursos y costos de gestión.",
      "challenge.item4": "Formalizar proyectos, sociedades e instituciones.",
      "challenge.item5": "Modernizar procesos con herramientas tecnológicas.",
      "values.eyebrow": "Ejes de valor",
      "values.title": "Cinco focos para fortalecer tu organización",
      "values.capacidad":
        "Fortalecemos la capacidad de gestión mediante procesos más eficientes y mejor información para decidir.",
      "values.costos":
        "Ayudamos a identificar oportunidades de mejora y optimizar recursos dentro del marco legal vigente.",
      "values.control":
        "Implementamos mecanismos de seguimiento, trazabilidad y control para reducir riesgos y mejorar la calidad de la gestión.",
      "values.comunicacion":
        "Ordenamos información y procesos para mejorar la coordinación interna, la transparencia y las relaciones institucionales.",
      "values.competitividad":
        "Impulsamos organizaciones más eficientes, adaptables y preparadas para vincularse mejor con clientes, proveedores y aliados.",
      "services.eyebrow": "Servicios destacados",
      "services.title": "Soluciones integrales para cada etapa de tu organización",
      "method.eyebrow": "Nuestra forma de trabajo",
      "method.title": "Un método claro en cuatro pasos",
      "method.1.title": "Diagnóstico",
      "method.1.text":
        "Escuchamos la situación actual, necesidades y prioridades de la organización.",
      "method.2.title": "Plan de acción",
      "method.2.text": "Definimos objetivos, documentación, procesos y responsabilidades.",
      "method.3.title": "Implementación",
      "method.3.text":
        "Acompañamos la ejecución con criterios técnicos, herramientas y seguimiento.",
      "method.4.title": "Control y mejora",
      "method.4.text":
        "Revisamos resultados, ajustamos procesos y generamos información para decidir.",
      "about.eyebrow": "Quiénes somos",
      "about.title": "De estudio contable tradicional a consultora integral",
      "about.text":
        "Desde 2004, Villarroel & Asociados Consultora acompaña a organizaciones de distintos sectores en su gestión contable, fiscal, institucional y organizacional. Integramos la experiencia de más de dos décadas con actualización permanente, tecnología y una atención cercana orientada a soluciones.",
      "about.cta": "Conocer nuestra historia",
      "faq.eyebrow": "Preguntas frecuentes",
      "faq.title": "Resolvemos tus dudas antes de empezar",
      "faq.1.q": "¿Trabajan con clientes fuera de San Martín o Mendoza?",
      "faq.1.a":
        "Sí. El estudio trabaja de manera mixta, combinando atención presencial y virtual según las necesidades de cada organización.",
      "faq.2.q": "¿Puedo consultar aunque todavía no tenga mi empresa constituida?",
      "faq.2.a":
        "Sí. Acompañamos a emprendedores y organizaciones desde la etapa de formalización, ayudando a elegir estructuras adecuadas y ordenar los primeros pasos.",
      "faq.3.q": "¿Atienden asociaciones civiles y fundaciones?",
      "faq.3.a":
        "Sí. Contamos con asesoramiento específico para entidades sin fines de lucro, con foco en regularización, cumplimiento normativo, transparencia y gestión institucional.",
      "faq.4.q": "¿La primera consulta puede ser por WhatsApp?",
      "faq.4.a":
        "Sí. Podés escribirnos por WhatsApp para contarnos tu situación y coordinar el mejor modo de avanzar.",
      "ctaFinal.title": "Conversemos sobre las necesidades de tu organización",
      "ctaFinal.text":
        "Contanos en qué etapa se encuentra tu empresa, proyecto o institución. Te orientamos para ordenar la gestión, cumplir con seguridad y avanzar con información confiable.",
      "ctaFinal.ctaPrimary": "Hablar por WhatsApp",
      "ctaFinal.ctaSecondary": "Enviar consulta",
    },
  },
  {
    slug: "quienes-somos",
    name: "Quiénes somos",
    seoTitle: "Quiénes somos | Villarroel & Asociados Consultora",
    seoDescription:
      "Más de 22 años acompañando a empresas, PyMEs, asociaciones civiles y fundaciones con asesoramiento profesional, cercano y moderno.",
    sections: {
      "hero.eyebrow": "Quiénes somos",
      "hero.title":
        "Más de 22 años acompañando organizaciones con profesionalismo, cercanía e innovación.",
      "hero.text":
        "De estudio contable tradicional a consultora integral para organizaciones. Villarroel & Asociados Consultora nació con una visión clara: convertir el asesoramiento profesional en una herramienta estratégica para el desarrollo de empresas, PyMEs, emprendedores, asociaciones civiles y fundaciones.",
      "history.eyebrow": "Historia institucional",
      "history.title": "Una trayectoria construida desde 2004",
      "history.p1":
        "Villarroel & Asociados Consultora fue fundada en 2004 por el Dr. Juan Antonio Villarroel, Director General de la firma, con el propósito de poner al alcance de empresas y organizaciones modernas la experiencia de profesionales asociados y aliados estratégicos.",
      "history.p2":
        "Desde entonces, la consultora acompaña procesos de gestión, formalización, cumplimiento, control y crecimiento, integrando trayectoria profesional, actualización técnica, innovación y tecnología. Esta combinación permite ofrecer soluciones flexibles, integrales y adaptadas a contextos económicos, regulatorios y organizacionales cada vez más dinámicos.",
      "history.p3":
        "Hoy, más de 22 años después, seguimos evolucionando junto a nuestros clientes, convencidos de que el crecimiento sostenible se construye con conocimiento, procesos claros y relaciones de confianza de largo plazo.",
      "values.eyebrow": "Nuestros valores",
      "values.title": "Lo que guía nuestra forma de trabajar",
      "values.1.title": "Profesionalismo",
      "values.1.text":
        "Compromiso con la excelencia técnica, la actualización permanente y la calidad profesional.",
      "values.2.title": "Experiencia",
      "values.2.text":
        "Más de dos décadas acompañando a empresas y organizaciones de distintos sectores.",
      "values.3.title": "Cercanía",
      "values.3.text":
        "Atención personalizada y relaciones construidas sobre la confianza y el acompañamiento continuo.",
      "values.4.title": "Modernidad",
      "values.4.text":
        "Incorporación de herramientas tecnológicas, metodologías de gestión y procesos innovadores.",
      "vision.eyebrow": "Nuestra mirada",
      "vision.title": "El asesoramiento moderno trasciende el cumplimiento formal",
      "vision.text":
        "Entendemos que una consultora contable y organizacional debe aportar información, reducir riesgos, fortalecer la toma de decisiones y contribuir al crecimiento sostenible de sus clientes.",
      "director.eyebrow": "Dirección",
      "director.name": "Dr. Juan Antonio Villarroel",
      "director.role": "Director General",
      "director.text":
        "Profesional a cargo de la dirección de Villarroel & Asociados Consultora. Desde 2004 impulsa una visión de asesoramiento integral orientada a la gestión, el cumplimiento, la innovación y el desarrollo sostenible de organizaciones.",
      "soledad.eyebrow": "Equipo profesional",
      "soledad.name": "Cra. María Soledad Villarroel",
      "soledad.role": "Contadora Pública",
      "soledad.text":
        "Contadora pública integrante del equipo profesional de Villarroel & Asociados Consultora. Acompaña a empresas, PyMEs, emprendedores y entidades en la gestión contable e impositiva, con una atención cercana, rigurosa y orientada a soluciones concretas para cada organización.",
      "ctaFinal.title":
        "¿Buscás un acompañamiento profesional para ordenar y fortalecer tu organización?",
      "ctaFinal.text":
        "Contanos tu situación y te orientamos sobre los próximos pasos, sin compromiso.",
      "ctaFinal.ctaPrimary": "Escribinos por WhatsApp",
      "ctaFinal.ctaSecondary": "Enviar consulta",
    },
  },
  {
    slug: "servicios",
    name: "Servicios",
    seoTitle:
      "Servicios contables, impositivos y de consultoría | Villarroel & Asociados",
    seoDescription:
      "Soluciones integrales en asesoramiento contable, gestión impositiva, auditoría, sociedades, ONG, consultoría y transformación digital.",
    sections: {
      "hero.eyebrow": "Servicios",
      "hero.title": "Servicios profesionales para fortalecer la gestión de tu organización.",
      "hero.text":
        "Acompañamos a empresas, PyMEs, comercios, emprendedores, asociaciones civiles y fundaciones con servicios integrales que combinan cumplimiento normativo, información confiable, planificación, control y mejora de procesos. Buscamos que cada servicio aporte valor concreto a la gestión: más claridad, menor riesgo, mejores controles y mayor capacidad para decidir.",
      "hero.cta": "Solicitar consulta por WhatsApp",
      "ctaFinal.title": "¿No estás seguro de qué servicio necesitás?",
      "ctaFinal.text":
        "Contanos tu situación y te orientamos sobre el mejor camino para tu empresa, proyecto o institución.",
      "ctaFinal.ctaPrimary": "Hablar por WhatsApp",
      "ctaFinal.ctaSecondary": "Enviar consulta",
    },
  },
  {
    slug: "asociaciones-civiles-fundaciones",
    name: "Asociaciones y Fundaciones",
    seoTitle: "Asesoramiento para asociaciones civiles y fundaciones en Mendoza",
    seoDescription:
      "Regularización, estados contables, cumplimiento normativo y gestión institucional para asociaciones civiles y fundaciones.",
    sections: {
      "hero.eyebrow": "Asociaciones civiles · Fundaciones · Entidades comunitarias",
      "hero.title":
        "Asesoramiento contable e institucional para asociaciones civiles y fundaciones.",
      "hero.text":
        "Regularizá, ordená y fortalecé la gestión de tu entidad. Acompañamos a asociaciones civiles, fundaciones y entidades comunitarias en su constitución, regularización, cumplimiento contable, presentación de estados y fortalecimiento institucional.",
      "hero.cta": "Consultar por mi entidad",
      "problems.eyebrow": "Problemas frecuentes",
      "problems.title": "Situaciones que muchas entidades necesitan resolver",
      "problems.1": "Documentación institucional desactualizada.",
      "problems.2": "Dudas sobre libros, balances, autoridades y presentaciones.",
      "problems.3": "Necesidad de regularizar la entidad ante organismos de control.",
      "problems.4": "Falta de información clara para socios, comisiones directivas o donantes.",
      "problems.5": "Procesos administrativos poco ordenados o dependientes de pocas personas.",
      "problems.6": "Dificultad para sostener la transparencia y el cumplimiento en el tiempo.",
      "help.eyebrow": "Cómo podemos acompañar",
      "help.title": "Un acompañamiento integral para tu entidad",
      "help.1.title": "Constitución y formalización",
      "help.1.text": "Acompañamiento en los primeros pasos institucionales.",
      "help.2.title": "Regularización",
      "help.2.text": "Revisión de situación documental, contable e institucional.",
      "help.3.title": "Estados contables",
      "help.3.text": "Preparación y seguimiento de información económica confiable.",
      "help.4.title": "Cumplimiento normativo",
      "help.4.text": "Orden de obligaciones y presentaciones necesarias.",
      "help.5.title": "Gestión y procesos",
      "help.5.text": "Mejora de circuitos administrativos y comunicación interna.",
      "benefits.eyebrow": "Beneficios",
      "benefits.title": "Más confianza, transparencia y continuidad institucional",
      "benefits.lead":
        "Una entidad ordenada genera confianza en socios, donantes y organismos, y puede enfocarse en cumplir su misión.",
      "benefits.1": "Regularización institucional y al día con las obligaciones.",
      "benefits.2": "Transparencia ante socios, donantes y organismos de control.",
      "benefits.3": "Estados contables confiables y presentaciones ordenadas.",
      "benefits.4": "Procesos menos dependientes de personas puntuales.",
      "benefits.5": "Mayor previsibilidad para la comisión directiva.",
      "faq.eyebrow": "Preguntas frecuentes",
      "faq.title": "Dudas habituales de asociaciones y fundaciones",
      "faq.1.q":
        "Nuestra entidad está atrasada con balances y presentaciones, ¿pueden ayudarnos?",
      "faq.1.a":
        "Sí. Acompañamos procesos de regularización revisando la situación documental, contable e institucional para ordenar lo pendiente y avanzar con un plan claro.",
      "faq.2.q": "Estamos creando una asociación o fundación desde cero, ¿nos asesoran?",
      "faq.2.a":
        "Sí. Te acompañamos en la constitución y formalización, ordenando los primeros pasos institucionales y la documentación necesaria.",
      "faq.3.q": "¿Trabajan con entidades fuera de San Martín?",
      "faq.3.a":
        "Sí. Trabajamos de manera mixta, combinando atención presencial y virtual según las necesidades de cada entidad.",
      "faq.4.q": "¿Pueden ayudarnos a ordenar la gestión administrativa interna?",
      "faq.4.a":
        "Sí. Además del cumplimiento contable, trabajamos en la mejora de circuitos administrativos y comunicación interna para fortalecer la gestión institucional.",
      "ctaFinal.title": "Contanos la situación de tu asociación o fundación",
      "ctaFinal.text":
        "Te ayudamos a identificar el estado actual, ordenar prioridades y avanzar con un plan de trabajo claro.",
      "ctaFinal.ctaPrimary": "Escribir por WhatsApp",
      "ctaFinal.ctaSecondary": "Enviar consulta",
    },
  },
  {
    slug: "recursos",
    name: "Recursos",
    seoTitle:
      "Recursos para empresas, PyMEs y organizaciones | Villarroel & Asociados",
    seoDescription:
      "Artículos sobre gestión empresarial, planificación, control, cambios normativos, asociaciones civiles y transformación digital.",
    sections: {
      "hero.eyebrow": "Recursos / Artículos",
      "hero.title": "Información útil para gestionar mejor tu organización.",
      "hero.text":
        "Compartimos contenidos prácticos sobre gestión, cumplimiento, asociaciones civiles y transformación digital para que empresas, PyMEs y entidades tomen mejores decisiones.",
      "empty.title": "Pronto publicaremos nuevos artículos",
      "empty.text":
        "Estamos preparando contenidos útiles para empresas, PyMEs y organizaciones. Mientras tanto, podés escribirnos tu consulta.",
      "ctaFinal.title": "¿Tenés una consulta concreta sobre tu organización?",
      "ctaFinal.text":
        "Más allá de los recursos, podemos analizar tu caso puntual y orientarte sobre los próximos pasos.",
      "ctaFinal.ctaPrimary": "Hablar por WhatsApp",
      "ctaFinal.ctaSecondary": "Enviar consulta",
    },
  },
  {
    slug: "contacto",
    name: "Contacto",
    seoTitle:
      "Contacto | Villarroel & Asociados Consultora en San Martín, Mendoza",
    seoDescription:
      "Contactá a Villarroel & Asociados Consultora por WhatsApp, formulario, email o en nuestra oficina de San Martín, Mendoza.",
    sections: {
      "hero.eyebrow": "Contacto",
      "hero.title": "Conversemos sobre tu organización.",
      "hero.text":
        "Contanos qué necesitás y te orientamos sobre los próximos pasos. Podés escribirnos por WhatsApp o completar el formulario. Revisaremos tu consulta y te responderemos dentro del horario de atención.",
      "data.title": "Datos de contacto",
      "data.address": "Albuera 21, 1° Piso, Oficina A, San Martín, Mendoza, Argentina",
      "data.phone": "+54 9 2634 34-6645",
      "data.email": "info@villarroelyasociados.com.ar",
      "data.hours": "Lunes a viernes de 9:00 a 16:00",
      "data.modality": "Atención presencial y virtual",
      "form.title": "Enviá tu consulta",
      "form.text": "Completá el formulario y te respondemos a la brevedad.",
      "form.success":
        "¡Gracias por tu consulta! Recibimos tu mensaje y te responderemos a la brevedad dentro de nuestro horario de atención.",
      "form.submit": "Enviar consulta",
    },
  },
];
