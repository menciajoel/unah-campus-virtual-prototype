import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { courses, courseLessons, lessonHref } from '../src/js/course.js';

const output = fileURLToPath(new URL('../dist/client/', import.meta.url));
const page = new URL('https://pages.example/unah-campus-virtual-prototype/');
function checkAsset(reference, relativeTo = page) {
  const url = new URL(reference, relativeTo);
  assert.equal(url.origin, page.origin);
  assert.ok(url.pathname.startsWith(page.pathname), `Escapes repository base: ${reference}`);
  const local = path.join(output, decodeURIComponent(url.pathname.slice(page.pathname.length)));
  assert.ok(existsSync(local), `Missing built asset: ${reference}`);
}

test('HTML y CSS compilados resuelven sus recursos dentro de la subruta', () => {
  const html = readFileSync(path.join(output, 'index.html'), 'utf8');
  for (const [,ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (!ref.startsWith('#')) checkAsset(ref);
  }
  for (const file of readdirSync(path.join(output, 'assets')).filter(f => f.endsWith('.css'))) {
    const css = readFileSync(path.join(output, 'assets', file), 'utf8');
    for (const [,raw] of css.matchAll(/url\(([^)]+)\)/g)) {
      const ref = raw.replace(/^['"]|['"]$/g, '');
      if (!ref.startsWith('data:') && !ref.startsWith('#')) checkAsset(ref, new URL(`assets/${file}`, page));
    }
  }
  assert.ok(existsSync(path.join(output, '.nojekyll')));
});

test('imágenes, video, subtítulos, hash routes y ZIP conservan la base del repositorio', () => {
  for (const course of courses) {
    for (const field of ['desktop', 'mobile', 'overview']) checkAsset(course.images[field]);
    for (const lesson of courseLessons(course)) {
      for (const field of ['poster', 'src', 'captions']) checkAsset(lesson.resources.video[field]);
      const route = new URL(lessonHref(course, lesson.id), page);
      assert.equal(route.pathname, page.pathname);
    }
  }
  for (const name of ['welcome-campus.webp', 'welcome-campus-mobile.webp']) checkAsset(`./assets/${name}`);
  checkAsset('./downloads/UNAH-Campus-Virtual-Design-Handoff.zip');
  checkAsset('./downloads/UNAH-Campus-Virtual-Design-Handoff.zip.sha256');
  for (const file of readdirSync(path.join(output, 'assets')).filter(f => f.endsWith('.js'))) {
    const code = readFileSync(path.join(output, 'assets', file), 'utf8');
    assert.ok(!/["'`]\/assets\//.test(code), 'Dynamic asset path is rooted at the host');
    assert.ok(!/file:\/\/|\/Users\/[\w.-]+\//.test(code), 'Workstation path in build');
  }
});
