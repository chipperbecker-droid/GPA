const menuButton = document.querySelector('[data-menu-button]');
const siteNav = document.querySelector('[data-site-nav]');

if (menuButton && siteNav) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    siteNav.removeAttribute('data-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    if (isOpen) siteNav.removeAttribute('data-open');
    else siteNav.setAttribute('data-open', '');
  });

  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 960) closeMenu();
  });
}

const currentYear = new Date().getFullYear();

document.querySelectorAll('[data-current-year]').forEach((year) => {
  year.textContent = String(currentYear);
});

document.querySelectorAll('[data-years-since]').forEach((element) => {
  const startYear = Number(element.getAttribute('data-years-since'));
  if (Number.isFinite(startYear)) {
    element.textContent = `${Math.max(0, currentYear - startYear)}+`;
  }
});
