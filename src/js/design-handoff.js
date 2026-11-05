import { assetUrl } from './assets.js';
import { icon } from './components.js';

export function setupDesignHandoff() {
  if (document.querySelector('#design-handoff')) return;
  const component = document.createElement('aside');
  component.id = 'design-handoff';
  component.className = 'design-handoff';
  component.setAttribute('aria-label', 'Documentación del prototipo');
  component.innerHTML = `<span class="design-handoff__label" id="design-handoff-label">Prototipo UX/UI</span>
    <a class="design-handoff__download" href="${assetUrl('downloads/UNAH-Campus-Virtual-Design-Handoff.zip')}" download="UNAH-Campus-Virtual-Design-Handoff.zip" aria-describedby="design-handoff-label">${icon('download')}<span>Descargar especificaciones de diseño</span></a>`;
  document.body.append(component);
}
