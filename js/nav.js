/**
 * Navigation — hamburger toggle, scroll shadow, active link highlight
 */

function initNav() {
   'use strict';

   const header = document.getElementById('site-header');
   const hamburger = document.getElementById('hamburger');
   const nav = document.getElementById('site-nav');

   if (!header || !hamburger || !nav) return;

   function closeNav(returnFocus) {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      if (returnFocus) hamburger.focus();
   }

   // Hamburger toggle
   hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
      if (isOpen) {
         const first = nav.querySelector('.nav-link');
         if (first) first.focus();
      }
   });

   // Close on Escape, returning focus to the toggle
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) closeNav(true);
   });

   // Close on link click (mobile)
   nav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
         nav.classList.remove('open');
         hamburger.classList.remove('open');
         hamburger.setAttribute('aria-expanded', 'false');
         document.body.classList.remove('nav-open');
      });
   });

   // Close on outside click
   document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
         nav.classList.remove('open');
         hamburger.classList.remove('open');
         hamburger.setAttribute('aria-expanded', 'false');
         document.body.classList.remove('nav-open');
      }
   });

   // Scroll shadow on header
   let ticking = false;
   window.addEventListener('scroll', () => {
      if (!ticking) {
         requestAnimationFrame(() => {
            header.classList.toggle('scrolled', window.scrollY > 20);
            ticking = false;
         });
         ticking = true;
      }
   });
}
