/* forms.js — front-end-only submit handling (static site, no backend):
   shows a spinner then a success state, then offers to continue on
   WhatsApp with the entered details prefilled. */
(function () {
  'use strict';
  var WA_NUMBER = '971558786055';

  document.querySelectorAll('form[data-fake-submit]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var status = form.querySelector('[data-form-status]');
      if (!btn) return;
      var original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="ld" style="display:inline-block;width:1rem;height:1rem;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:spin .7s linear infinite;vertical-align:-2px"></span><span style="margin-left:.5rem">Sending…</span>';

      setTimeout(function () {
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:-3px"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg><span style="margin-left:.5rem">Request sent</span>';
        if (status) {
          status.hidden = false;
          // build a WhatsApp message from the form fields
          var data = new FormData(form);
          var lines = ['Hello Abdul Aziz Habib Cleaning Service — I would like a quote.'];
          data.forEach(function (v, k) { if (v) lines.push(k.replace(/_/g, ' ') + ': ' + v); });
          var href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
          status.innerHTML = 'Thanks — we’ll call you back shortly. Prefer to chat now? <a href="' + href + '" target="_blank" rel="noopener" style="color:var(--orange-2);font-weight:600;text-decoration:underline">Continue on WhatsApp</a>.';
        }
        setTimeout(function () { btn.disabled = false; btn.innerHTML = original; }, 4000);
      }, 1300);
    });
  });

  // tiny keyframes for the spinner (kept here so the CSS file stays markup-agnostic)
  var s = document.createElement('style');
  s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(s);
})();
