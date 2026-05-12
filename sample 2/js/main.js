/* main.js — Lenis smooth scroll + GSAP ScrollTrigger reveals, stat
   count-up, hero bubbles, WhatsApp nudge. All motion is gated behind
   prefers-reduced-motion (we add html.no-anim and bail out of GSAP). */
(function () {
  'use strict';

  /* ---------- Preloader: CSS scene of a worker running a floor-scrubber.
       Shown only once per browser session (first load), not on every page nav. ---------- */
  (function preloader() {
    if (!document.body) return;
    try { if (sessionStorage.getItem('aah-preloaded')) return; } catch (e) {}
    try { sessionStorage.setItem('aah-preloaded', '1'); } catch (e) {}
    var pre = document.createElement('div');
    pre.id = 'preloader';
    pre.setAttribute('role', 'status');
    pre.setAttribute('aria-label', 'Loading');
    pre.innerHTML =
      '<div class="pl-inner">' +
        '<img class="pl-logo" src="assets/logo/logo.png" alt="Abdul Aziz Habib Cleaning Service">' +
        '<div class="pl-stage" aria-hidden="true">' +
          '<div class="pl-floor"><span class="pl-shine"></span></div>' +
          '<div class="pl-rig"><div class="pl-bob">' +
            '<span class="pl-brush"></span><span class="pl-machine"></span>' +
            '<span class="pl-drop"></span><span class="pl-drop d2"></span><span class="pl-drop d3"></span>' +
            '<span class="pl-handle"></span>' +
            '<span class="pl-leg l1"></span><span class="pl-leg l2"></span>' +
            '<span class="pl-body"></span><span class="pl-head"></span><span class="pl-cap"></span>' +
          '</div></div>' +
        '</div>' +
        '<p class="pl-text">Preparing a spotless experience<span class="dots"></span></p>' +
        '<div class="pl-bar"></div>' +
      '</div>';
    document.body.insertBefore(pre, document.body.firstChild);
    document.body.style.overflow = 'hidden';
    var start = Date.now(), MIN = 1100, removed = false;
    function done() {
      if (removed) return; removed = true;
      pre.classList.add('pl-out');
      document.body.style.overflow = '';
      setTimeout(function () { if (pre.parentNode) pre.parentNode.removeChild(pre); }, 650);
    }
    window.addEventListener('load', function () { setTimeout(done, Math.max(0, MIN - (Date.now() - start))); });
    setTimeout(done, 3600); /* hard cap so it never sticks */
  })();

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined';
  if (prefersReduced) document.documentElement.classList.add('no-anim');

  /* ---------- Scrolling ----------
     Smooth-scroll-jacking (Lenis) was removed — it added ~1s of wheel
     inertia that felt laggy. We now use the browser's native scroll;
     in-page anchor links still glide via CSS `scroll-behavior: smooth`. */

  /* ---------- Scroll reveals ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (prefersReduced || !hasGSAP || !window.ScrollTrigger) {
    reveals.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    gsap.registerPlugin(ScrollTrigger);
    reveals.forEach(function (el) {
      var delay = parseFloat(el.getAttribute('data-delay') || '0');
      gsap.fromTo(el, { y: 28, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 0.7, ease: 'power2.out', delay: delay,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });

    /* hero headline word stagger (elements with data-stagger-words) */
    document.querySelectorAll('[data-stagger-words]').forEach(function (h) {
      var words = h.textContent.trim().split(/\s+/);
      h.innerHTML = words.map(function (w) { return '<span class="sw" style="display:inline-block;overflow:hidden"><span style="display:inline-block">' + w + '&nbsp;</span></span>'; }).join('');
      gsap.from(h.querySelectorAll('.sw > span'), { yPercent: 110, duration: 0.8, ease: 'power3.out', stagger: 0.06, delay: 0.15 });
    });
  }

  /* ---------- Stat count-up ---------- */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (prefersReduced || !hasGSAP || !window.ScrollTrigger) { el.textContent = target + suffix; return; }
    var obj = { v: 0 };
    gsap.to(obj, { v: target, duration: 1.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: function () { el.textContent = Math.round(obj.v) + suffix; } });
  });

  /* ---------- Hero floating bubbles ---------- */
  var pcontainer = document.querySelector('.particles');
  if (pcontainer && !prefersReduced) {
    for (var i = 0; i < 16; i++) {
      var s = document.createElement('span');
      var size = 6 + Math.random() * 22;
      s.style.width = size + 'px'; s.style.height = size + 'px';
      s.style.left = (Math.random() * 100) + '%';
      s.style.animationDuration = (10 + Math.random() * 16) + 's';
      s.style.animationDelay = (-Math.random() * 16) + 's';
      pcontainer.appendChild(s);
    }
  }

  /* ---------- WhatsApp nudge after 5s ---------- */
  var nudge = document.querySelector('.wa-nudge');
  if (nudge && !sessionStorage.getItem('wa-nudge-dismissed')) {
    setTimeout(function () { nudge.classList.add('show'); }, 5200);
    var x = nudge.querySelector('button');
    if (x) x.addEventListener('click', function () { nudge.classList.remove('show'); sessionStorage.setItem('wa-nudge-dismissed', '1'); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function () {
      var open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
