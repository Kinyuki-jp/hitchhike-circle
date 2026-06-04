// =====================================================
// HITCHHIKE - 近畿大学ヒッチハイクサークル
// =====================================================

(function () {
  'use strict';

  // ----- Header shadow on scroll -----
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Mobile nav toggle -----
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  // ----- Scroll reveal -----
  const revealEls = document.querySelectorAll(
    '.section-title, .section-lead, .about-text > *, .about-image, ' +
    '.rule-card, .activity-card, .stat-card, .flow-timeline li, ' +
    '.voice-card, .join-info, .join-cta, .faq-item, .slogan-text'
  );
  revealEls.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));

  // ----- Stat bars animate when section enters viewport -----
  const statCards = document.querySelectorAll('.stat-card');
  const statIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          statIo.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  statCards.forEach((s) => statIo.observe(s));

  // ----- Smooth scroll offset for fixed header -----
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = header.getBoundingClientRect().height;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
