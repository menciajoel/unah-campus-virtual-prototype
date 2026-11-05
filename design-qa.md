# QA de entrega — Design Handoff v1.4 / r2

final result: passed

## Comparación visual

Fuentes: diseño del prototipo anterior a la utilidad de entrega, conservado en docs/qa/antes-handoff-desktop.jpg (1536×1024) y antes-handoff-movil.jpg (390×844). Implementación: references/01-REFERENCIAS/estado-actual/mis-cursos-desktop.jpg y clase-movil.jpg, en los mismos viewports y estados.

Comparaciones conjuntas: docs/qa/comparacion-handoff-desktop.png y comparacion-handoff-movil.png. Capturas1:1 de viewport, sin redimensionar contenido. La compresión JPEG del navegador puede suavizar texto frente a imágenes de origen; dimensiones y tipografía se verificaron también por estilos computados.

La modificación visual autorizada es la utilidad inferior de descarga. Se conserva el diseño académico, navbar, tipografía, paleta, portadas, navegación y estados. La reserva inferior reduce el viewport desplazable del main para impedir superposición de la utilidad; no modifica dimensiones de componentes. El menú y los diálogos conservan su altura y scroll, ocultando la utilidad durante su apertura.

## Superficies revisadas

- Tipografía: Inter y escala vigente conservadas. Utilidad14px/500, identificación13px, icono18px y control44px mínimo; no reducción dinámica.
- Espaciado/layout: posición fija inferior derecha16px más safe areas, reserva100px desktop/tablet y112px teléfono. Veinte combinaciones de ruta/viewport sin solapamiento ni overflow.
- Color/tokens: acción azul, hover navy, active navyDeep, radio10px y sombra sutil del mismo Design System. JSON y CSS sincronizados.
- Imágenes: no se sustituyeron activos ni se alteró el encuadre para el addendum. Las rutas relativas del build cargan las mismas imágenes desde la subruta.
- Contenido: texto exacto del botón, identificación Prototipo UX/UI y descarga nativa. El ZIP r2 diferencia documentación y aplicación; guía Moodle documental y31archivos íntegros.

## Funcionalidad y accesibilidad

Un único componente persiste en Inicio, Mis cursos y tres asignaturas. Enlace nativo download, teclado, foco y estados definidos. No abre páginas ni solicita datos. Se oculta con modales y conserva el scroll. Descarga real en Safari/Chrome, ZIP actualizado y hashes comprobados. Build local de Pages navega tres cursos y reproduce el mismo video bajo la subruta; no hay despliegue.

Los tokens y CSS del ZIP r2 coinciden byte a byte con los de la revisión previa al addendum. Los cambios posteriores de código son exclusivamente de rutas de recursos, autorizados por Joel. Las pruebas de caracterización de Administración y catálogo pasaron.

## Resultado

Sin hallazgos P0/P1/P2 pendientes. Los mockups de composición originales se conservan con índice de autoridad; no se distribuye su HTML/CSS antiguo como especificación. No se certifican teléfonos físicos ni disponibilidad de Pages en un plan no comprobado. Más evidencia en VALIDACION.md.
