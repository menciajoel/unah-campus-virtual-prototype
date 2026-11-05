import { assetUrl } from './assets.js';

// Academic fixtures only. None of these records come from Moodle or official syllabi.
const demoVideo = {
  src: assetUrl('assets/demo-video.mp4'), captions: assetUrl('assets/demo-captions.vtt'),
  poster: assetUrl('assets/video-administration.webp'), posterAlt: 'Vista previa del video de demostración', duration: '0:12',
};
const demoSlides = [
  'Ejemplo local para comprobar la visualización de una presentación.',
  'Utiliza las flechas para recorrer las diapositivas de muestra.',
  'Fin de la presentación de demostración. El recurso académico se incorporará en una fase posterior.',
];

function dueLabel(iso) {
  const date = new Date(`${iso}T12:00:00Z`);
  const options = { timeZone: 'America/Tegucigalpa' };
  const short = (field) => new Intl.DateTimeFormat('es', { ...options, [field]: 'short' }).format(date).replace(/\.$/, '');
  const weekday = short('weekday');
  return `${weekday[0].toUpperCase()}${weekday.slice(1)}, ${new Intl.DateTimeFormat('es', { ...options, day: 'numeric' }).format(date)} de ${short('month')}. de ${date.getUTCFullYear()}`;
}

function createCourse(config) {
  const completed = new Set(config.completed);
  const course = {
    id: config.id, title: config.title, progress: config.progress,
    initialLesson: config.initialLesson, images: config.images, demonstration: true,
    units: config.units.map((definition, index) => {
      const number = index + 1;
      const unit = { id: `u${number}`, number, title: definition.title };
      unit.lessons = definition.lessons.map((title, lessonIndex) => {
        const id = `${unit.id}-c${lessonIndex + 1}`;
        const override = config.overrides?.[id] || {};
        const dueDate = config.dueDates[index];
        return {
          id, number: lessonIndex + 1, title,
          status: completed.has(id) ? 'complete' : id === config.initialLesson ? 'current' : 'pending',
          description: override.description || config.description,
          resources: {
            presentation: { title: config.presentationTitle || `Diapositivas de ${title.toLowerCase()}`, slides: demoSlides },
            reading: { title: override.readingTitle || config.readingTitle || `Lectura de demostración: ${title}` },
            video: {
              ...demoVideo, ...config.video,
              title: override.videoTitle || `${title} · video de demostración`,
              description: override.videoDescription || config.videoDescription,
            },
          },
          activity: { title: override.activityTitle || config.activityTitle || `Actividad demostrativa: ${title}`, dueDate, dueLabel: dueLabel(dueDate), demonstration: true },
        };
      });
      unit.status = unit.lessons.every(lesson => lesson.status === 'complete') ? 'complete'
        : unit.lessons.some(lesson => lesson.status !== 'pending') ? 'current' : 'pending';
      return unit;
    }),
  };
  return course;
}

const allLessonsIn = (...units) => units.flatMap(unit => [1, 2, 3, 4].map(lesson => `u${unit}-c${lesson}`));

export const courses = [
  createCourse({
    id: 'administracion', title: 'Administración', progress: 65, initialLesson: 'u2-c3',
    images: { desktop: assetUrl('assets/campus-desktop.jpg'), mobile: assetUrl('assets/campus-mobile.jpg'), overview: assetUrl('assets/course-administration.png'), alt: 'Edificio del campus universitario' },
    completed: [...allLessonsIn(1), 'u2-c1', 'u2-c2'],
    units: [
      { title: 'Fundamentos de Administración', lessons: ['Introducción a la administración', 'Evolución del pensamiento administrativo', 'Principios de la administración', 'La administración en las organizaciones'] },
      { title: 'Proceso Administrativo', lessons: ['Introducción', 'Planificación', 'Organización', 'Dirección'] },
      { title: 'Control y Evaluación', lessons: ['Fundamentos del control administrativo', 'Indicadores de desempeño organizacional', 'Evaluación de resultados y mejora continua', 'Retroalimentación y acciones correctivas'] },
      { title: 'Gestión de las organizaciones', lessons: ['Toma de decisiones administrativas', 'Comunicación y trabajo en equipo', 'Liderazgo y gestión del cambio', 'Responsabilidad social y ética administrativa'] },
    ],
    description: 'Contenido de demostración para explorar esta clase y la navegación académica.',
    presentationTitle: 'Diapositivas principales de la clase', readingTitle: 'Material de lectura de la clase',
    video: { poster: assetUrl('assets/video-administration.webp'), posterAlt: 'Vista previa: un organigrama en una pizarra' },
    videoDescription: 'Recurso local de muestra. No sustituye el contenido académico de la asignatura.',
    activityTitle: 'Actividad de demostración de la clase.',
    dueDates: Array(4).fill('2026-11-07'),
    overrides: {
      'u2-c1': { description: 'Contenido de demostración para explorar introducción y la navegación académica.' },
      'u2-c2': { description: 'Contenido de demostración para explorar planificación y la navegación académica.' },
      'u2-c3': {
        description: 'Analiza la función de organización en el proceso administrativo y sus principales elementos.',
        videoTitle: 'La organización en la práctica',
        videoDescription: 'Explicación de la función de organización y ejemplos aplicados en instituciones reales.',
        readingTitle: 'Estructuras organizacionales', activityTitle: 'Análisis de una estructura organizacional.',
      },
      'u2-c4': { description: 'Contenido de demostración para explorar dirección y la navegación académica.' },
    },
  }),
  createCourse({
    id: 'contabilidad', title: 'Contabilidad I', progress: 42, initialLesson: 'u2-c2',
    images: { desktop: assetUrl('assets/course-accounting.png'), mobile: assetUrl('assets/course-accounting.png'), overview: assetUrl('assets/course-accounting.png'), alt: 'Calculadora e información financiera de demostración' },
    completed: [...allLessonsIn(1), 'u2-c1'],
    units: [
      { title: 'Fundamentos de contabilidad', lessons: ['Introducción a la información contable', 'Usuarios de la información financiera', 'Principios y normas contables', 'La ecuación contable'] },
      { title: 'Registro de operaciones', lessons: ['Cuentas y catálogo contable', 'Partida doble', 'Libro diario y libro mayor', 'Balance de comprobación'] },
      { title: 'Estados financieros', lessons: ['Estado de resultados', 'Estado de situación financiera', 'Estado de cambios en el patrimonio', 'Introducción al flujo de efectivo'] },
      { title: 'Cierre del ciclo contable', lessons: ['Ajustes contables', 'Depreciación y amortización', 'Asientos de cierre', 'Análisis básico de estados financieros'] },
    ],
    description: 'Contenido demostrativo de Contabilidad I para explorar conceptos y procedimientos contables. No es material oficial de la asignatura.',
    video: { poster: assetUrl('assets/course-accounting.png'), posterAlt: 'Calculadora y documentos financieros: video de demostración de Contabilidad I' },
    videoDescription: 'Recurso local de muestra para Contabilidad I. No sustituye el contenido académico autorizado.',
    dueDates: ['2026-11-10', '2026-11-17', '2026-11-24', '2026-12-01'],
  }),
  createCourse({
    id: 'estadistica', title: 'Estadística Aplicada', progress: 78, initialLesson: 'u4-c1',
    images: { desktop: assetUrl('assets/course-statistics.png'), mobile: assetUrl('assets/course-statistics.png'), overview: assetUrl('assets/course-statistics.png'), alt: 'Computadora con gráficos estadísticos de demostración' },
    completed: allLessonsIn(1, 2, 3),
    units: [
      { title: 'Estadística descriptiva', lessons: ['Variables y escalas de medición', 'Organización de datos', 'Tablas y distribuciones de frecuencia', 'Gráficos estadísticos'] },
      { title: 'Medidas descriptivas', lessons: ['Medidas de tendencia central', 'Medidas de dispersión', 'Posición y forma de una distribución', 'Análisis descriptivo de datos'] },
      { title: 'Probabilidad y distribuciones', lessons: ['Conceptos básicos de probabilidad', 'Probabilidad condicional', 'Variables aleatorias', 'Distribuciones de probabilidad'] },
      { title: 'Inferencia estadística', lessons: ['Muestreo y distribuciones muestrales', 'Estimación de parámetros', 'Pruebas de hipótesis', 'Interpretación de resultados estadísticos'] },
    ],
    description: 'Contenido demostrativo de Estadística Aplicada para explorar el análisis y la interpretación de datos. No es material oficial de la asignatura.',
    video: { poster: assetUrl('assets/course-statistics.png'), posterAlt: 'Computadora con gráficos: video de demostración de Estadística Aplicada' },
    videoDescription: 'Recurso local de muestra para Estadística Aplicada. No sustituye el contenido académico autorizado.',
    dueDates: ['2026-11-12', '2026-11-19', '2026-11-26', '2026-12-03'],
  }),
];

export const defaultCourse = courses[0];
export const findCourse = id => courses.find(course => course.id === id);
export const courseLessons = course => course.units.flatMap(unit => unit.lessons.map(lesson => ({ ...lesson, unit })));
export const findLesson = (course, id) => courseLessons(course).find(lesson => lesson.id === id);
export const lessonHref = (course, id) => course.id === defaultCourse.id ? `#/curso/${id}` : `#/curso/${course.id}/${id}`;
export const statusLabels = { complete: 'Completada', current: 'Clase actual', pending: 'Pendiente' };
