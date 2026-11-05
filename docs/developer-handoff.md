# CSS de implementación — guía de referencia

Este directorio contiene un snapshot del CSS del prototipo aprobado, no una aplicación ejecutable. Leer antes el [Design System](../02-DESIGN-SYSTEM/design-system.md), los [tokens JSON](../02-DESIGN-SYSTEM/design-tokens.json) y la [guía de integración con Moodle](../03-ESPECIFICACIONES/integracion-moodle.md).

## Archivos y orden de referencia

| Archivo incluido | Responsabilidad |
|---|---|
| [CSS/tokens.css](CSS/tokens.css) | Variables CSS derivadas de los tokens JSON. |
| [CSS/base.css](CSS/base.css) | Tipografía base, foco visible, estilos generales y movimiento reducido del prototipo aislado. |
| [CSS/layout.css](CSS/layout.css) | Estructura de navbar, sidebar, main y catálogo. |
| [CSS/components.css](CSS/components.css) | Resumen de asignatura, unidades, clases, recursos, video, actividad, paginación y menú. |
| [CSS/responsive.css](CSS/responsive.css) | Variantes de la composición por espacio disponible. |
| [CSS/design-handoff.css](CSS/design-handoff.css) | Utilidad de descarga identificada como Prototipo UX/UI. |

El orden de la tabla corresponde al de la implementación de referencia. Dentro de Moodle debe adaptarse al pipeline del tema; no agregar resets ni reglas globales del prototipo sin aislarlas. En particular, las reglas de body, main, button, summary y los nombres genéricos de componentes pueden entrar en conflicto con el tema anfitrión.

## Componentes reutilizables

Las clases course-summary/course-progress representan nombre, imagen y avance de cualquier asignatura. unit-navigation/lesson-link representan unidades y clases. resource agrupa un acordeón de material. video-frame/video-metadata mantienen reproducción y descripción. activity y lesson-pagination presentan la actividad y la navegación. Estas familias se reutilizan con diferentes datos, no con estilos por asignatura.

Los estados están descritos en [componentes](../03-ESPECIFICACIONES/componentes.md) e [interacciones](../03-ESPECIFICACIONES/interacciones.md). El CSS no incluye ni sustituye los controladores JavaScript del prototipo o de Moodle.

## Límites del snapshot

Los CSS pueden hacer referencia a activos del prototipo funcional que no están incluidos como activos ejecutables en el ZIP. La implementación HTML/JavaScript, los activos de aplicación y las herramientas de generación pertenecen al repositorio GitHub. Este paquete sirve para interpretar, adaptar y validar el diseño, sin pasos de ejecución local.

El componente de descarga es una utilidad de presentación del prototipo; su inclusión en un tema productivo de Moodle requiere una decisión independiente. No es una actividad académica.
