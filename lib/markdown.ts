import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

marked.setOptions({ breaks: true, gfm: true });

const SANITIZE_OPTS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h2", "h3", "h4", "p", "a", "ul", "ol", "li", "blockquote",
    "strong", "em", "b", "i", "u", "br", "hr", "img", "code", "pre",
    "div", "span", "table", "thead", "tbody", "tr", "th", "td",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    // Normalizar lo que produce el editor visual a etiquetas limpias.
    b: "strong",
    i: "em",
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
  },
};

/** Convierte Markdown a HTML seguro (sanitizado). Para render público. */
export function renderMarkdown(md: string): string {
  if (!md) return "";
  const raw = marked.parse(md, { async: false }) as string;
  return sanitizeHtml(raw, SANITIZE_OPTS);
}

/** Sanitiza HTML directamente (por si el contenido ya viene como HTML). */
export function sanitize(html: string): string {
  return sanitizeHtml(html || "", SANITIZE_OPTS);
}
