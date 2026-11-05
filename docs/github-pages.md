# Publicación autorizada en GitHub Pages

Joel autorizó expresamente publicar el prototipo el4de noviembre de2026, con acceso público sin autenticación. Se utiliza únicamente el repositorio existente unah-campus-virtual-prototype. Se conserva la preferencia de repositorio privado si Pages lo permite; está autorizado cambiarlo a público si el plan lo exige.

## Build y rutas

El frontend estático se compila en dist/client. Vite utiliza una base relativa y el mismo resolvedor para recursos dinámicos; el sitio se sirve en `/unah-campus-virtual-prototype/` y navega por hash. El ZIP y su checksum se sirven bajo downloads, en la misma base.

```sh
npm ci
npm run build:pages
npm run preview:pages
```

La vista previa local permite comprobar esa subruta antes de publicar. Las pruebas de build revisan HTML/CSS, imágenes, fuentes, video, subtítulos y ZIP; el catálogo comparte componentes y rutas aisladas por asignatura.

## Workflows

validate.yml comprueba el proyecto con permisos de lectura. pages.yml publica mediante ejecución manual: instala dependencias bloqueadas, ejecuta build:pages, carga dist/client y despliega a Pages con los permisos mínimos del job de publicación.

La publicación no modifica el diseño, los tokens, la lógica académica ni Moodle. La revisión documental r2 del ZIP conserva su manifiesto y SHA-256. Las verificaciones de privacidad abarcan los archivos y el historial; los avisos de recursos se conservan en NOTICE y en los archivos de licencia.

## Destino público

https://menciajoel.github.io/unah-campus-virtual-prototype/

Después de cada publicación autorizada se debe verificar el acceso sin cookies/autorización, los recorridos académicos, el menú móvil, los recursos y el ZIP descargado contra su checksum.

Referencias de configuración: [rutas base de Vite](https://vite.dev/guide/build.html#public-base-path) y [workflows de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
