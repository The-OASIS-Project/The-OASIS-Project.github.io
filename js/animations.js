/**
 * Scroll-triggered reveal animations using IntersectionObserver.
 * Add class="reveal fade-up" (or fade-in, slide-left, slide-right) to any element.
 */
(function () {
   'use strict';

   if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Mark everything as revealed immediately
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
      return;
   }

   const observer = new IntersectionObserver(
      (entries) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               entry.target.classList.add('revealed');
               observer.unobserve(entry.target);
            }
         });
      },
      {
         threshold: 0.1,
         rootMargin: '0px 0px -40px 0px',
      }
   );

   // Observe on load and after templates inject
   function observeAll() {
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => observer.observe(el));
   }

   // Run once DOM is ready, and again after a short delay for template injection
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeAll);
   } else {
      observeAll();
   }

   // Re-observe after templates load (components.js injects header/footer)
   setTimeout(observeAll, 500);
})();
