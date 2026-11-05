# Guía breve de integración con Moodle

Guía para el desarrollador que adapte este diseño a un tema de Moodle. No incluye una integración, plugin instalable ni instrucciones para modificar Moodle. Identificar primero la versión de Moodle, el tema base y la versión de Bootstrap que utiliza la instalación; no asumirlos a partir del prototipo.

## Tokens y componentes

Leer [design-tokens.json](../02-DESIGN-SYSTEM/design-tokens.json) y su correspondencia en [tokens.css](../04-IMPLEMENTACION/CSS/tokens.css). Los grupos color, typography, spacing, layout, component y motion expresan decisiones compartidas. Conservar sus valores y semántica; adaptar su ámbito a un contenedor del tema para evitar contaminar otras páginas.

Identificar las familias reutilizables en [componentes.md](componentes.md) y [components.css](../04-IMPLEMENTACION/CSS/components.css): resumen/progreso, unidades/clases, recurso, video, actividad y paginación. Instanciar esas familias con datos distintos; no crear componentes específicos por asignatura ni reconstruir una segunda escala visual.

## Adaptación al tema

Usar las plantillas y puntos de extensión del tema o tema hijo. La estructura del navbar, drawers y contenido debe coordinarse con el layout propio de Moodle, conservando su navegación, permisos y puntos de salida. El CSS/SCSS del tema es el lugar para adaptar los estilos: [documentación oficial de estilos de temas](https://moodledev.io/docs/5.1/apis/plugintypes/theme/styles).

El snapshot de [CSS de implementación](../04-IMPLEMENTACION/README.md) orienta la adaptación, pero no debe copiarse globalmente. El prototipo controla body/main y el viewport completo; esas reglas requieren adaptación al layout anfitrión.

## Bootstrap y estilos globales

No cargar una segunda copia de Bootstrap, resets globales, fuentes o iconos sobre los existentes. Reutilizar las utilidades compatibles del tema y aplicar personalizaciones del diseño en el tema; Moodle recomienda aprovechar sus clases existentes cuando sea posible: [archivos y estilos de plugins](https://moodledev.io/docs/5.0/apis/commonfiles).

Aislar los componentes bajo un contenedor propio, por ejemplo la clase unah-campus, y prefijar selectores genéricos como resource o activity. Limitar variables y overrides a su ámbito. Coordinar z-index, capas de diálogo, espaciados y breakpoints con el tema. Evitar guerras de especificidad e important como mecanismo habitual de integración.

## Accesibilidad e interacción

Conservar landmarks, nombres accesibles, títulos completos de clases truncadas, foco visible y áreas táctiles. Mantener estados seleccionado/completado/actual/pendiente distinguibles por forma además de color. Los acordeones deben conservar aria-expanded, aria-controls, contenido cerrado no enfocable, inversión de transición y prefers-reduced-motion. Los modales deben gestionar foco, cierre por teclado y scroll del fondo.

Usar el mecanismo JavaScript admitido por la versión de Moodle y un único controlador por interacción; no superponer el controlador del prototipo con Collapse/Modal de Bootstrap. Referencia: [JavaScript en Moodle](https://moodledev.io/docs/5.1/guides/javascript). Validar también con teclado y tecnologías de asistencia en el entorno real.

## Datos que deberán sustituirse

Asignaturas matriculadas, unidades/secciones, clases/actividades disponibles, estados de finalización, porcentajes de progreso, archivos y permisos, URLs de recursos y videos, fechas de entrega, perfil y navegación dependerán de datos y capacidades reales de Moodle. Obtenerlos mediante sus APIs y mecanismos de archivos/autorización de la versión instalada; no deducirlos de los fixtures ni exponer URLs privadas.

Abrir o reproducir un recurso no debe marcarlo completado sin las reglas reales de finalización. Entregas, notas, autenticación y sincronización no están implementadas en este handoff. Contrastar el resultado integrado con [interacciones](interacciones.md), [responsive](responsive.md) y [criterios de aceptación](criterios-aceptacion.md).
