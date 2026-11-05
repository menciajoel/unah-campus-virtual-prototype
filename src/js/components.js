import { courseLessons, lessonHref, statusLabels } from './course.js';

export const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
export const icon = (name, regular = false) => `<i class="fa-${regular ? 'regular' : 'solid'} fa-${name}" aria-hidden="true"></i>`;

export function globalNavigation(home = false) {
  return `<a href="#/inicio" ${home ? 'aria-current="page"' : ''}>${icon('house')}<span>Inicio</span></a>
    <a href="#/cursos" ${!home ? 'aria-current="page"' : ''}>${icon('layer-group')}<span>Mis cursos</span></a>
    <button disabled aria-label="Calendario, no disponible en este prototipo">${icon('calendar', true)}<span>Calendario</span></button>
    <button disabled aria-label="Mensajes, no disponible en este prototipo">${icon('envelope', true)}<span>Mensajes</span></button>
    <button disabled aria-label="Notificaciones, no disponible en este prototipo">${icon('bell', true)}<span>Notificaciones</span><span class="notification-dot" aria-hidden="true"></span></button>`;
}

export function courseSummary(course, { showProgress = true, secondaryText = '' } = {}) {
  return `<span class="course-summary"><picture class="course-thumbnail"><source media="(max-width: 767px)" srcset="${course.images.mobile}"><img src="${course.images.desktop}" alt="${escapeHTML(course.images.alt)}" width="100" height="104" /></picture>
    <span class="course-information"><span class="course-title">${escapeHTML(course.title)}</span>${secondaryText ? `<span class="course-progress-label">${escapeHTML(secondaryText)}</span>` : ''}${showProgress ? `<span class="course-progress-label">Progreso: <strong>${course.progress} %</strong></span>
    <progress class="course-progress" aria-label="Progreso de demostración de ${escapeHTML(course.title)}" value="${course.progress}" max="100">${course.progress}%</progress>` : ''}</span></span>`;
}

export function statusIndicator(status) {
  return `<span class="status-indicator status-${status}" title="${statusLabels[status]}" aria-hidden="true">${status === 'complete' ? icon('check') : ''}</span>`;
}

export function drawerCourses(courses, lastLessons, currentCourseId, expanded) {
  const currentCourse = courses.find(course => course.id === currentCourseId);
  const orderedCourses = currentCourse ? [currentCourse, ...courses.filter(course => course !== currentCourse)] : courses;
  return orderedCourses.map(course => course.id !== currentCourseId
    ? `<a class="drawer-course-toggle drawer-course-access" data-course="${course.id}" href="${lessonHref(course, lastLessons[course.id] || course.initialLesson)}" aria-label="Ir al curso: ${escapeHTML(course.title)}">${courseSummary(course, { showProgress: false, secondaryText: 'Ir al curso' })}</a>`
    : `<details class="drawer-course" data-course="${course.id}" ${expanded ? 'open' : ''}>
    <summary class="drawer-course-toggle" aria-label="Curso actual: ${escapeHTML(course.title)}, unidades" aria-expanded="${expanded}" aria-controls="drawer-${course.id}-panel">${courseSummary(course)}${icon('chevron-right')}</summary>
    <div class="accordion-panel" id="drawer-${course.id}-panel"><nav class="unit-navigation" data-unit-navigation="drawer-${course.id}" data-course-id="${course.id}" aria-label="Unidades y clases de ${escapeHTML(course.title)}"></nav></div>
  </details>`).join('');
}

export function unitNavigation(course, currentId, prefix, openUnits) {
  return course.units.map(unit => `<details class="unit ${unit.lessons.some(lesson => lesson.id === currentId) ? 'unit-selected' : ''}" data-unit="${unit.id}" ${openUnits.has(unit.id) ? 'open' : ''}>
    <summary aria-controls="${prefix}-${unit.id}-lessons" aria-expanded="${openUnits.has(unit.id)}">${statusIndicator(unit.status)}<span>Unidad ${unit.number}</span>${icon('chevron-right')}</summary>
    <div class="accordion-panel" id="${prefix}-${unit.id}-lessons"><ol class="lesson-list">${unit.lessons.map(lesson => `<li><a href="${lessonHref(course, lesson.id)}" class="lesson-link" title="${escapeHTML(lesson.title)}" ${lesson.id === currentId ? 'aria-current="page"' : ''} aria-label="${lesson.number}. ${escapeHTML(lesson.title)}, ${statusLabels[lesson.status]}, demostración">${statusIndicator(lesson.status)}<span class="lesson-name">${lesson.number}. ${escapeHTML(lesson.title)}</span></a></li>`).join('')}</ol></div>
  </details>`).join('');
}

export function lessonPagination(course, lesson) {
  const lessons = courseLessons(course);
  const index = lessons.findIndex(item => item.id === lesson.id);
  const link = (target, next) => target ? `<a class="lesson-pagination-link ${next ? 'next' : ''}" href="${lessonHref(course, target.id)}" aria-label="${next ? 'Siguiente clase' : 'Clase anterior'}: ${escapeHTML(target.title)}, Unidad ${target.unit.number}">
    ${!next ? icon('chevron-left') : ''}<span><span class="pagination-label">${next ? 'Siguiente clase' : 'Clase anterior'}</span><strong>${escapeHTML(target.title)}</strong></span>${next ? icon('chevron-right') : ''}</a>` : `<span class="pagination-boundary" aria-disabled="true">${next ? 'Fin del curso de demostración' : 'Primera clase del curso'}</span>`;
  return `<nav class="lesson-pagination" aria-label="Navegación entre clases">${link(lessons[index - 1], false)}${link(lessons[index + 1], true)}</nav>`;
}
