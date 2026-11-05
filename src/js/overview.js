import { assetUrl } from './assets.js';
import { courses, lessonHref } from './course.js';
import { escapeHTML, icon } from './components.js';

// One academic catalog powers both display modes and all three course links.
const demoActivities = [
  { title: 'Foro: Empresa y sociedad', icon: 'file-lines', date: 'Hoy', dateStyle: 'today' },
  { title: 'Actividad: Caso práctico', icon: 'calendar-check', date: 'Mañana', dateStyle: 'tomorrow' },
  { title: 'Lectura: Teorías administrativas', icon: 'file-lines', date: 'Sáb, 7 nov', dateStyle: 'later' },
];

let selectedView = 'grid';

function courseCard(item, lessonId) {
  const attributes = `href="${lessonHref(item, lessonId)}" aria-label="Abrir ${escapeHTML(item.title)}, progreso ${item.progress} por ciento"`;
  return `<li><a class="course-card" ${attributes}>
    <img class="course-card__image" src="${item.images.overview}" alt="${escapeHTML(item.title)}" width="212" height="104" />
    <div class="course-card__content"><h3 class="course-title course-card__title">${escapeHTML(item.title)}</h3>
      <p class="course-progress-label">Progreso: <strong>${item.progress} %</strong></p>
      <progress class="course-progress course-card__progress" max="100" value="${item.progress}" aria-label="Progreso de demostración de ${escapeHTML(item.title)}">${item.progress}%</progress>
    </div><span class="course-card__action" aria-hidden="true">${icon('chevron-right')}</span>
  </a></li>`;
}

export function renderCourseHome(lastLessons) {
  return `<section class="welcome-banner" aria-labelledby="welcome-name">
    <picture><source media="(max-width: 767px)" srcset="${assetUrl('assets/welcome-campus-mobile.webp')}" /><img class="welcome-banner__photo" src="${assetUrl('assets/welcome-campus.webp')}" alt="Edificio y jardines de Ciudad Universitaria, UNAH" title="Fotografía: Thelmadatter · CC BY-SA 3.0" data-attribution-url="https://commons.wikimedia.org/wiki/File:UNAHEntrance_03.JPG" width="2560" height="674" /></picture>
    <div class="welcome-banner__content"><p class="welcome-banner__greeting">Bienvenido nuevamente</p><h1 id="welcome-name" class="welcome-banner__name">Joel Mencia</h1><p class="welcome-banner__description">Continúa con tus cursos, revisa tus actividades<br class="welcome-banner__desktop-break" /> y mantente al día con tu formación académica.</p></div>
  </section>
  <div class="course-home__content" aria-describedby="course-home-demo"><p id="course-home-demo" class="sr-only">Pantalla de demostración. Los cursos, porcentajes y fechas son datos de muestra.</p>
    <div class="course-home__toolbar"><h2 class="course-home__title" id="course-home-title">${icon('layer-group')}Mis cursos</h2>
      <div class="view-switch" role="group" aria-label="Visualización de cursos"><button class="view-switch__button" type="button" data-course-view="grid" aria-label="Vista de cuadrícula" aria-pressed="${selectedView === 'grid'}">${icon('table-cells-large')}</button><button class="view-switch__button" type="button" data-course-view="list" aria-label="Vista de lista" aria-pressed="${selectedView === 'list'}">${icon('list')}</button></div>
    </div>
    <div class="course-home__columns"><section class="course-home__courses" aria-labelledby="course-home-title"><ul class="course-collection" data-course-collection data-view="${selectedView}">${courses.map(item => courseCard(item, lastLessons[item.id] || item.initialLesson)).join('')}</ul></section>
      <aside class="upcoming-activities" aria-labelledby="upcoming-title"><header class="upcoming-activities__header">${icon('calendar', true)}<h2 id="upcoming-title">Próximas actividades</h2></header>
        <ul class="upcoming-activities__list">${demoActivities.map(activity => `<li class="upcoming-activities__item">${icon(activity.icon, true)}<div class="upcoming-activities__content"><h3>${escapeHTML(activity.title)}</h3><p>Administración</p></div><span class="date-badge date-badge--${activity.dateStyle}">${activity.date}</span></li>`).join('')}</ul>
        <button class="upcoming-activities__calendar" type="button" disabled aria-label="Ver calendario, no disponible en este prototipo">Ver calendario ${icon('arrow-right')}</button>
      </aside>
    </div>
  </div>`;
}

export function bindCourseHome(container) {
  const collection = container.querySelector('[data-course-collection]');
  const buttons = container.querySelectorAll('[data-course-view]');
  buttons.forEach(button => button.addEventListener('click', () => {
    selectedView = button.dataset.courseView;
    collection.dataset.view = selectedView;
    buttons.forEach(control => control.setAttribute('aria-pressed', String(control === button)));
  }));
}
