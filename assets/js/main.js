/* ═══════════════════════════════════════════════════════════
   Nyxelium — "Systema" · Reveal and count-up interactions.
   Marquee is pure CSS. Reduced motion is respected throughout.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ease = 'cubic-bezier(0.16,1,0.3,1)';

  /* ── Scroll reveals ── */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('in'); });
    } else {
      var reveal = function (el, staggered) {
        var d = staggered ? parseInt(el.getAttribute('data-reveal') || '0', 10) : 0;
        el.style.transition =
          'opacity 0.8s ' + ease + ' ' + d + 'ms, transform 0.8s ' + ease + ' ' + d + 'ms';
        el.classList.add('in');
      };
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          // Reveal when in view, or when the viewport has already scrolled
          // past it (fast/jump scrolls can otherwise skip the intersect event
          // and leave content permanently invisible).
          if (e.isIntersecting) {
            reveal(e.target, true);
            io.unobserve(e.target);
          } else if (e.boundingClientRect.top < 0) {
            reveal(e.target, false);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ── Stat count-up ── */
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  if (counters.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-count');
      });
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          cio.unobserve(e.target);
          var target = parseInt(e.target.getAttribute('data-count'), 10);
          var t0 = performance.now();
          var dur = 1100;
          var tick = function (t) {
            var p = Math.min(1, (t - t0) / dur);
            var v = Math.round(target * (1 - Math.pow(1 - p, 3)));
            e.target.textContent = String(v);
            if (p < 1) window.requestAnimationFrame(tick);
          };
          window.requestAnimationFrame(tick);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }
})();
