# Entrega de Design Handoff y preparación de GitHub

Este informe registra la fase de preparación. Posteriormente Joel autorizó la publicación pública; el estado de Pages y el workflow vigente se describe en docs/github-pages.md.

Fecha: 2026-11-04. Revisión documental:2026-11-04-r2. Design System visual1.4.

## Paquete vigente

[UNAH-Campus-Virtual-Design-Handoff.zip](public/downloads/UNAH-Campus-Virtual-Design-Handoff.zip) contiene31 archivos y7.168.253bytes. SHA-256:

`b744f7b588f1a63a40fe9b2425283b5d9f99e2578cca6f81af7b27764433587e`

[Checksum descargable](public/downloads/UNAH-Campus-Virtual-Design-Handoff.zip.sha256). El manifiesto interno enumera30 archivos; se excluye a sí mismo. Se verificaron CRC, descompresión, tamaño y SHA de cada archivo. Todos los enlaces locales Markdown y las referencias de imágenes del JSON existen dentro del ZIP.

El README de la raíz del ZIP es autónomo y describe la estructura real del paquete. No contiene pasos para ejecutar una aplicación. Se diferencia expresamente del repositorio funcional. La guía de Moodle cubre tokens, componentes, CSS, adaptación al tema, Bootstrap, accesibilidad y datos que dependerán de Moodle. No se implementó Moodle.

La revisión r2 conserva exactamente los tokens y los seis CSS de la versión revisada anteriormente. Solo cambiaron documentos y organización del ZIP. Posteriormente se adaptaron exclusivamente las URLs de recursos para Pages, según autorización expresa.

## Utilidad de descarga

Componente único en Inicio, Mis cursos y las pantallas académicas. Identificación «Prototipo UX/UI», enlace de descarga nativo, icono, azul institucional y hover/focus/active. Se validaron20 combinaciones de cinco rutas y cuatro viewports:375×812,390×844,430×932 y1536×1024.

Está fijo en la esquina inferior derecha, fuera del viewport académico desplazable gracias al espacio reservado. No tapa controles. Se oculta durante menú y actividad, conservando el espacio y la posición de scroll. Un único elemento permanece al cambiar de ruta.

## Pruebas de descarga y navegación

- Safari real en macOS: clic en el botón, misma pantalla, ZIP r2 descargado y hash verificado.
- Chrome real en macOS: clic y activación con teclado. ZIP r2 bajo la subruta de repositorio descargado y hash verificado.
- Ambas copias actualizadas coinciden con el SHA anterior y tienen31 archivos.
- HTTP200/application-zip, raíz y subruta. Descompresión y manifiesto verificados.
- Build estático probado en `/unah-campus-virtual-prototype/`: tres cursos, imágenes, fuentes, video12s, subtítulos y descarga; ningún recurso dinámico escapa a la raíz del dominio.
- Pruebas académicas:3pasaron, incluida caracterización de Administración y aislamiento de rutas de48clases.
- Pruebas de build:2pasaron, incluyendo referencias HTML/CSS y recursos dinámicos bajo subruta.
- `check:design`, `handoff:check` y `build:pages` pasaron. Sin dependencias adicionales de interfaz.

## Archivos relevantes

Documentación: README del repositorio, plantillas documentales del ZIP en docs, Design System y especificaciones en references, guía de Moodle, manifiesto y checksum del ZIP.

Implementación: componente design-handoff.js/design-handoff.css, montaje único en main.js y nuevos tokens de utilidad. Tras el addendum, los cambios funcionales se limitaron a URLs de imágenes/video/logo mediante assets.js y referencias en course.js, overview.js e index.html.

Preparación: scripts de ZIP y pruebas, build estático, configuración y prueba de subruta, CI de validación sin despliegue, plantilla inactiva de Pages, gitignore/gitattributes y fixture académico. Borradores, pruebas internas, temporales y starter de hosting opcional se conservan localmente fuera de Git; no forman parte del sitio ni del ZIP.

## Capturas

- [Inicio desktop](references/01-REFERENCIAS/estado-actual/inicio-desktop.jpg).
- [Mis cursos desktop](references/01-REFERENCIAS/estado-actual/mis-cursos-desktop.jpg) y [móvil](references/01-REFERENCIAS/estado-actual/mis-cursos-movil.jpg).
- [Clase desktop](references/01-REFERENCIAS/estado-actual/clase-desktop.jpg) y [móvil](references/01-REFERENCIAS/estado-actual/clase-movil.jpg).
- [Menú móvil](references/01-REFERENCIAS/estado-actual/menu-movil.jpg).
- [Comparación desktop](docs/qa/comparacion-handoff-desktop.png) y [móvil](docs/qa/comparacion-handoff-movil.png).

## GitHub Pages

Preparado como sitio estático, con recursos relativos y ZIP incluido. El único workflow activo valida; no publica. La plantilla de Pages está en docs, fuera de workflows. Pages permanecerá desactivado hasta autorización expresa. La futura activación en un repositorio privado exige comprobar disponibilidad del plan; no se modificó la visibilidad para publicar.

Las pruebas móviles se realizaron mediante viewports, no teléfonos físicos. Safari y Chrome se probaron realmente para las descargas; no se afirma una matriz de versiones o dispositivos que no se haya probado.


## Repositorio entregado

Repositorio privado e independiente: https://github.com/menciajoel/unah-campus-virtual-prototype . Código y documentación subidos a main. Se verificó private=true y has_pages=false. El primer workflow de validación pasó en GitHub: https://github.com/menciajoel/unah-campus-virtual-prototype/actions/runs/41944478171 . No se creó ningún workflow activo de publicación ni se activó Pages.

El control de archivos versionados no detectó credenciales, correo privado ni rutas del equipo. No se modificaron repositorios existentes. La publicación queda pendiente exclusivamente de una autorización posterior y de comprobar la disponibilidad del plan para Pages privado.
