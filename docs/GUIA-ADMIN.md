# Guía del panel de administración

Guía rápida para administrar el sitio de **Villarroel & Asociados Consultora** sin
tocar código. Todo se gestiona desde el panel privado.

## Ingresar al panel

1. Entrá a **tudominio.com/admin**
2. Iniciá sesión con tu email y contraseña de administrador.
3. Si olvidás la contraseña, contactá a quien administra el servidor (se regenera).

> Por seguridad, cerrá sesión cuando uses una computadora compartida (botón
> **Cerrar sesión**, abajo a la izquierda).

## Secciones del panel

### 🏠 Dashboard
Pantalla de resumen: estado del formulario, WhatsApp, píxeles y cantidad de notas.
No se edita nada acá; sirve para ver de un vistazo cómo está configurado el sitio.

### 📄 Contenidos
Editás los textos de cada página (Inicio, Servicios, Quiénes somos, etc.).
1. Elegí la página → **Editar**.
2. Cada bloque (Hero, Servicios, Preguntas frecuentes, etc.) tiene sus campos.
3. Arriba de todo podés editar el **SEO** (título y descripción para Google).
4. **Guardar cambios**. Se reflejan en el sitio al instante.

> Consejo: cambiá un texto por vez y verificá en el sitio (link «Ver página pública»).

### ⚙️ Configuración general
- **Logo**: subí un PNG, JPG o WebP (máx. 3 MB). Se ve la vista previa antes de guardar.
- **WhatsApp**: número (solo dígitos, ej. `5492633466645`), mensaje prearmado,
  texto del botón, y switches para mostrar/ocultar el botón flotante y los CTA.
- **Email del formulario**: la casilla que recibe las consultas del sitio.

### 📊 Medición / Píxeles
Activá y pegá los IDs (no hace falta pegar código):
- **Meta Pixel**: ID numérico.
- **Google Tag Manager**: `GTM-XXXXXXX`
- **Google Analytics 4**: `G-XXXXXXXXXX`
- **Google Ads**: ID de conversión `AW-...` y etiqueta.

Solo se cargan en el sitio los que estén **activados**. Se miden automáticamente las
conversiones de **formulario** y **clic en WhatsApp**.

### 📰 Recursos
Gestionás las notas/artículos del blog:
1. **+ Nueva nota**.
2. Completá **título**, **extracto** (resumen corto) y **contenido**.
   - El contenido usa **Markdown**: `## Subtítulo`, `**negrita**`, `- listas`,
     `[texto](https://enlace)`.
3. Subí una **imagen destacada** (opcional).
4. Elegí **Estado**: *Borrador* (no se ve) o *Publicada* (visible en /recursos).
5. Opcional: categoría, fecha y «destacar».
6. **Crear nota**.

Para editar o eliminar: entrá a la nota desde la lista. Eliminar pide confirmación.

> Solo las notas **Publicadas** aparecen en el sitio. Las de borrador quedan
> guardadas pero ocultas.

## Preguntas frecuentes

**¿Los cambios se ven enseguida?** Sí, al guardar se actualizan en el sitio.

**¿Puedo dejar un texto vacío?** Mejor no en títulos importantes; si un campo de
contenido queda vacío, el sitio usa el texto por defecto original.

**¿Qué tamaño de imagen conviene?** Para el logo, PNG con fondo transparente.
Para notas, imágenes horizontales (16:9) livianas (menos de 1 MB idealmente).

**¿Cómo cambio el número de WhatsApp en todo el sitio?** En *Configuración general*
→ WhatsApp. Se actualiza en el botón del menú, el flotante y todos los CTA.
