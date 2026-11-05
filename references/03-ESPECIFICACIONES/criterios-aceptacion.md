# Criterios de aceptación — v1.4

- **UI-01:** composición institucional conservada, tipografía conforme a la escala v1.4 y sin texto de interfaz en peso 700.
- **UI-02:** no encabezado «Recursos de la clase» ni su icono; recursos con separadores horizontales abiertos y sin tarjetas adicionales.
- **UI-03:** clases de sidebar a 13px, 400 habitual/600 seleccionada; una línea y ellipsis; nombre completo accesible.
- **UI-04:** indicadores alineados, círculos/checks visibles y línea continua verde/gris. No depender solo del color.
- **UI-05:** banner cover sin deformación; variante móvil proporcional y texto legible. Reproductor 16:9 verificable.
- **UX-01:** navbar permanente en todos los tamaños; sidebar permanente solo desktop; desplazamientos independientes y sin overflow horizontal.
- **UX-02:** Resumen de asignatura informativo en pantalla móvil, navegación académica exclusivamente en el drawer.
- **UX-03:** drawer con scroll propio, fondo bloqueado y posición preservada al cerrar; orientación y cierre por teclado comprobados.
- **UX-04:** unidades/clases/anterior/siguiente funcionales; progresos de demostración 65/42/78% según asignatura; reproducción no completa clases.
- **UX-05:** recursos desplegables y actividad demostrativa funcionales; funciones excluidas deshabilitadas.
- **QA-01:** foco y teclado, controles móviles de al menos 44px y lectura sin desbordamientos.
- **QA-02:** JSON original y copia del proyecto idénticos; CSS generado coincide byte a byte; sin calibraciones alternativas.
- **QA-03:** capturas de antes/después y comparación contra referencias a 1536×1024, 390×844 y 375×812; documentar limitaciones de dispositivos físicos.
- **QA-04:** sin integración con Moodle, publicación ni deployment. Documentación, tokens y CSS sincronizados antes de entregar.

- **UX-06:** las tres tarjetas completas son navegables; cada curso carga cuatro unidades y dieciséis clases, recursos y actividades propios mediante los mismos componentes. Sin datos del curso anterior.
- **UX-07:** menú móvil con curso actual primero; solo este muestra progreso y desplegable. Otros cursos con foto/nombre de igual tamaño y «Ir al curso», sin progreso ni dropdown. Cambiar curso actualiza el contexto y cierra el menú.
- **UX-08:** acordeones a 260ms, altura/opacidad progresivas, chevron derecha/abajo; inversión durante pulsaciones rápidas; recursos mutuamente exclusivos; teclado, inert, aria-controls/expanded y movimiento reducido.
- **UI-06:** video móvil a todo el ancho interior, 16:9 y leyenda a la izquierda; portada en tres cursos, play HTML centrado y portada recuperada al terminar.
- **UI-07:** navbar móvil 64px más safe-area, logo 48px teléfono, sin separador amarillo; desktop 68px y composición original conservada.
- **UI-08:** bienvenida con fotografía auténtica y atribución, degradado desktop natural, texto HTML y variante móvil; original de alta calidad y WebP conservados.

- **HF-01:** un solo componente de descarga en todas las rutas, identificación Prototipo UX/UI y estados hover/focus/active.
- **HF-02:** ZIP válido y completo, contratos/CSS/tokens sincronizados, manifiesto de archivos y sin temporales, credenciales ni rutas privadas.
- **HF-03:** descarga directa en Safari y Chrome; fijo durante scroll; no solapa botones académicos ni interfiere con modales.
- **HF-04:** rutas compatibles con raíz y subruta de repositorio; Pages preparado pero sin activar hasta autorización expresa.
