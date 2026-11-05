# UNAH · Campus Virtual — Design Handoff

Este paquete permite interpretar e implementar el sistema visual del Campus Virtual UNAH. Reúne el contrato de diseño vigente, sus tokens, componentes, interacciones, comportamiento responsive, criterios de aceptación, referencias visuales y CSS de implementación.

**Design Handoff ZIP:** documentación y referencias de diseño. No es una aplicación ejecutable independiente y no requiere instalar ni ejecutar herramientas.

**Repositorio GitHub:** implementación funcional HTML, CSS y JavaScript del prototipo, con su propia documentación de desarrollo. El código funcional y sus herramientas no forman parte de este ZIP. La integración con Moodle y la publicación requieren una fase posterior autorizada.

## Qué consultar primero

1. [Design System vigente](02-DESIGN-SYSTEM/design-system.md): jerarquía visual, dimensiones, estados y decisiones aprobadas.
2. [Design tokens](02-DESIGN-SYSTEM/design-tokens.json): fuente de colores, tipografía, espaciados, componentes y movimiento.
3. [Componentes](03-ESPECIFICACIONES/componentes.md) e [interacciones UX](03-ESPECIFICACIONES/interacciones.md): anatomía, estados y comportamiento.
4. [Responsive](03-ESPECIFICACIONES/responsive.md) y [criterios de aceptación](03-ESPECIFICACIONES/criterios-aceptacion.md): adaptación y validación.
5. [Guía de integración con Moodle](03-ESPECIFICACIONES/integracion-moodle.md): adaptación al tema y límites de integración.
6. [Guía del CSS de referencia](04-IMPLEMENTACION/README.md) e [índice de referencias visuales](01-REFERENCIAS/README.md): correspondencia con el diseño implementado.

## Estructura del paquete

Todas las rutas indicadas aquí son relativas a esta carpeta raíz:

```text
UNAH-Campus-Virtual-Design-Handoff/
├── README.md
├── MANIFEST.json
├── 01-REFERENCIAS/
│   ├── README.md
│   ├── campus-virtual-desktop.jpg
│   ├── campus-virtual-mobile.png
│   ├── campus-virtual-mobile 2.png
│   ├── campus-virtual-mobile 3.png
│   ├── clases.png
│   └── estado-actual/
│       ├── inicio-desktop.jpg
│       ├── mis-cursos-desktop.jpg
│       ├── clase-desktop.jpg
│       ├── mis-cursos-movil.jpg
│       ├── clase-movil.jpg
│       └── menu-movil.jpg
├── 02-DESIGN-SYSTEM/
│   ├── design-system.md
│   └── design-tokens.json
├── 03-ESPECIFICACIONES/
│   ├── componentes.md
│   ├── interacciones.md
│   ├── responsive.md
│   ├── criterios-aceptacion.md
│   └── integracion-moodle.md
├── 04-IMPLEMENTACION/
│   ├── README.md
│   └── CSS/
│       ├── tokens.css
│       ├── base.css
│       ├── layout.css
│       ├── components.css
│       ├── responsive.css
│       └── design-handoff.css
└── 05-LICENCIAS/
    ├── Inter-OFL.txt
    ├── Font-Awesome-Free.txt
    └── welcome-campus-photo.txt
```

## Cómo utilizar los mockups

Las imágenes de composición aprobadas están directamente en [01-REFERENCIAS](01-REFERENCIAS/README.md). Las capturas de [estado actual](01-REFERENCIAS/estado-actual/) muestran el resultado tras los refinamientos. Consultar su índice antes de comparar: los raster de origen conservan decisiones anteriores de tamaño e interacción, sustituidas por el contrato vigente.

Usar las imágenes para comprender composición, alineación, jerarquía y proporciones. Usar las especificaciones y tokens para implementar valores y comportamiento. No extraer de un raster antiguo medidas que contradigan la documentación actual ni reproducir los controles del sistema operativo dibujados en las referencias móviles.

## CSS y activos

[CSS/tokens.css](04-IMPLEMENTACION/CSS/tokens.css) refleja los valores de los tokens JSON. Los demás CSS son una referencia de la implementación; no deben importarse sin adaptación dentro de Moodle. La [guía de CSS](04-IMPLEMENTACION/README.md) explica su orden, responsabilidad y limitaciones.

Las imágenes de referencia no sustituyen al conjunto de activos del prototipo funcional. Los archivos de imagen, fuentes, iconos, video y JavaScript que necesita la aplicación se obtienen del repositorio, respetando sus licencias. Los avances, nombres de clases, fechas y perfil del mockup pertenecen al escenario de demostración; no son expedientes académicos.

## Integridad

[MANIFEST.json](MANIFEST.json) enumera tamaños y hashes SHA-256 de todos los archivos del paquete salvo el propio manifiesto. El hash SHA-256 del ZIP completo se entrega junto al archivo descargable. La revisión documental de este paquete es **2026-11-04-r2**; mantiene el mismo Design System visual **1.4**.
