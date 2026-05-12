/* gallery.js — projects page: category filter + before/after lightbox.
   Cards: <article class="proj-card" data-cat="sofa" data-before="..." data-after="..." data-title="..." data-loc="...">
   Filter tabs: <button class="filter-tab" data-filter="sofa">                 */
(function () {
  'use strict';
  var hasGSAP = typeof window.gsap !== 'undefined';
  var tabs = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('.proj-card');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var f = tab.getAttribute('data-filter');
      cards.forEach(function (c) {
        var show = (f === 'all' || c.getAttribute('data-cat') === f);
        if (show) {
          c.classList.remove('hide');
          if (hasGSAP) gsap.fromTo(c, { scale: .92, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: .4, ease: 'power2.out' });
        } else {
          c.classList.add('hide');
        }
      });
    });
  });

  /* lightbox with a before/after slider re-using .ba styles */
  var lb = document.querySelector('[data-lightbox]');
  if (lb) {
    var lbBA = lb.querySelector('.ba');
    var lbWrap = lb.querySelector('.ba-before-wrap');
    var lbBefore = lbWrap ? lbWrap.querySelector('img') : null;
    var lbAfter = lb.querySelector('.ba-after');
    var lbTitle = lb.querySelector('[data-lb-title]');
    var closeBtn = lb.querySelector('.lb-close');
    var lbHandle = lb.querySelector('.ba-handle');

    function openLB(card) {
      if (lbAfter) lbAfter.src = card.getAttribute('data-after') || card.querySelector('img').src;
      if (lbBefore) lbBefore.src = card.getAttribute('data-before') || card.getAttribute('data-after') || card.querySelector('img').src;
      if (lbTitle) lbTitle.textContent = (card.getAttribute('data-title') || '') + (card.getAttribute('data-loc') ? ' — ' + card.getAttribute('data-loc') : '');
      lb.classList.add('open'); document.body.style.overflow = 'hidden';
      // reset slider to middle once images load
      requestAnimationFrame(function () {
        if (lbWrap) { lbWrap.style.width = '50%'; }
        if (lbHandle) { lbHandle.style.left = '50%'; }
        if (lbBefore && lbBA) lbBefore.style.width = lbBA.clientWidth + 'px';
      });
    }
    function closeLB() { lb.classList.remove('open'); document.body.style.overflow = ''; }
    cards.forEach(function (c) { c.addEventListener('click', function () { openLB(c); }); });
    if (closeBtn) closeBtn.addEventListener('click', closeLB);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLB(); });
  }
})();
