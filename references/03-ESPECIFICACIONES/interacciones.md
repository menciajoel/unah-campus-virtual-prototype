# Interacciones — prototipo local v1.4

## Navegación y datos

Inicio y Mis cursos abren vistas locales. Las tarjetas completas de Administración, Contabilidad I y Estadística Aplicada son enlaces a la clase inicial o última visitada de cada curso. Se utiliza un único catálogo y un único conjunto de componentes, sin páginas, CSS ni lógica particulares por asignatura.

Cada curso tiene cuatro unidades y dieciséis clases demostrativas. Progreso de muestra: Administración 65%, Contabilidad I 42%, Estadística Aplicada 78%. Los estados completado, actual académico y pendiente pertenecen al fixture de cada curso. Cambiar la selección no registra finalización ni altera porcentajes. Anterior/siguiente recorren solo las clases del curso seleccionado, cruzan unidades y respetan los extremos inactivos. El hash admite atrás/adelante y acceso directo. La clase inicial de Administración continúa siendo Organización, Unidad 2, Clase 3, y sus enlaces anteriores siguen siendo válidos.

Al cambiar de asignatura se actualizan imagen, nombre, progreso, unidades, clase, recursos, actividad, fecha, título del documento y anuncios accesibles. Se cierran y limpian diálogos y recursos anteriores. La última clase y expansión de unidades se conservan por asignatura durante la sesión; recargar reinicia ese estado de muestra.

## Menú hamburguesa

En la vista académica el curso actual aparece primero, con foto, nombre, progreso y desplegable. Los otros dos mantienen sus dimensiones de foto y nombre, muestran «Ir al curso» y son enlaces sin progreso ni unidades. Seleccionar uno cierra el menú y abre ese curso; al reabrirlo el contexto ya es el nuevo. En Inicio/Mis cursos no hay curso académico actual: se muestran los tres accesos sin progresos ni desplegables.

La navegación de unidades y clases móvil existe exclusivamente en este menú; el resumen de la pantalla principal es informativo. El menú tiene scroll interno, fondo bloqueado y cierre por botón, Escape y backdrop. Cerrar sin navegar conserva la posición del main. Su cabecera permanece visible. Al pasar al breakpoint desktop se cierra el menú.

## Acordeones

Recursos, unidades y curso actual del menú usan un controlador compartido. Chevron cerrado hacia la derecha, abierto hacia abajo, con rotación suave del mismo icono. Transición de altura numérica y opacidad en CSS durante 260ms, curva cubic-bezier(0.4,0,0.2,1). El estado en reposo abierto usa altura auto; no se anima hacia auto. Las pulsaciones rápidas invierten desde la altura visible. El fin se resuelve con transitionend, sin setTimeout. Un ResizeObserver ajusta el destino si cambia el contenido o la orientación durante la transición.

Presentación, Lectura y Video son mutuamente exclusivos. Abrir otro cierra el anterior de forma simultánea y suave. Las unidades conservan expansión independiente y la selección de clase es distinta de la expansión. Enter/Espacio activan el summary nativo. aria-expanded y aria-controls están sincronizados; el panel cerrado se vuelve inert y aria-hidden al comenzar el cierre. Si contenía el foco, este vuelve al encabezado. prefers-reduced-motion elimina la transición, también si cambia durante una animación.

## Recursos y actividad

Presentación: tres diapositivas locales con anterior/siguiente y extremos inactivos. Lectura: vista local identificada como demostrativa. Video: portada por curso, play HTML centrado y duración real de muestra 0:12. Reproducción solo tras acción del usuario, controles nativos, poster y subtítulos. Contraerlo, abrir otro recurso, abrir menú/actividad o navegar lo pausa. Al finalizar reaparece la portada y permite reproducir otra vez. Si falla la carga se ofrece mensaje y enlace al archivo.

Actividad: diálogo local con título de la clase elegida, sin respuestas, entregas, notas ni comunicaciones. Las fechas son muestras por unidad. El día de semana se calcula desde la fecha; 7 de noviembre de 2026 es sábado.

Calendario, Mensajes, Notificaciones y perfil permanecen deshabilitados. El selector cuadrícula/lista modifica una sola colección, sin duplicar cursos. No hay integración con Moodle ni publicación.

## Descarga de handoff

Enlace nativo download, accesible por teclado, disponible en Inicio, Mis cursos y clases. Inicia descarga directa del ZIP vigente desde el mismo sitio; no abre páginas, solicita datos ni cambia la ruta. Componente montado una sola vez. Se oculta durante los modales; el main conserva su espacio y scroll.
