// Navbar: transparent over hero, solid when scrolled
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelector('i').className = 'fas fa-bars';
  });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navAnchors.forEach(a => {
      const active = a.getAttribute('href') === `#${id}`;
      a.style.color = (active && !a.classList.contains('nav-cta'))
        ? 'var(--gold)'
        : '';
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// Contact form — placeholder success state (swap for real backend/Formspree later)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.textContent;

  // Basic required-field check
  const required = contactForm.querySelectorAll('[required]');
  let valid = true;
  required.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#e74c3c';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });
  if (!valid) return;

  btn.textContent = 'Message Sent!';
  btn.disabled = true;
  btn.style.cssText = 'background:#2ecc71;border-color:#2ecc71;color:#fff;';

  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
    btn.style.cssText = '';
    contactForm.reset();
  }, 4000);
});

// Completed Projects carousel — advances one page (a 2x2 grid of 4) at a time
(function () {
  const track = document.getElementById('projTrack');
  const prevBtn = document.getElementById('projPrev');
  const nextBtn = document.getElementById('projNext');
  if (!track || !prevBtn || !nextBtn) return;

  const pages = track.querySelectorAll('.carousel-page');
  const lastPage = pages.length - 1;
  let page = 0;

  function render() {
    page = Math.max(0, Math.min(page, lastPage));
    track.style.transform = `translateX(-${page * 100}%)`;
    prevBtn.disabled = page <= 0;
    nextBtn.disabled = page >= lastPage;
  }

  nextBtn.addEventListener('click', () => { page++; render(); });
  prevBtn.addEventListener('click', () => { page--; render(); });

  render();
})();

// Gallery lightbox — click a Finished Interiors image to view it full-screen
(function () {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbClose = document.getElementById('lightboxClose');
  if (!lb || !lbImg || !lbClose) return;

  document.querySelectorAll('.gallery-item img').forEach((img) => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function close() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

// Contact form "Full Scope / Select All" toggles every service checkbox
(function () {
  const all = document.getElementById('serviceAll');
  if (!all) return;
  const items = document.querySelectorAll('.checkbox-grid input[name="service[]"]');

  all.addEventListener('change', () => {
    items.forEach((cb) => { cb.checked = all.checked; });
  });

  items.forEach((cb) => {
    cb.addEventListener('change', () => {
      all.checked = [...items].every((i) => i.checked);
    });
  });
})();
