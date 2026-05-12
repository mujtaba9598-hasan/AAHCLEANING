/* before-after.js — drag-to-reveal slider. Works with mouse, touch &
   keyboard. Markup:
   <div class="ba" data-ba aria-label="Before and after">
     <img class="ba-after" src="after.jpg" alt="...">
     <div class="ba-before-wrap"><img src="before.jpg" alt="..."></div>
     <div class="ba-handle" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"></div>
     <span class="ba-tag left">Before</span><span class="ba-tag right">After</span>
   </div>                                                                  */
(function () {
  'use strict';
  document.querySelectorAll('[data-ba]').forEach(function (ba) {
    var wrap = ba.querySelector('.ba-before-wrap');
    var beforeImg = wrap ? wrap.querySelector('img') : null;
    var handle = ba.querySelector('.ba-handle');
    if (!wrap || !handle) return;
    var dragging = false;

    function set(pct) {
      pct = Math.max(0, Math.min(100, pct));
      wrap.style.width = pct + '%';
      handle.style.left = pct + '%';
      if (beforeImg) beforeImg.style.width = ba.clientWidth + 'px';
      handle.setAttribute('aria-valuenow', Math.round(pct));
    }
    function fromEvent(e) {
      var rect = ba.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      set((x / rect.width) * 100);
    }
    ba.addEventListener('mousedown', function (e) { dragging = true; fromEvent(e); });
    window.addEventListener('mousemove', function (e) { if (dragging) fromEvent(e); });
    window.addEventListener('mouseup', function () { dragging = false; });
    ba.addEventListener('touchstart', function (e) { dragging = true; fromEvent(e); }, { passive: true });
    ba.addEventListener('touchmove', function (e) { if (dragging) fromEvent(e); }, { passive: true });
    ba.addEventListener('touchend', function () { dragging = false; });
    handle.addEventListener('keydown', function (e) {
      var cur = parseFloat(handle.getAttribute('aria-valuenow') || '50');
      if (e.key === 'ArrowLeft') { set(cur - 4); e.preventDefault(); }
      if (e.key === 'ArrowRight') { set(cur + 4); e.preventDefault(); }
      if (e.key === 'Home') { set(0); } if (e.key === 'End') { set(100); }
    });
    window.addEventListener('resize', function () { set(parseFloat(handle.getAttribute('aria-valuenow') || '50')); });
    set(50);
  });
})();
