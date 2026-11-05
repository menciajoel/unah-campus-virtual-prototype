export function setupDrawer() {
  const dialog = document.querySelector('#mobile-menu');
  const toggle = document.querySelector('#menu-toggle');
  const close = () => dialog.close();
  toggle.addEventListener('click', () => {
    document.querySelectorAll('video').forEach(video => video.pause());
    dialog.showModal();
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
  });
  document.querySelector('#menu-close').addEventListener('click', close);
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX > box.right || event.clientY > box.bottom || event.clientY < box.top)) close();
    if (event.target.closest('a')) close();
  });
  dialog.addEventListener('close', () => {
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
  });
  matchMedia('(min-width: 1200px)').addEventListener('change', event => {
    if (event.matches && dialog.open) close();
  });
}
