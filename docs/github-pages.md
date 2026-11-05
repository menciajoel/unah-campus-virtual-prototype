# Preparación de GitHub Pages

El frontend compila como sitio estático en `dist/client`. La configuración Vite utiliza base relativa y los recursos dinámicos pasan por el mismo resolvedor de URL. Esto permite servir desde raíz o desde `/unah-campus-virtual-prototype/`; la navegación usa hash y no requiere reescrituras del servidor.

## Validación local

```sh
npm ci
npm run build:pages
npm run preview:pages
```

La vista previa local se sirve en `http://127.0.0.1:4174/unah-campus-virtual-prototype/#/cursos`. Se comprueban CSS, fuentes, imágenes, video, subtítulos, navegación y ZIP desde esa subruta. Las pruebas de build verifican que los recursos no escapen a la raíz del dominio.

## Estado de publicación

Pages permanece desactivado. El único workflow activo es `validate.yml`, con permisos de lectura y comprobaciones de build; no contiene despliegue ni permisos de Pages.

`github-pages.yml.example`, en este mismo directorio, es una plantilla inactiva. No está en la carpeta de workflows y no puede ejecutarse como publicación. Después de autorización expresa, el responsable podrá revisar el plan/visibilidad del repositorio, habilitar Pages y trasladar la plantilla. No realizar esos pasos durante la preparación.

GitHub Pages para repositorios privados depende del plan de la cuenta. No se presume disponibilidad ni se cambia la visibilidad del repositorio para activarlo. [Documentación oficial de disponibilidad](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

La preparación sigue la configuración de [rutas base de Vite](https://vite.dev/guide/build.html#public-base-path) y los [workflows de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). La variante relativa se prueba de forma explícita en la subruta real del repositorio.
