/* navbar.js — scrolled state + mobile overlay menu + active link */
(function () {
  'use strict';
  var nav = document.querySelector('.site-nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 24); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }

  var burger = document.querySelector('[data-menu-open]');
  var menu = document.querySelector('.mobile-menu');
  var closeBtn = document.querySelector('[data-menu-close]');
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (burger) burger.addEventListener('click', function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* mark current page link */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(function (a) {
    if (a.getAttribute('href') === path) { a.setAttribute('aria-current', 'page'); }
  });
})();
