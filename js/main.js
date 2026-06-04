// Active nav link
function setActiveNav() {
  let page = window.location.pathname.split('/').pop() || 'index.html';
  if (!page.includes('.')) page += '.html';
  document.querySelectorAll('nav ul li a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page) {
      a.classList.add('active');
      const parentLi = a.closest('.has-dropdown');
      if (parentLi) {
        const topLink = parentLi.querySelector(':scope > a');
        if (topLink) topLink.classList.add('active');
      }
    }
  });
}

// Sticky header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;
  // Fire immediately on load (handles browser back-navigation scroll restore)
  header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// Scroll reveal — CSS-class based approach
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.card, .fact-item, .pkg-card, .step, .ql-card, .cat-chip, .contact-card, .strip-item').forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
    obs.observe(el);
  });
}

// Mobile nav toggle + dropdown touch support
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navUl = document.querySelector('nav ul');
  if (!toggle || !navUl) return;
  toggle.addEventListener('click', () => {
    navUl.classList.toggle('open');
    toggle.classList.toggle('open');
  });

  document.querySelectorAll('.has-dropdown > a').forEach(a => {
    a.addEventListener('click', e => {
      if (window.innerWidth > 768) return;
      e.preventDefault();
      const li = a.closest('.has-dropdown');
      const wasOpen = li.classList.contains('mobile-open');
      document.querySelectorAll('.has-dropdown').forEach(el => el.classList.remove('mobile-open'));
      if (!wasOpen) li.classList.add('mobile-open');
    });
  });
}

// Countdown timer
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const target = new Date('2027-05-14T08:00:00+03:00');
  function update() {
    const diff = target - new Date();
    if (diff <= 0) {
      const liveDiv = document.createElement('div');
      liveDiv.style.cssText = 'font-size:1.2rem;font-weight:700;color:var(--cyan);letter-spacing:0.2em;text-transform:uppercase;';
      liveDiv.textContent = 'Tournament is Live!';
      el.replaceChildren(liveDiv);
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').textContent  = String(d).padStart(3,'0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-mins').textContent  = String(m).padStart(2,'0');
    document.getElementById('cd-secs').textContent  = String(s).padStart(2,'0');
  }
  update(); setInterval(update, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initMobileNav();
  initCountdown();
  initScrollReveal();
  initHeaderScroll();
});
