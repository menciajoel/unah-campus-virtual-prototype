# UNAH · Campus Virtual — Prototipo UX/UI

Prototipo responsive de presentación institucional, con tres asignaturas navegables y contenido exclusivamente demostrativo. Incluye Design System vigente, documentación consolidada y descarga directa del handoff. No implementa Moodle, autenticación, entregas reales ni calificaciones.

## Sitio público

Destino de publicación: https://menciajoel.github.io/unah-campus-virtual-prototype/ . La publicación fue autorizada el4de noviembre de2026; el sitio está destinado a acceso público, sin cuenta de GitHub.

## Diseño y documentación

El contrato vigente está en `references/02-DESIGN-SYSTEM/` y las especificaciones en `references/03-ESPECIFICACIONES/`. Se conserva un solo Design System. Los tokens JSON generan `src/css/tokens.css`; no editar ese archivo manualmente.

La composición procede de los mockups aprobados y sus refinamientos posteriores. El índice `docs/referencias-visuales.md` distingue referencias de composición y capturas actuales. Los porcentajes65/42/78, nombres de clases, fechas y perfil visible pertenecen al escenario de demostración, sin expedientes de estudiantes ni conexión con cuentas reales.

## Uso local

Requiere Node/npm. No se necesitan credenciales ni variables de entorno.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4173
```

Abrir el catálogo en `http://127.0.0.1:4173/#/cursos`. La aplicación utiliza una sola entrada HTML, rutas hash, CSS modular y JavaScript ES vanilla. Las tres tarjetas completas son navegables y recuerdan la última clase por curso durante la sesión.

## Verificación y build

```sh
npm run tokens
npm run check:design
npm run test:academic
npm run handoff:build
npm run handoff:check
npm run build
```

El generador y verificador del ZIP usan Python3 estándar, sin instalar paquetes. El archivo de descarga se versiona para que el build estático no necesite generar documentación en el navegador. El build prepara archivos locales; no publica.

## Estructura

- `index.html`: entrada única, navbar y diálogos.
- `src/js/course.js`: catálogo académico separado de vistas.
- `src/js/components.js`, `main.js`, `overview.js`: componentes, rutas y catálogo.
- `src/js/resources.js`, `accordion.js`, `navigation.js`: recursos, transiciones y menú.
- `src/js/assets.js`: resolución de recursos relativa al sitio.
- `src/js/design-handoff.js`: utilidad compartida de descarga, montada una sola vez.
- `src/css/`: tokens, base, layout, componentes, responsive y utilidad de handoff.
- `references/`: contrato y referencias visuales.
- `docs/`: información para desarrollo y preparación de entrega.
- `public/downloads/UNAH-Campus-Virtual-Design-Handoff.zip`: documentación descargable.
- `public/assets/`: imágenes, logo, portadas, video de12s, subtítulos y licencias locales.
- `assets/originals/` y `assets/welcome-photo-provenance.json`: original y trazabilidad de la fotografía de bienvenida.
- `tests/`: pruebas de catálogo y componentes compartidos.

## Navegación y accesibilidad

Navbar permanente en todos los tamaños. Sidebar permanente desktop con scroll solo en unidades y main independiente. Móvil: navbar64px sin separador amarillo, resumen principal informativo y video16:9 al ancho interior. El menú muestra primero el curso actual, único con progreso y desplegable; los demás conservan tamaños y muestran «Ir al curso».

Acordeones de260ms, chevron derecha/abajo, recursos exclusivos, reversión de pulsaciones, teclado, inert y movimiento reducido. El modal bloquea el fondo y conserva su scroll al cerrar. Las acciones fuera del alcance permanecen deshabilitadas.

La utilidad «Prototipo UX/UI» permite descargar las especificaciones desde cualquier pantalla. Está fuera del viewport académico desplazable para no cubrir controles; respeta áreas seguras y se oculta durante los diálogos.

## Créditos

Logo SVG oficial proporcionado para el prototipo. Bienvenida: [UNAHEntrance03, Thelmadatter](https://commons.wikimedia.org/wiki/File:UNAHEntrance_03.JPG), licencia CC BY-SA3.0. Se conserva el original3872×2592 y WebP desktop2560×674 / móvil1200×961, con recortes documentados y atribución en `public/assets/licenses/welcome-campus-photo.txt`. Texto, degradado y acento se implementan en HTML/CSS.

Portada de Administración: recurso de demostración editado a partir de la referencia aprobada, sin controles integrados. Las otras portadas reutilizan las imágenes aprobadas de asignatura. Fuentes e iconos conservan sus licencias en `public/assets/licenses/`. El perfil del mockup es parte del escenario visual aprobado, no una cuenta conectada.

## Alcance de esta entrega

Repositorio independiente: unah-campus-virtual-prototype. La publicación pública de GitHub Pages fue autorizada expresamente por Joel; únicamente se utiliza este repositorio. No se modifican otros repositorios ni proyectos.


## ZIP de diseño y repositorio funcional

El [ZIP descargable](public/downloads/UNAH-Campus-Virtual-Design-Handoff.zip) contiene documentación, tokens, especificaciones, referencias visuales y CSS. Tiene su propio README autónomo y no es una aplicación ejecutable. El repositorio contiene la implementación funcional HTML/CSS/JavaScript, sus activos, pruebas y herramientas. El checksum del ZIP se conserva junto al archivo.

El manifiesto y el README del paquete se verifican contra los archivos realmente incluidos. La guía documental de Moodle no implementa ni modifica Moodle.

## GitHub Pages

```sh
npm run build:pages
npm run preview:pages
```

La salida es `dist/client`; la vista previa prueba `/unah-campus-virtual-prototype/`. El workflow validate.yml comprueba el proyecto. El workflow pages.yml publica mediante ejecución manual después de la autorización recibida. Consultar [GitHub Pages](docs/github-pages.md). Las licencias y procedencia se describen en [NOTICE.md](NOTICE.md).

Los borradores, capturas internas, archivos temporales y el starter opcional de hosting quedan fuera del repositorio. Las referencias actuales del handoff y los archivos necesarios para reconstruirlo sí se versionan.
