// NAV SCROLL EFFECT
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// MOBILE NAV
function openMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

reveals.forEach((item) => observer.observe(item));

// GALLERY LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxMeta = document.getElementById('lightboxMeta');

function openLightbox(card) {
  const image = card.querySelector('img');
  const title = card.querySelector('strong');
  const meta = card.querySelector('small');

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxTitle.textContent = title ? title.textContent : '';
  lightboxMeta.textContent = meta ? meta.textContent : '';

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeLightbox(event) {
  if (
    event.target === lightbox ||
    event.target.classList.contains('lightbox-close')
  ) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }
}

// ESC closes overlays
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (lightbox.classList.contains('open')) {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    }

    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  }
});


// GALLERY FILTERS
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.full-gallery-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    galleryItems.forEach((item) => {
      const shouldShow = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !shouldShow);
    });
  });
});
