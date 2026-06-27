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

if (!document.querySelector('.mobile-contact-actions')) {
  const mobileContactActions = document.createElement('nav');
  mobileContactActions.className = 'mobile-contact-actions';
  mobileContactActions.setAttribute('aria-label', 'Quick contact');
  mobileContactActions.innerHTML = `
    <a class="mobile-contact-action" href="tel:+18436816588" aria-label="Call Gary Penrod and Associates">
      <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92Z"/></svg>
      <span>Call</span>
    </a>
    <a class="mobile-contact-action" href="mailto:gary@garypenrod.com" aria-label="Email Gary Penrod and Associates">
      <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="m22 6-10 7L2 6"/></svg>
      <span>Email</span>
    </a>
  `;
  document.body.append(mobileContactActions);
}

document.querySelectorAll('.testimonial-carousel').forEach((carousel) => {
  const track = carousel.querySelector('[data-testimonial-track]');
  const viewport = carousel.querySelector('.testimonial-viewport');
  const cards = track ? [...track.querySelectorAll('.testimonial-card')] : [];
  const dotsContainer = carousel.querySelector('[data-testimonial-dots]');
  const counter = carousel.querySelector('[data-testimonial-counter]');
  const previous = carousel.querySelector('[data-testimonial-prev]');
  const next = carousel.querySelector('[data-testimonial-next]');

  if (!track || !viewport || !cards.length || !dotsContainer || !counter || !previous || !next) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeCard = 0;
  let activePage = 0;
  let pageCount = 1;
  let cardsPerPage = 3;
  let maxCard = 0;
  let offset = 0;
  let rotation;
  let wheelTimer;
  let pointerId;
  let dragStartX = 0;
  let dragStartOffset = 0;
  let lastPointerX = 0;
  let lastPointerTime = 0;
  let dragVelocity = 0;
  let isDragging = false;

  const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);
  const getCardsPerPage = () => {
    if (window.innerWidth <= 720) return 1;
    if (window.innerWidth <= 1050) return 2;
    return 3;
  };
  const getCardStep = () => (cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : viewport.clientWidth);
  const getMaxOffset = () => maxCard * getCardStep();

  const renderOffset = (value, animate = true) => {
    const nextOffset = clamp(value, 0, getMaxOffset());
    if (animate && !reduceMotion) {
      track.classList.remove('is-dragging');
      track.getBoundingClientRect();
    } else {
      track.classList.add('is-dragging');
    }
    offset = nextOffset;
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
  };

  const updateControls = () => {
    activePage = Math.min(Math.floor(activeCard / cardsPerPage), pageCount - 1);
    counter.textContent = `${activePage + 1} / ${pageCount}`;
    [...dotsContainer.children].forEach((dot, dotIndex) => {
      const isActive = dotIndex === activePage;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const goToCard = (index, animate = true) => {
    activeCard = clamp(Math.round(index), 0, maxCard);
    updateControls();
    renderOffset(activeCard * getCardStep(), animate);
  };

  const goToLoopedCard = (index, animate = true) => {
    if (index > maxCard) goToCard(0, animate);
    else if (index < 0) goToCard(maxCard, animate);
    else goToCard(index, animate);
  };

  const showPage = (index) => {
    goToCard(index * cardsPerPage);
  };

  const settleCarousel = (projectedOffset = offset) => {
    goToCard(Math.round(clamp(projectedOffset, 0, getMaxOffset()) / getCardStep()));
  };

  const startRotation = () => {
    if (reduceMotion) return;
    window.clearInterval(rotation);
    rotation = window.setInterval(() => {
      goToLoopedCard(activeCard + cardsPerPage);
    }, 7000);
  };

  const endDrag = (event, canceled = false) => {
    if (!isDragging) return;
    if (event?.pointerId !== undefined && event.pointerId !== pointerId) return;
    const releasedPointerId = pointerId;
    isDragging = false;
    pointerId = undefined;
    track.classList.remove('is-dragging');
    if (releasedPointerId !== undefined && viewport.hasPointerCapture?.(releasedPointerId)) {
      viewport.releasePointerCapture(releasedPointerId);
    }
    settleCarousel(canceled ? offset : offset + dragVelocity * 180);
    startRotation();
  };

  const cancelDrag = (event) => endDrag(event, true);
  const handleWindowBlur = () => endDrag(undefined, true);
  const removeDragFallbacks = () => {
    window.removeEventListener('pointerup', endDrag);
    window.removeEventListener('pointercancel', cancelDrag);
    window.removeEventListener('mouseup', endDrag);
    window.removeEventListener('touchend', endDrag);
    window.removeEventListener('touchcancel', cancelDrag);
    window.removeEventListener('blur', handleWindowBlur);
  };

  const buildDots = () => {
    cardsPerPage = getCardsPerPage();
    maxCard = Math.max(0, cards.length - cardsPerPage);
    pageCount = Math.ceil((maxCard + 1) / cardsPerPage);
    activeCard = clamp(activeCard, 0, maxCard);
    dotsContainer.replaceChildren();
    for (let index = 0; index < pageCount; index += 1) {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show client comment group ${index + 1} of ${pageCount}`);
      dot.addEventListener('click', () => {
        showPage(index);
        startRotation();
      });
      dotsContainer.append(dot);
    }
    updateControls();
    renderOffset(activeCard * getCardStep(), false);
    track.getBoundingClientRect();
    track.classList.remove('is-dragging');
  };

  previous.addEventListener('click', () => {
    goToLoopedCard(activeCard - 1);
    startRotation();
  });
  next.addEventListener('click', () => {
    goToLoopedCard(activeCard + 1);
    startRotation();
  });
  carousel.addEventListener('mouseenter', () => window.clearInterval(rotation));
  carousel.addEventListener('mouseleave', startRotation);
  carousel.addEventListener('focusin', () => window.clearInterval(rotation));
  carousel.addEventListener('focusout', startRotation);
  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (event.pointerType === 'mouse') event.preventDefault();
    pointerId = event.pointerId;
    isDragging = true;
    dragStartX = event.clientX;
    dragStartOffset = offset;
    lastPointerX = event.clientX;
    lastPointerTime = event.timeStamp;
    dragVelocity = 0;
    track.classList.add('is-dragging');
    viewport.setPointerCapture?.(event.pointerId);
    window.clearInterval(rotation);
  });
  viewport.addEventListener('pointermove', (event) => {
    if (!isDragging || event.pointerId !== pointerId) return;
    const elapsed = Math.max(event.timeStamp - lastPointerTime, 1);
    dragVelocity = (lastPointerX - event.clientX) / elapsed;
    lastPointerX = event.clientX;
    lastPointerTime = event.timeStamp;
    renderOffset(dragStartOffset + dragStartX - event.clientX, false);
  });
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', cancelDrag);
  viewport.addEventListener('lostpointercapture', endDrag);
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', cancelDrag);
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchend', endDrag);
  window.addEventListener('touchcancel', cancelDrag);
  window.addEventListener('blur', handleWindowBlur);
  window.addEventListener('pagehide', removeDragFallbacks, { once: true });
  viewport.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    event.preventDefault();
    event.stopPropagation();
    window.clearInterval(rotation);
    renderOffset(offset + event.deltaX, false);
    window.clearTimeout(wheelTimer);
    wheelTimer = window.setTimeout(() => {
      settleCarousel();
      startRotation();
    }, 120);
  }, { passive: false });

  window.addEventListener('resize', buildDots);
  buildDots();
  startRotation();
});
