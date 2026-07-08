/**
 * Shared component loader — injects header and footer templates.
 * Runs on every page. Requires elements with id="header" and id="footer".
 */
(function () {
   'use strict';

   const basePath = document.documentElement.dataset.basePath || '';

   function resolvePath(path) {
      return basePath + path;
   }

   async function loadTemplate(url, targetId) {
      const el = document.getElementById(targetId);
      if (!el) return;

      try {
         const resp = await fetch(resolvePath(url));
         if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
         let html = await resp.text();

         // Resolve relative paths in templates when basePath is set
         if (basePath) {
            html = html.replace(/href="(?!https?:\/\/|#|mailto:)([^"]+)"/g, `href="${basePath}$1"`);
            html = html.replace(/src="(?!https?:\/\/)([^"]+)"/g, `src="${basePath}$1"`);
         }

         el.innerHTML = html;
      } catch (err) {
         console.warn(`Failed to load ${url}:`, err);
      }
   }

   // Mark active nav link based on current page
   function setActiveLink() {
      const page = document.documentElement.dataset.page;
      if (!page) return;

      const links = document.querySelectorAll('.nav-link[data-page]');
      links.forEach((link) => {
         if (link.dataset.page === page) {
            link.classList.add('active');
         }
      });
   }

   // Load both templates, then set active state
   Promise.all([loadTemplate('templates/header.html', 'header'), loadTemplate('templates/footer.html', 'footer')]).then(
      () => {
         setActiveLink();
         // Initialize nav after header loads
         if (typeof initNav === 'function') initNav();
      }
   );
})();
