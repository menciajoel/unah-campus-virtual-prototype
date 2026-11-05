import { setupAccordions } from './accordion.js';
import { escapeHTML, icon } from './components.js';

function videoPreview(lesson) {
  const video = lesson.resources.video;
  return `<button class="video-preview" aria-label="Reproducir video de demostración: ${escapeHTML(lesson.title)}"><img src="${escapeHTML(video.poster)}" alt="${escapeHTML(video.posterAlt)}" width="1280" height="720" /><span class="video-demo-badge">Demostración</span><span class="video-play" aria-hidden="true">${icon('play')}</span><span class="video-preview-duration" aria-hidden="true">${escapeHTML(video.duration)}</span></button>`;
}

export function renderResources(course, lesson) {
  return `<section class="resources" aria-label="Materiales académicos">
    <details class="resource" data-resource="presentation"><summary id="presentation-summary" aria-expanded="false" aria-controls="presentation-panel">${icon('circle-play', true)}<span><strong>Presentación</strong><span class="resource-subtitle">${escapeHTML(lesson.resources.presentation.title)}</span></span>${icon('chevron-right')}</summary>
      <div class="accordion-panel" id="presentation-panel" role="region" aria-labelledby="presentation-summary"><div class="resource-body presentation-demo"><span class="demo-label">Presentación de demostración</span><div class="demo-slide" aria-live="polite"><p class="eyebrow">${escapeHTML(course.title)} · Unidad ${lesson.unit.number}</p><h3>${escapeHTML(lesson.title)}</h3><p data-slide-copy>${escapeHTML(lesson.resources.presentation.slides[0])}</p></div><div class="slide-controls"><button class="text-button" data-slide="previous" aria-label="Diapositiva anterior" disabled>${icon('chevron-left')}</button><span data-slide-counter>1 / ${lesson.resources.presentation.slides.length}</span><button class="text-button" data-slide="next" aria-label="Diapositiva siguiente">${icon('chevron-right')}</button></div></div></div>
    </details>
    <details class="resource" data-resource="reading"><summary id="reading-summary" aria-expanded="false" aria-controls="reading-panel">${icon('file-lines', true)}<span><strong>Lectura</strong><span class="resource-subtitle">${escapeHTML(lesson.resources.reading.title)}</span></span>${icon('chevron-right')}</summary>
      <div class="accordion-panel" id="reading-panel" role="region" aria-labelledby="reading-summary"><div class="resource-body reading-demo"><span class="demo-label">Lectura de demostración</span><h3>${escapeHTML(lesson.title)}</h3><p>Este texto es una muestra local para revisar el comportamiento del recurso de lectura. No es una lectura oficial de la asignatura.</p><p>En una integración futura, este espacio mostrará el material académico autorizado para la clase seleccionada.</p></div></div>
    </details>
    <details class="resource video-resource" data-resource="video" open><summary id="video-summary" aria-expanded="true" aria-controls="video-panel">${icon('circle-play', true)}<span><strong>Video</strong></span>${icon('chevron-right')}</summary>
      <div class="accordion-panel" id="video-panel" role="region" aria-labelledby="video-summary"><div class="resource-body video-layout"><figure class="video-figure"><div class="video-frame">${videoPreview(lesson)}</div><figcaption>Video demostrativo · ${escapeHTML(lesson.resources.video.duration)} · sin audio.</figcaption></figure>
      <div class="video-metadata"><h3>${escapeHTML(lesson.resources.video.title)}</h3><p>${escapeHTML(lesson.resources.video.description)}</p><span class="video-duration">${icon('clock', true)}<span>Duración de muestra: <strong>${escapeHTML(lesson.resources.video.duration)}</strong></span></span></div></div></div>
    </details>
  </section>`;
}

export function bindResources(container, lesson) {
  const copies = lesson.resources.presentation.slides;
  const resource = lesson.resources.video;
  let slide = 0;
  container.querySelectorAll('[data-slide]').forEach(button => button.addEventListener('click', () => {
    slide += button.dataset.slide === 'next' ? 1 : -1;
    container.querySelector('[data-slide-copy]').textContent = copies[slide];
    container.querySelector('[data-slide-counter]').textContent = `${slide + 1} / ${copies.length}`;
    container.querySelector('[data-slide="previous"]').disabled = slide === 0;
    container.querySelector('[data-slide="next"]').disabled = slide === copies.length - 1;
  }));
  const frame = container.querySelector('.video-frame');
  frame.addEventListener('click', event => {
    if (!event.target.closest('.video-preview')) return;
    const video = document.createElement('video');
    video.controls = true;
    video.tabIndex = 0;
    video.playsInline = true;
    video.preload = 'metadata';
    video.poster = resource.poster;
    video.setAttribute('aria-label', 'Video de demostración de doce segundos, sin audio');
    const source = document.createElement('source');
    source.src = resource.src;
    source.type = 'video/mp4';
    const captions = document.createElement('track');
    captions.kind = 'captions';
    captions.src = resource.captions;
    captions.srclang = 'es';
    captions.label = 'Español';
    captions.default = true;
    video.append(source, captions);
    video.addEventListener('ended', () => {
      const restoreFocus = document.activeElement === video;
      frame.innerHTML = videoPreview(lesson);
      if (restoreFocus) frame.querySelector('button').focus({ preventScroll: true });
    }, { once: true });
    video.addEventListener('error', () => {
      frame.innerHTML = `<p class="video-error" role="alert">No se pudo cargar el video de demostración. <a href="${escapeHTML(resource.src)}">Abrir el archivo de muestra</a>.</p>`;
    }, { once: true });
    frame.replaceChildren(video);
    video.focus();
    // Playback only follows an explicit user action. Never mark a lesson complete.
    video.play().catch(() => { /* Native controls remain available if playback is blocked. */ });
  });
  setupAccordions(container, { selector: '.resource', exclusive: true });
}
