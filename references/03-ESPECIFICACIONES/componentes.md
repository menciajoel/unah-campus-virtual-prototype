# Componentes — contrato v1.4

Aplicar la escala y dimensiones de `02-DESIGN-SYSTEM/design-system.md` y su JSON. Esta versión incorpora las instrucciones posteriores de Joel y sustituye las dimensiones provisionales originales.

| Componente | Anatomía y estilo efectivo | Estados / comportamiento |
|---|---|---|
| Navbar | Logo oficial; producto 22px/500; enlaces 14px/500, iconos 18px; altura desktop 68px, tablet 64px, teléfono 64px más área segura | Permanente en todos los tamaños; Inicio y Mis cursos habilitados; Calendario, Mensajes, Notificaciones y perfil deshabilitados conservando aspecto |
| Resumen de asignatura | Foto 80px desktop, 66×54px teléfono, 48px drawer; nombre 20px/600 desktop y 18px/600 móvil; progreso 14px/400 con cifra 500; barra 8px, 6px drawer | 65%, 42% o 78% según asignatura; informativo en pantalla principal móvil; sin flecha ni botón |
| Unidades | Etiqueta 14px/600; fila 36px desktop, 44px móvil; padding exterior vertical de 4px | Details con transición compartida de 260ms; selección y expansión distintas; aria-expanded sincronizado |
| Clases | 13px/400, seleccionada 13px/600; fila 36px desktop y 44px móvil; indicador 18px desktop, 20px drawer teléfono; check 10/12px; línea 1.5px | Una línea con ellipsis; nombre íntegro en aria-label y title; completada, actual y pendiente por forma y color; línea continua |
| Banner | 150px desktop; fotografía con cover y anclaje izquierdo; teléfono variante 807×163 con proporción original | Texto fotográfico integrado legible; sin estiramientos; títulos de otras unidades demostrativos en HTML |
| Encabezado de clase | Auxiliar 13px/400; título 30px desktop, 25px móvil, peso 600; descripción 14px/400 | Texto variable; títulos principales ajustan línea |
| Recursos | Sin encabezado general ni icono de sección; títulos 14px/500, auxiliar 13px/400; iconos 20px; filas 48px mínimo | Presentación, Lectura y Video despliegan/contraen con exclusión mutua y transición de 260ms; misma composición con separadores en desktop y móvil |
| Video | Reproductor 16:9; máximo 493px desktop, 100% del ancho interior móvil; título de metadatos 18px/600 y datos 14/13px; alineación superior con el reproductor | Portada por asignatura y play HTML centrado (56px desktop / 44px teléfono), poster nativo y retorno a portada al terminar; reproducción local real solo tras acción del usuario; muestra de 12s sin audio y subtítulos; pausa al contraer o navegar; no cambia progreso |
| Actividad | Azul pálido existente; título 16px/600, auxiliar 13px/400, icono 24px; 72px mínimo desktop | CTA 14px/500, 36px desktop/44px móvil; abre diálogo local identificado como demostración; sin envío real |
| Anterior / siguiente | Auxiliar 13px/400; destino 14px/500; icono 18px | Orden global de clases; destinos largos truncados con nombre íntegro accesible; límites inactivos; reinicio del panel principal al navegar |
| Menú móvil | Panel 66vw, máximo 370px; 82vw por debajo de 360px; encabezado de cierre sticky | Modal accesible, Escape/cierre/fondo; scroll propio; background congelado sin offsets ni pérdida de posición |

Los nombres académicos de las cuatro unidades son fixtures verosímiles, no temario oficial. Unidad 1: Fundamentos de Administración. Unidad 2: Proceso Administrativo. Unidad 3: Control y Evaluación. Unidad 4: Gestión de las organizaciones. La clase inicial es Organización, Unidad 2, Clase 3.

## Catálogo y menú contextual

Una sola implementación para Administración (65%), Contabilidad I (42%) y Estadística Aplicada (78%). Cada curso tiene imagen propia, cuatro unidades, dieciséis clases, recursos y actividades con fechas de muestra. Los nombres y recursos son demostrativos; no constituyen contenido oficial de la UNAH.

El menú móvil muestra primero el curso actual: resumen de 48px de foto y nombre 18px/600, con progreso y desplegable animado. Los demás conservan esos tamaños y muestran «Ir al curso» (13px/400), sin progreso ni unidades. Toda la fila de acceso es un enlace. En la vista Mis cursos los tres son accesos sin desplegable. La pantalla principal académica móvil solo muestra el resumen informativo del curso seleccionado.

La referencia `clases.png` incorpora bienvenida HTML con fotografía auténtica, colección reutilizable de tres tarjetas y panel de próximas actividades. Dimensiones y tokens efectivos en el Design System v1.4; no crear una segunda hoja de estilos por asignatura.

Navbar móvil de 64px, logo de 48px en teléfono / 52px tablet y sin separador amarillo. Navbar desktop de 68px sin cambios. Los banners de demostración de teléfono crecen desde 74px mínimo para alojar nombres largos.

## Utilidad de handoff

Componente único compartido por todas las rutas: identificación Prototipo UX/UI y enlace nativo de descarga con icono18px, texto14px/500, control44px mínimo, radio10px, sombra sutil y estados hover/focus/active. Reserva inferior100px desktop/tablet y112px teléfono más safe-area; no cubre el viewport académico. Se oculta con diálogos abiertos. Dimensiones en los tokens vigentes.
