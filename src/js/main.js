import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';
import '../css/tokens.css';
import '../css/base.css';
import '../css/layout.css';
import '../css/components.css';
import '../css/responsive.css';
import '../css/design-handoff.css';
import { courses, defaultCourse, findCourse, findLesson, lessonHref } from './course.js';
import { escapeHTML, icon, globalNavigation, courseSummary, drawerCourses, unitNavigation, lessonPagination } from './components.js';
import { renderResources, bindResources } from './resources.js';
import { setupDrawer } from './navigation.js';
import { setupDesignHandoff } from './design-handoff.js';
import { setupAccordions, setAccordionOpen, destroyAccordions } from './accordion.js';
import { renderCourseHome, bindCourseHome } from './overview.js';

const main = document.querySelector('main');
const lastLessons = Object.fromEntries(courses.map(course => [course.id, course.initialLesson]));
const expandedUnits = new Map(courses.map(course => [course.id, new Set([findLesson(course, course.initialLesson).unit.id])]));
let activeCourse = defaultCourse;
const expandedDrawerCourses = new Set();

function renderCourseSurfaces(currentCourseId) {
  document.querySelector('[data-course-summary="desktop"]').innerHTML = courseSummary(activeCourse);
  document.querySelector('[data-unit-navigation="desktop"]').dataset.courseId = activeCourse.id;
  const drawer = document.querySelector('#drawer-courses');
  destroyAccordions(drawer);
  drawer.innerHTML = drawerCourses(courses, lastLessons, currentCourseId, expandedDrawerCourses.has(currentCourseId));
  setupAccordions(drawer, { selector: ':scope > .drawer-course', onChange(details, open) {
    if (open) expandedDrawerCourses.add(details.dataset.course);
    else expandedDrawerCourses.delete(details.dataset.course);
  } });
}

function renderUnitNavigation() {
  document.querySelectorAll('[data-unit-navigation]').forEach(nav => {
    const course = findCourse(nav.dataset.courseId);
    const openUnits = expandedUnits.get(course.id);
    destroyAccordions(nav);
    nav.innerHTML = unitNavigation(course, lastLessons[course.id], nav.dataset.unitNavigation, openUnits);
    setupAccordions(nav, { selector: '.unit', onChange(details, open) {
      if (!details.isConnected) return;
      const id = details.dataset.unit;
      if (open) openUnits.add(id); else openUnits.delete(id);
      document.querySelectorAll(`[data-unit-navigation][data-course-id="${course.id}"] [data-unit="${id}"]`).forEach(peer => {
        if (peer !== details) setAccordionOpen(peer, open, { animate: false, notify: false });
      });
    } });
  });
}

function activity(lesson) {
  return `<section class="activity" aria-labelledby="activity-title">${icon('clipboard', true)}<div class="activity-copy"><h2 id="activity-title">Actividad</h2><p>${escapeHTML(lesson.activity.title)}</p></div><p class="activity-date">${icon('calendar', true)}<span>Entrega: ${escapeHTML(lesson.activity.dueLabel)}</span></p><button class="primary-button" id="activity-open">Realizar actividad ${icon('chevron-right')}</button></section>`;
}

function renderLesson(course, lesson) {
  const originalBanner = course.id === defaultCourse.id && lesson.unit.number === 2;
  main.innerHTML = `<div class="mobile-academic-summary"><a class="back-link" href="#/cursos">${icon('chevron-left')}Mis cursos</a><section class="mobile-course-summary" aria-label="Resumen de ${escapeHTML(course.title)}">${courseSummary(course)}</section></div>
    <section class="unit-banner ${originalBanner ? 'unit-banner-original' : 'unit-banner-demo'}" aria-label="Unidad ${lesson.unit.number}: ${escapeHTML(lesson.unit.title)}">${originalBanner ? '<span class="sr-only">Unidad 2 · Proceso Administrativo</span>' : `<div><span>Unidad ${lesson.unit.number}</span><h2>${escapeHTML(lesson.unit.title)}</h2><p>Contenido de demostración</p></div>`}</section>
    <div class="lesson-content"><header class="lesson-heading"><p class="eyebrow">Clase ${lesson.number} de ${lesson.unit.lessons.length}</p><h1>${escapeHTML(lesson.title)}</h1><p class="lesson-description">${escapeHTML(lesson.description)}</p></header>
    ${renderResources(course, lesson)}${activity(lesson)}${lessonPagination(course, lesson)}</div>`;
  bindResources(main, lesson);
  main.querySelector('#activity-open').addEventListener('click', () => {
    document.querySelectorAll('video').forEach(video => video.pause());
    document.querySelector('#activity-dialog-content').innerHTML = `<h3>${escapeHTML(lesson.activity.title)}</h3><p>Vista de demostración de la actividad de ${escapeHTML(lesson.title)}.</p><p>Este prototipo permite revisar el acceso a una actividad. No registra entregas, respuestas ni calificaciones y no está conectado con Moodle.</p><p class="activity-demo-date">La fecha mostrada en la clase también es un dato de muestra.</p>`;
    document.querySelector('#activity-dialog').showModal();
  });
  renderUnitNavigation();
  document.title = `${lesson.title} · ${course.title} · Campus Virtual UNAH`;
}

function renderOverview(home) {
  main.innerHTML = renderCourseHome(lastLessons);
  bindCourseHome(main);
  renderUnitNavigation();
  document.title = `${home ? 'Inicio' : 'Mis cursos'} · Campus Virtual UNAH`;
}

function resolveRoute() {
  const hash = location.hash || lessonHref(defaultCourse, defaultCourse.initialLesson);
  if (hash === '#/inicio' || hash === '#/cursos') return { overview: true, home: hash === '#/inicio' };
  const parts = hash.split('/');
  const explicitCourse = findCourse(parts[2]);
  const legacyAdministration = !explicitCourse && /^u\d+-c\d+$/.test(parts[2] || '');
  if (parts[1] !== 'curso' || (!explicitCourse && !legacyAdministration)) {
    history.replaceState(null, '', '#/cursos');
    return { overview: true, home: false };
  }
  const course = explicitCourse || defaultCourse;
  const lessonId = explicitCourse ? parts[3] : parts[2];
  const lesson = findLesson(course, lessonId) || findLesson(course, course.initialLesson);
  if (lesson.id !== lessonId) history.replaceState(null, '', lessonHref(course, lesson.id));
  return { overview: false, course, lesson };
}

function route(focus = false) {
  const state = resolveRoute();
  document.querySelectorAll('video').forEach(video => video.pause());
  destroyAccordions(main);
  const activityDialog = document.querySelector('#activity-dialog');
  if (activityDialog.open) activityDialog.close();
  document.querySelector('#activity-dialog-content').replaceChildren();
  document.querySelectorAll('[data-global-nav]').forEach(nav => { nav.innerHTML = globalNavigation(state.home); });
  document.querySelector('.campus-shell').classList.toggle('show-overview', state.overview);
  main.classList.toggle('course-home', state.overview);
  if (!state.overview) {
    activeCourse = state.course;
    lastLessons[activeCourse.id] = state.lesson.id;
    expandedUnits.get(activeCourse.id).add(state.lesson.unit.id);
  }
  renderCourseSurfaces(state.overview ? null : activeCourse.id);
  if (state.overview) renderOverview(state.home); else renderLesson(activeCourse, state.lesson);
  main.scrollTo({ top: 0, behavior: 'instant' });
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (focus) main.focus({ preventScroll: true });
  document.querySelector('#announcer').textContent = state.overview ? (state.home ? 'Inicio' : 'Mis cursos') : `${activeCourse.title}, unidad ${state.lesson.unit.number}, clase ${state.lesson.number}: ${state.lesson.title}`;
}

document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
  main.scrollIntoView({ block: 'start' });
});
setupDrawer();
setupDesignHandoff();
window.addEventListener('hashchange', () => route(true));
route();
