/**
 * HUD chrome — injects the persistent viewport frame (reticle corners +
 * live readouts) and runs the one-time power-on boot sweep.
 * Kept in JS (not the fetched templates) so the boot fires at first paint
 * rather than after the async header/footer load.
 */
(function () {
   'use strict';

   const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

   // Persistent frame overlay
   const overlay = document.createElement('div');
   overlay.className = 'hud-overlay';
   overlay.setAttribute('aria-hidden', 'true');
   overlay.innerHTML =
      '<span class="hud-overlay__corner hud-overlay__corner--tl"></span>' +
      '<span class="hud-overlay__corner hud-overlay__corner--tr"></span>' +
      '<span class="hud-overlay__corner hud-overlay__corner--bl"></span>' +
      '<span class="hud-overlay__corner hud-overlay__corner--br"></span>' +
      '<span class="hud-overlay__readout hud-overlay__readout--tr"><span class="dot"></span>SYS ONLINE · OASIS//NET</span>' +
      '<span class="hud-overlay__readout hud-overlay__readout--bl" id="hud-clock">--:--:-- UTC</span>';
   document.body.appendChild(overlay);

   // Live UTC clock in the corner readout
   const clock = overlay.querySelector('#hud-clock');
   function tick() {
      const d = new Date();
      const p = (n) => String(n).padStart(2, '0');
      clock.textContent = `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} UTC`;
   }
   tick();
   setInterval(tick, 1000);

   // One-time boot sweep (skipped under reduced-motion)
   if (!reduced && !sessionStorage.getItem('hud-booted')) {
      const boot = document.createElement('div');
      boot.className = 'hud-boot';
      boot.setAttribute('aria-hidden', 'true');
      document.body.appendChild(boot);
      document.body.classList.add('booting');
      sessionStorage.setItem('hud-booted', '1');
      setTimeout(() => {
         document.body.classList.remove('booting');
         boot.remove();
      }, 1500);
   }
})();
