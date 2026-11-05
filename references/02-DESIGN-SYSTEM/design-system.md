# Design System — Campus Virtual UNAH v1.4

Contrato visual actualizado por instrucciones de Joel el 4 de noviembre de 2026. Evoluciona el mismo Design System v1; no existe un sistema alternativo. Los tokens provisionales de v1 y la calibración CSS posterior quedan sustituidos por `design-tokens.json` v1.4.

## Autoridad

Los mockups aprobados conservan la composición, imágenes y lenguaje institucional. Los refinamientos posteriores de Joel gobiernan los tamaños y pesos siguientes, la eliminación del encabezado «Recursos de la clase», los nombres demostrativos y la navegación fija. Las especificaciones UX gobiernan el comportamiento. El prototipo es local y no se integra con Moodle.

## Tipografía

Inter, alojada localmente, con fallback Arial/sans-serif. Valores efectivos:

| Elemento | Desktop | Móvil | Peso |
|---|---:|---:|---:|
| Texto general | 14px | 14px | 400 |
| Texto secundario | 13px | 13px | 400 |
| Navegación principal | 14px | 14px | 500 |
| Unidad del sidebar/menú | 14px | 14px | 600 |
| Clase del sidebar/menú | 13px | 13px | 400 |
| Clase seleccionada | 13px | 13px | 600 |
| Título de recurso | 14px | 14px | 500 |
| Título de sección | 16px | 16px | 600 |
| Título de metadatos del video | 18px | Oculto según composición móvil | 600 |
| Título principal de clase | 30px | 25px | 600 |
| Nombre de asignatura | 20px | 18px | 600 |
| Botón | 14px | 14px | 500 |

El nombre de asignatura dentro del drawer usa 18px. Texto del título de producto: 22px/500. El texto del banner de unidad fotográfico es parte de la imagen aprobada; no se deforma para ajustar su tipografía. Los banners de demostración usan 28px desktop y el tamaño de asignatura móvil. Interlineados: cuerpo 1.5, títulos 1.2, filas y metadatos 1.35. No se usa peso 700 en texto de interfaz. El peso 700 no forma parte de la escala vigente ni se carga en el prototipo. El peso 900 de los glifos Font Awesome pertenece a su fuente de iconos, no a la jerarquía textual.

## Dimensiones y densidad

| Componente | Desktop | Móvil |
|---|---|---|
| Navbar | 68px | 64px en teléfono y tablet |
| Sidebar | 380px; 320px entre 1200–1450px | Solo dentro del menú |
| Fila de unidad | 36px + 4px de padding arriba/abajo | 44px + 4px arriba/abajo |
| Fila de clase | 36px | 44px mínimo en el menú |
| Indicador de clase | 18px | 20px en drawer de teléfono |
| Check | 10px | 12px en drawer de teléfono |
| Línea de progreso | 1.5px; continua entre centros | 1.5px; misma geometría |
| Icono navbar | 18px | 20px en controles móviles |
| Icono recurso | 20px | 20px |
| Fila de recurso | 48px mínimo, crece con el texto | 48px mínimo, crece con el texto |
| Botón primario | 36px mínimo | 44px mínimo |
| Icono de actividad | 24px | 24px |
| Actividad | 72px mínimo, padding 12px × 16px | Apilada, padding 12px y CTA de 44px |
| Foto de asignatura | 80px × 80px | 66px × 54px; drawer 48px × 48px |
| Barra general de progreso | 8px | 8px; drawer 6px |

Se conservan el ancho general del sidebar, el banner de 150px desktop, el reproductor 16:9 y la composición de video/metadatos. Los metadatos se alinean al borde superior del reproductor, con título de 18px/600; no se centran verticalmente. El ancho útil desktop usa gutters combinados de 40px; el espaciado sigue la base de 4px del sistema existente. Radios: 6, 10 y 16px. Sin sombras decorativas ni tarjetas por recurso. En la vista académica la superficie secundaria destacada es la actividad azul pálida. Mis cursos conserva las tarjetas y el panel lateral aprobados en clases.png.

## Color y estados

La paleta institucional v1 se conserva. Las variantes semánticas `completeReadable: #329C24` y `stateBorder: #7C8DA8` hacen legibles los checks y anillos; `complete: #36AD27` y `pending: #A6B4C8` siguen disponibles como colores base. Los colores de selección, actividad, texto y separadores son los existentes. No hardcodear colores por componente.

Completada: círculo verde con check. Actual académica: anillo azul con centro claro. Pendiente: anillo vacío. Selección de navegación: fondo azul claro y peso 600; no cambia la finalización académica. La línea vertical parte del centro de un indicador y llega al siguiente: verde después de una clase completada y gris en el tramo pendiente. Los marcadores se dibujan encima de la línea; la selección no debe interrumpirla.

## Textos largos y accesibilidad

Las clases se muestran en una sola línea con `min-width:0`, `overflow:hidden`, `white-space:nowrap` y `text-overflow:ellipsis`. El enlace conserva el nombre completo en `aria-label` y `title`. No reducir la fuente por longitud. Los títulos principales pueden ajustar línea. Mantener foco visible, navegación de teclado, texto de estado accesible y áreas táctiles móviles de al menos 44px. Los estados se distinguen por forma y color.

## Posicionamiento y recursos

Una única cabecera permanente ocupa la primera fila de un Grid de viewport `100dvh`; el main desplaza su contenido en la segunda. El sidebar permanente existe solo en desktop y su lista de unidades tiene scroll propio. En móvil, el resumen principal de cualquier asignatura es informativo: sin flecha, botón ni unidades duplicadas. La navegación académica vive en el menú hamburguesa, con scroll interno y fondo bloqueado mientras está abierto. Cerrar el menú conserva la posición del main. Se respetan `safe-area-inset-*`.

No mostrar el encabezado ni icono «Recursos de la clase». Presentación, Lectura y Video se presentan directamente con separadores abiertos, en todas las clases y tamaños. Todos los materiales y nombres de unidades/clases son demostrativos. No simular entregas, calificaciones ni finalización.

## Sincronización

`design-tokens.json` es la fuente de valores. En el ZIP se entrega su snapshot CSS en [tokens.css](../04-IMPLEMENTACION/CSS/tokens.css). Las herramientas de generación y comprobación pertenecen al repositorio de la implementación funcional; el ZIP no requiere ejecutarlas. No mantener calibraciones alternativas ni tamaños superpuestos. Las variantes responsive usan únicamente tokens existentes con propósito documentado.

## Mis cursos y bienvenida — incorporación v1.4

Referencia aprobada: `01-REFERENCIAS/clases.png`. Reutiliza la misma cabecera. Bienvenida de 264px desktop / 216px teléfono; nombre 48px / 32px, peso 600; saludo 18px/500, descripción 16px desktop / 14px móvil. El título Mis cursos usa 24px desktop y 22px teléfono. Columnas desktop 2fr/1fr con gap de 32px; a ≤1023px el panel de actividades pasa debajo. Gutter 56px desktop, 40px entre 1024–1450px, 24px entre 768–1023px y 18px teléfono.

Las tres tarjetas completas son enlaces. Foto 212×104px desktop, 96×72px teléfono; modo lista 96×64px desktop y 48×48px teléfono. Padding 16px desktop / 12px móvil; flecha de 40px desktop, indicador de 18px móvil. Progreso nativo con valor de cada asignatura; no fijarlo en CSS. Selector de vista 52×44px y una sola colección de datos. Panel Próximas actividades: encabezado 64px, filas 72px mínimo, pie 56px. Fechas y actividades son muestras; el calendario permanece inactivo.

La bienvenida usa fotografía auténtica UNAH de Thelmadatter, CC BY-SA 3.0: https://commons.wikimedia.org/wiki/File:UNAHEntrance_03.JPG . Original de alta calidad y atribución conservados en el prototipo. WebP desktop 2560×674 y móvil 1200×961. `cover` mantiene proporciones. Texto, degradados y acento amarillo son HTML/CSS. La máscara desktop `component.welcome.desktopFade` elimina el borde de corte de la foto; no se aplica en teléfono.

## Video — corrección aprobada

Portada visible para las tres asignaturas. Administración usa el póster limpio sin controles dibujados; Contabilidad I y Estadística Aplicada reutilizan su imagen de asignatura. Un botón HTML cubre la portada; círculo visual de play centrado de 56px desktop / 44px teléfono, icono 20px / 16px, colores `videoControl` y `videoControlBorder`. Duración de muestra 0:12. El reproductor nativo tiene `poster`; al finalizar reaparece la portada con el control de reproducción.

En teléfono el video ocupa **100% del ancho interior** del recurso, alineado a la izquierda con su leyenda. Conserva 16:9. Este ajuste sustituye expresamente el ancho anterior de 70%. Los metadatos desktop permanecen arriba, con título 18px/600.

## Acordeones y menú contextual

Un único componente gestiona recursos, unidades y el curso actual del menú móvil. Duración `motion.accordionDuration`: 260ms; curva `cubic-bezier(0.4, 0, 0.2, 1)`. Chevron derecho cerrado y rotación de 90° hacia abajo abierto. Altura numérica y opacidad transicionan en CSS; `auto` solo se usa en reposo. Las pulsaciones rápidas invierten desde la altura visible. Sin temporizadores, rebotes ni escala. Los recursos son exclusivos entre sí; las unidades mantienen expansión independiente. Panel cerrado: inert y aria-hidden; encabezado: aria-expanded/aria-controls. Movimiento reducido elimina las transiciones.

En el menú hamburguesa el curso actual aparece **primero**, con su foto de 48px, nombre de 18px/600, progreso y desplegable. Los otros dos son enlaces con **las mismas dimensiones de foto y nombre**, texto secundario visible «Ir al curso», sin porcentaje, barra ni desplegable. Cambiar de curso cierra el menú y actualiza el contexto; al reabrirlo el nuevo curso es el primero. En Inicio/Mis cursos, donde no se visualiza una asignatura, los tres son enlaces sin progreso ni unidades. Los porcentajes de las tarjetas de Mis cursos se conservan.

Navbar móvil: altura 64px más safe-area superior; logo de 48px en teléfono y 52px en tablet, centrados verticalmente. Se elimina la línea amarilla del navbar y encabezado del drawer en composiciones móviles. Desktop mantiene su altura de 68px, separador y tamaños originales. El drawer de teléfono conserva su encabezado de 70px.

Los banners de unidad de demostración tienen altura móvil mínima de 74px y crecen con títulos largos; no recortar texto mediante una altura rígida.


## Utilidad de entrega — v1.4

Un único componente fijo inferior derecho, separado de las acciones académicas. Identificación «Prototipo UX/UI» en13px/400, enlace «Descargar especificaciones de diseño» con icono Font Awesome de18px, texto14px/500, fondo azul de acción, radio10px y sombra0 2px 8px con navy al10%. Hover azul navy, active navyDeep y foco visible de3px. Área de interacción mínima44px; el texto puede ajustar línea en anchos estrechos, sin reducir fuente.

Borde inferior/derecho16px más safe areas. El main reserva100px inferior en desktop/tablet y112px en teléfono, además del área segura; la utilidad queda fuera de su viewport desplazable y no cubre CTAs, paginación ni recursos. Sidebar y navbar conservan su posición. Durante cualquier diálogo abierto se oculta la utilidad y conserva la reserva para evitar saltos de scroll. No se duplica al cambiar de ruta.

La descarga usa un enlace nativo download al ZIP servido por el mismo sitio. No hay páginas intermedias, formulario, captura de datos ni servicio externo. El archivo contiene contratos vigentes, referencias identificadas, CSS y licencias, con manifiesto de integridad. No distribuir mockup HTML/CSS antiguos ni artefactos internos como especificación vigente.
