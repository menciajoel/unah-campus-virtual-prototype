// Shared native-details controller. CSS animates numeric heights; auto is only a resting state.
const controllers = new WeakMap();
const moving = new Set();
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
reducedMotion.addEventListener('change', event => {
  if (event.matches) moving.forEach(controller => controller.settle());
});

export function setAccordionOpen(details, open, options) {
  controllers.get(details)?.setOpen(open, options);
}

export function destroyAccordions(container) {
  container.querySelectorAll('details').forEach(details => controllers.get(details)?.destroy());
}

export function setupAccordions(container, { selector, exclusive = false, onChange } = {}) {
  const group = [];
  container.querySelectorAll(selector).forEach(details => {
    const summary = details.querySelector(':scope > summary');
    const panel = details.querySelector(':scope > .accordion-panel');
    if (!summary || !panel) return;
    let open = details.open;
    let targetHeight = 0;
    let animating = false;
    const sync = () => {
      summary.setAttribute('aria-expanded', String(open));
      panel.inert = !open;
      panel.setAttribute('aria-hidden', String(!open));
    };
    const settle = () => {
      animating = false;
      moving.delete(controller);
      details.removeAttribute('data-animating');
      panel.style.transition = 'none';
      panel.style.height = open ? 'auto' : '0px';
      panel.style.opacity = open ? '1' : '0';
      details.open = open;
      panel.getBoundingClientRect();
      panel.style.removeProperty('transition');
    };
    const setOpen = (next, { animate = true, notify = true } = {}) => {
      if (next === open) return;
      if (next && exclusive) group.forEach(peer => { if (peer !== controller) peer.setOpen(false); });
      const height = panel.getBoundingClientRect().height;
      const opacity = getComputedStyle(panel).opacity;
      open = next;
      if (!open && panel.contains(document.activeElement)) summary.focus({ preventScroll: true });
      sync();
      if (!open) panel.querySelectorAll('video').forEach(video => video.pause());
      // Keep native content rendered until collapse ends; inert prevents focus immediately.
      details.open = true;
      panel.style.transition = 'none';
      panel.style.height = 'auto';
      targetHeight = open ? panel.getBoundingClientRect().height : 0;
      panel.style.height = `${height}px`;
      panel.style.opacity = opacity;
      panel.getBoundingClientRect();
      panel.style.removeProperty('transition');
      if (!animate || reducedMotion.matches || Math.abs(height - targetHeight) < .5) {
        settle();
      } else {
        animating = true;
        moving.add(controller);
        details.setAttribute('data-animating', '');
        panel.style.height = `${targetHeight}px`;
        panel.style.opacity = open ? '1' : '0';
      }
      if (notify) onChange?.(details, open);
    };
    const click = event => {
      if (event.target.closest('a, button, input, select, textarea')) return;
      event.preventDefault();
      setOpen(!open);
    };
    const end = event => {
      if (event.target === panel && event.propertyName === 'height'
        && Math.abs(panel.getBoundingClientRect().height - targetHeight) < 1) settle();
    };
    // Accommodate wrapping, image loading and orientation changes during a transition.
    const resize = new ResizeObserver(() => {
      if (!details.isConnected) return;
      if (open && animating) {
        const child = panel.firstElementChild;
        const style = getComputedStyle(child);
        targetHeight = child.getBoundingClientRect().height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        panel.style.height = `${targetHeight}px`;
      }
    });
    const controller = { setOpen, settle, destroy() {
      moving.delete(controller);
      resize.disconnect();
      summary.removeEventListener('click', click);
      panel.removeEventListener('transitionend', end);
      controllers.delete(details);
    } };
    controllers.set(details, controller);
    group.push(controller);
    sync();
    panel.style.height = open ? 'auto' : '0px';
    panel.style.opacity = open ? '1' : '0';
    summary.addEventListener('click', click);
    panel.addEventListener('transitionend', end);
    resize.observe(panel.firstElementChild);
  });
}
