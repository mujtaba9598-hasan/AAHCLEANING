/* partials.js — shared header, mobile menu, footer and floating
   WhatsApp, injected into placeholder elements so every page stays
   in sync. Also wires the navbar scroll state + mobile overlay.
   Placeholders expected in each page:
     <div data-partial="header"></div>
     <div data-partial="footer"></div>
   (If a page omits them, nothing breaks.)                          */
(function () {
  'use strict';
  var WA = 'https://wa.me/971558786055';
  var TEL = '+971569586168';

  var WA_ICON = '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.05 4.94A9.82 9.82 0 0 0 12.04 2C6.6 2 2.16 6.43 2.16 11.88c0 1.74.46 3.44 1.32 4.94L2 22l5.32-1.4a9.85 9.85 0 0 0 4.71 1.2h.01c5.44 0 9.88-4.43 9.88-9.88 0-2.64-1.03-5.12-2.87-6.98ZM12.04 20.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.16.83.84-3.08-.2-.32a8.18 8.18 0 0 1-1.25-4.35c0-4.52 3.69-8.2 8.22-8.2a8.15 8.15 0 0 1 5.81 2.41 8.13 8.13 0 0 1 2.4 5.8c0 4.53-3.68 8.21-8.21 8.21Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.16.24-.63.79-.78.95-.14.17-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42l-.47-.01c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>';

  var NAV = [
    ['index.html', 'Home'], ['about.html', 'About'], ['services.html', 'Services'],
    ['projects.html', 'Projects'], ['faq.html', 'FAQ'], ['contact.html', 'Contact']
  ];
  function navLinks(cls) {
    return NAV.map(function (n) { return '<a data-nav href="' + n[0] + '" class="' + cls + '">' + n[1] + '</a>'; }).join('');
  }

  var HEADER = '' +
    '<header class="site-nav fixed top-0 inset-x-0 z-50">' +
      '<div class="container-rail flex items-center justify-between h-20">' +
        '<a href="index.html" class="flex items-center gap-3" aria-label="Abdul Aziz Habib Cleaning Service — home">' +
          '<img src="assets/logo/logo.png" alt="Abdul Aziz Habib logo" class="h-11 w-11 rounded-full bg-white object-contain p-1">' +
          '<span class="leading-tight"><span class="font-display text-lg block">Abdul Aziz Habib</span>' +
          '<span class="text-[10px] uppercase tracking-[0.22em] text-orange2">Cleaning Service · RAK</span></span>' +
        '</a>' +
        '<nav class="hidden md:flex items-center gap-8 text-sm" aria-label="Primary">' + navLinks('nav-link') + '</nav>' +
        '<div class="flex items-center gap-3">' +
          '<a href="booking.html" class="btn btn-primary text-sm hidden sm:inline-flex">Book Now</a>' +
          '<button data-menu-open class="md:hidden p-2 -mr-2" aria-label="Open menu" aria-expanded="false">' +
            '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18" stroke-linecap="round"/></svg></button>' +
        '</div>' +
      '</div>' +
    '</header>' +
    '<div class="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">' +
      '<button data-menu-close class="absolute top-6 right-6 p-2" aria-label="Close menu">' +
        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg></button>' +
      navLinks('') + '<a href="booking.html" class="btn btn-primary !text-2xl mt-2">Book Now</a>' +
    '</div>';

  var SERVICES = [
    ['sofa-cleaning.html', 'Sofa &amp; upholstery'], ['carpet-cleaning.html', 'Carpet &amp; rug cleaning'],
    ['villa-cleaning.html', 'Villa deep cleaning'], ['window-glass.html', 'Windows &amp; glass'],
    ['floor-walls.html', 'Floor &amp; wall care'], ['office-shop.html', 'Office &amp; retail'],
    ['deep-cleaning.html', 'Post-construction']
  ];
  var FOOTER = '' +
    '<footer class="bg-[#070b16] border-t" style="border-color:var(--line)">' +
      '<div class="container-rail py-16">' +
        '<div class="grid md:grid-cols-4 gap-10">' +
          '<div class="md:col-span-1">' +
            '<div class="flex items-center gap-3 mb-5"><img src="assets/logo/logo.png" alt="Abdul Aziz Habib logo" class="h-12 w-12 rounded-lg bg-white object-contain p-1.5">' +
            '<span class="font-display text-lg leading-tight">Abdul Aziz Habib<br><span class="text-[10px] uppercase tracking-[0.2em] text-orange2 font-sans">Cleaning Service</span></span></div>' +
            '<p class="text-sm muted">Premium residential, commercial &amp; post-construction cleaning in Ras Al Khaimah and Dubai. We don\'t just clean — we restore.</p></div>' +
          '<div><h3 class="font-display text-lg mb-4">Quick links</h3><ul class="space-y-2 text-sm muted">' +
            '<li><a href="about.html" class="hover:text-orange2 transition-colors">About us</a></li>' +
            '<li><a href="services.html" class="hover:text-orange2 transition-colors">Services</a></li>' +
            '<li><a href="projects.html" class="hover:text-orange2 transition-colors">Projects</a></li>' +
            '<li><a href="faq.html" class="hover:text-orange2 transition-colors">FAQ</a></li>' +
            '<li><a href="booking.html" class="hover:text-orange2 transition-colors">Request a quote</a></li>' +
            '<li><a href="contact.html" class="hover:text-orange2 transition-colors">Contact</a></li></ul></div>' +
          '<div><h3 class="font-display text-lg mb-4">Services</h3><ul class="space-y-2 text-sm muted">' +
            SERVICES.map(function (s) { return '<li><a href="' + s[0] + '" class="hover:text-orange2 transition-colors">' + s[1] + '</a></li>'; }).join('') +
          '</ul></div>' +
          '<div><h3 class="font-display text-lg mb-4">Get in touch</h3><ul class="space-y-3 text-sm muted">' +
            '<li class="flex items-center gap-3"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-orange"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" stroke-linecap="round" stroke-linejoin="round"/></svg><a href="tel:' + TEL + '" class="hover:text-orange2">056 958 6168</a></li>' +
            '<li class="flex items-center gap-3"><span class="text-orange">' + WA_ICON.replace('width="26" height="26"', 'width="16" height="16"') + '</span><a href="' + WA + '" target="_blank" rel="noopener" class="hover:text-orange2">055 878 6055 — WhatsApp</a></li>' +
            '<li class="flex items-center gap-3"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-orange"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7L22 6" stroke-linecap="round" stroke-linejoin="round"/></svg><a href="mailto:abdulaziz21031987@gmail.com" class="hover:text-orange2 break-all">abdulaziz21031987@gmail.com</a></li>' +
            '<li class="flex items-center gap-3"><span class="w-4 flex-none"></span><a href="mailto:info@abdulazizcleaning.com" class="hover:text-orange2 break-all">info@abdulazizcleaning.com</a></li>' +
            '<li class="flex items-center gap-3"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-orange"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>Ras Al Khaimah · Dubai, UAE</li>' +
            '<li class="flex items-center gap-3"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-orange"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round" stroke-linejoin="round"/></svg>Open 7 days · 7:00–21:00</li></ul></div>' +
        '</div>' +
        '<div class="border-t mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs muted" style="border-color:var(--line)">' +
          '<p>&copy; <span data-year>2026</span> Abdul Aziz Habib Cleaning Service. All rights reserved.</p>' +
          '<p>powered by <a href="mailto:hello@quartermasters.me" class="hover:text-orange2 transition-colors">Quartermasters F.Z.C</a></p>' +
        '</div>' +
      '</div>' +
    '</footer>' +
    '<a class="wa-fab" href="' + WA + '" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">' + WA_ICON + '<span class="wa-label">Chat with us</span></a>' +
    '<div class="wa-nudge" role="status"><button aria-label="Dismiss">&times;</button>Need a quote? Message us on WhatsApp — we usually reply within minutes. 💬</div>';

  function inject(name, html) {
    var slot = document.querySelector('[data-partial="' + name + '"]');
    if (slot) slot.outerHTML = html;
  }
  inject('header', HEADER);
  inject('footer', FOOTER);

  /* ---- navbar interactivity (markup may have just been injected) ---- */
  var nav = document.querySelector('.site-nav');
  if (nav) { var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 24); }; onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); }
  var burger = document.querySelector('[data-menu-open]'), menu = document.querySelector('.mobile-menu'), closeBtn = document.querySelector('[data-menu-close]');
  function setMenu(open) { if (!menu) return; menu.classList.toggle('open', open); document.body.style.overflow = open ? 'hidden' : ''; if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  if (burger) burger.addEventListener('click', function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  var page = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('[data-nav]').forEach(function (a) { if (a.getAttribute('href') === page) a.setAttribute('aria-current', 'page'); });
  /* footer year + WhatsApp nudge are handled by main.js (runs after this) */
})();
