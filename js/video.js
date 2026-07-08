/**
 * Lazy YouTube embed — swaps a click-to-play thumbnail for the real iframe.
 * Global on purpose: invoked from the .video-placeholder button (click + keyboard).
 * Loaded only on pages with videos (index, videos).
 * Uses youtube-nocookie + a constrained referrer to minimize the third-party
 * handoff — nothing contacts YouTube until the user deliberately clicks play.
 */
'use strict';

function loadVideo(el, id) {
   const iframe = document.createElement('iframe');
   iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
   iframe.title = el.getAttribute('data-title') || 'YouTube video player';
   iframe.referrerPolicy = 'strict-origin-when-cross-origin';
   iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
   iframe.allowFullscreen = true;
   el.parentNode.replaceChild(iframe, el);
}

// Make each click-to-play thumbnail operable by keyboard and announced properly.
// (The markup keeps an inline onclick; here we add the ARIA role, focusability,
//  Enter/Space activation, and an accessible label derived from the thumbnail.)
document.addEventListener('DOMContentLoaded', () => {
   document.querySelectorAll('.video-placeholder').forEach((el) => {
      const img = el.querySelector('img');
      const title = el.getAttribute('data-title') || (img && img.alt) || 'video';
      el.setAttribute('data-title', title);

      if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', `Play video: ${title}`);
      el.addEventListener('keydown', (e) => {
         if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
         }
      });
   });
});
