import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { courses, defaultCourse, courseLessons, lessonHref } from '../src/js/course.js';
import { drawerCourses, unitNavigation } from '../src/js/components.js';

const lastLessons = Object.fromEntries(courses.map(course => [course.id, course.initialLesson]));
const matches = (html, expression) => [...html.matchAll(expression)];

test('los tres cursos tienen recursos completos y rutas aisladas', () => {
  assert.deepEqual(courses.map(c => c.progress), [65, 42, 78]);
  const routes = new Set();
  for (const course of courses) {
    assert.equal(course.demonstration, true);
    assert.equal(course.units.length, 4);
    assert.equal(courseLessons(course).length, 16);
    for (const image of ['desktop', 'mobile', 'overview']) assert.ok(existsSync(new URL(`../public/${course.images[image].replace(/^\.\//, '')}`, import.meta.url)));
    for (const lesson of courseLessons(course)) {
      routes.add(lessonHref(course, lesson.id));
      assert.ok(lesson.resources.presentation.slides.length > 1);
      assert.ok(lesson.resources.reading.title);
      assert.ok(lesson.resources.video.title);
      for (const field of ['src', 'poster', 'captions']) assert.ok(existsSync(new URL(`../public/${lesson.resources.video[field].replace(/^\.\//, '')}`, import.meta.url)));
      assert.match(lesson.activity.dueDate, /^2026-\d{2}-\d{2}$/);
      assert.equal(lesson.activity.demonstration, true);
    }
  }
  assert.equal(routes.size, 48, 'ninguna ruta debe resolver a otra asignatura');
});

test('Administración conserva el contenido y los estados anteriores al catálogo compartido', () => {
  const before = JSON.parse(readFileSync(new URL('./fixtures/administration.json', import.meta.url)));
  const c = defaultCourse;
  const after = { title: c.title, progress: c.progress, initialLesson: c.initialLesson,
    units: c.units.map(u => ({ id: u.id, number: u.number, title: u.title, status: u.status,
      lessons: u.lessons.map(l => ({ id: l.id, number: l.number, title: l.title, status: l.status,
        description: l.description, videoTitle: l.resources.video.title, videoDescription: l.resources.video.description, activity: l.activity.title })) })) };
  assert.deepEqual(after, before);
  assert.equal(lessonHref(c, c.initialLesson), '#/curso/u2-c3');
});

test('el menú muestra primero el curso actual y solo este tiene progreso y desplegable', () => {
  for (const course of courses) {
    const html = drawerCourses(courses, lastLessons, course.id, false);
    assert.ok(html.startsWith(`<details class="drawer-course" data-course="${course.id}"`));
    assert.equal(matches(html, /<details\b/g).length, 1);
    assert.equal(matches(html, /<progress\b/g).length, 1);
    assert.ok(html.includes(`value="${course.progress}"`));
    assert.equal(matches(html, /class="drawer-course-toggle drawer-course-access"/g).length, 2);
    assert.equal(matches(html, />Ir al curso<\/span>/g).length, 2);
    for (const other of courses.filter(c => c.id !== course.id)) {
      assert.ok(html.includes(`href="${lessonHref(other, other.initialLesson)}"`));
      assert.ok(!html.includes(`drawer-${other.id}-panel`));
    }
    const nav = unitNavigation(course, course.initialLesson, `drawer-${course.id}`, new Set(['u1']));
    assert.equal(matches(nav, /class="lesson-link"/g).length, 16);
    assert.equal(new Set(matches(nav, /id="([^"]+)"/g).map(m => m[1])).size, 4);
  }
  const home = drawerCourses(courses, lastLessons, null, false);
  assert.equal(matches(home, /<details\b|<progress\b/g).length, 0);
  assert.equal(matches(home, />Ir al curso<\/span>/g).length, 3);
});
