# Responsive — contrato vigente v1.4

Las tres referencias móviles se conservan como autoridad de composición. Las instrucciones posteriores de Joel incorporan navbar permanente en todos los tamaños y resumen principal de asignatura sin desplegable.

- **≥1200px:** navbar de 68px; sidebar permanente de 380px, reducido a 320px entre 1200–1450px. Curso/progreso permanecen visibles; la lista de unidades tiene overflow vertical propio. Main con scroll independiente. Video y metadatos en dos columnas.
- **768–1199px:** navbar compacto de 64px; título de clase 25px y asignatura 18px; menú hamburguesa; sin sidebar permanente. Main debajo de la cabecera, con scroll propio. Dos columnas de video mientras se dispone de este ancho.
- **<768px:** navbar de 64px; título de clase 25px y asignatura 18px. Una columna; video al 100% del ancho interior del recurso, sin centrado ni margen automático; metadata lateral del video oculta; actividad apilada con CTA de al menos 44px. Banner móvil con aspect-ratio 807/163, cover y texto integrado completo.
- **<360px:** drawer de 82vw para conservar legibilidad; no reducir fuentes dinámicamente.
- El navbar existe una sola vez y ocupa la primera fila de un Grid de 100dvh. Main ocupa la segunda sin quedar tapado. `viewport-fit=cover` y safe-area-inset protegen cabecera, laterales apaisados y final del contenido.
- El menú usa 100dvh, overflow propio y cierre sticky. Abrirlo cambia el main a overflow hidden conservando scrollTop; cerrar restaura overflow. No hay listeners de scroll ni body fijo con offsets.
- Nombres de clases: una línea, ellipsis, nombre accesible completo. No scroll horizontal de documento ni paneles.
- La reducción de filas desktop no reduce los objetivos táctiles de 44px en móvil.

Validar 1536×1024, 390×844, 375×812 y 430px; incluir tamaños 360/412 y orientaciones apaisadas representativas de Android e iPhone. Distinguir pruebas de viewport de pruebas en dispositivos físicos.

El navbar móvil tiene 64px más safe-area y carece de separador amarillo. Su logo tiene altura propia de 48px en teléfono: no debe crecer al incrementar el contenedor. Los iconos y áreas de interacción conservan sus dimensiones. El menú de teléfono mantiene encabezado de 70px y scroll interno.

El curso académico actual es el primer elemento de cursos en el menú; únicamente este contiene progreso y unidades. Los otros conservan foto de 48px y nombre 18px, con acceso «Ir al curso». Esta regla se aplica en teléfono y tablet. Desktop mantiene el sidebar del curso seleccionado.

Bienvenida: 264px desktop / 216px teléfono; foto proporcional, variante móvil, texto HTML sobre degradado CSS. A ≤1023px los cursos y próximas actividades se apilan. El modo lista y cuadrícula comparten colección. Los banners HTML de unidades tienen mínimo móvil de 74px y altura de contenido para evitar recortes.

## Descarga de especificaciones

Utilidad fija inferior derecha con16px de margen más safe areas. Reserva fuera del main desplazable:100px desktop/tablet,112px teléfono. El nombre de la descarga puede ajustar línea. No reducir tipografías ni cubrir botones. Menú y diálogos conservan100dvh; ocultan la utilidad sin retirar la reserva del fondo. Navbar, sidebar, breakpoints y composición académica no cambian.
