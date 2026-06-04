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

  // ----- 団員登録フォーム（Google スプレッドシート連携） -----
  // ↓↓↓ GASのウェブアプリURL（末尾 /exec）。差し替えるのはこの1行だけ ↓↓↓
  const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwqXtxjYWIeWzTlbQU1uZoKPFddKm0zqwSPYIAbtRf7-qrJ2jpMgvcic05MUJqxU-IELA/exec';
  // ↑↑↑ 差し替えるのはこの1行だけ ↑↑↑

  const joinForm = document.getElementById('joinForm');
  if (joinForm) {
    const statusEl = document.getElementById('formStatus');
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = joinForm.querySelector('.form-submit');
      const original = btn.textContent;

      if (!GAS_ENDPOINT || GAS_ENDPOINT.indexOf('ここに') !== -1) {
        statusEl.className = 'form-status err';
        statusEl.textContent = '現在準備中です。少し待ってから、もう一度お試しください。';
        return;
      }

      btn.disabled = true;
      btn.textContent = '送信中…';
      statusEl.className = 'form-status';
      statusEl.textContent = '';

      const payload = new URLSearchParams(new FormData(joinForm));
      fetch(GAS_ENDPOINT, { method: 'POST', mode: 'no-cors', body: payload })
        .then(() => {
          joinForm.reset();
          statusEl.className = 'form-status ok';
          statusEl.textContent = '登録を受け付けました！新歓・イベントのお知らせをお送りします。👍';
        })
        .catch(() => {
          statusEl.className = 'form-status err';
          statusEl.textContent = '送信に失敗しました。時間をおいて、もう一度お試しください。';
        })
        .finally(() => {
          btn.disabled = false;
          btn.textContent = original;
        });
    });
  }
})();
