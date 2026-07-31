"use client";

import { useEffect, useRef } from "react";

type Props = {
  name: string;
  initialHTML?: string;
};

/**
 * Editor visual sencillo (WYSIWYG) para que el cliente escriba las notas sin
 * conocer código ni Markdown. Sincroniza el HTML en un input oculto llamado
 * `name` para que viaje con el formulario. El HTML se sanitiza al mostrarlo.
 */
export default function RichTextEditor({ name, initialHTML = "" }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);

  // Cargar el contenido inicial una sola vez (sin que React controle el div).
  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = initialHTML;
    if (hiddenRef.current) hiddenRef.current.value = initialHTML;
  }, [initialHTML]);

  function sync() {
    if (editorRef.current && hiddenRef.current) {
      hiddenRef.current.value = editorRef.current.innerHTML;
    }
  }

  function exec(command: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    sync();
  }

  function addLink() {
    const url = window.prompt("Pegá el enlace (empezá con https://):", "https://");
    if (url && /^https?:\/\//i.test(url)) exec("createLink", url);
  }

  const Btn = ({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) => (
    <button
      type="button"
      className="rte__btn"
      title={title}
      onMouseDown={(e) => e.preventDefault()} // no perder la selección
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <div className="rte">
      <div className="rte__toolbar">
        <Btn title="Título de sección" onClick={() => exec("formatBlock", "H2")}><strong>Título</strong></Btn>
        <Btn title="Subtítulo" onClick={() => exec("formatBlock", "H3")}>Subtítulo</Btn>
        <Btn title="Texto normal" onClick={() => exec("formatBlock", "P")}>Texto</Btn>
        <span className="rte__sep" />
        <Btn title="Negrita" onClick={() => exec("bold")}><strong>N</strong></Btn>
        <Btn title="Cursiva" onClick={() => exec("italic")}><em>C</em></Btn>
        <span className="rte__sep" />
        <Btn title="Lista con viñetas" onClick={() => exec("insertUnorderedList")}>• Lista</Btn>
        <Btn title="Lista numerada" onClick={() => exec("insertOrderedList")}>1. Lista</Btn>
        <span className="rte__sep" />
        <Btn title="Insertar enlace" onClick={addLink}>🔗 Enlace</Btn>
        <Btn title="Quitar formato" onClick={() => exec("removeFormat")}>✕ Formato</Btn>
      </div>

      <div
        ref={editorRef}
        className="rte__editor"
        contentEditable
        suppressContentEditableWarning
        onInput={sync}
        onBlur={sync}
        data-placeholder="Escribí acá el contenido de la nota…"
      />

      <input type="hidden" name={name} ref={hiddenRef} />
    </div>
  );
}
