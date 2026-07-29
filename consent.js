/* Alosanar cookie consent. Stores the visitor's choice in localStorage.
   The site currently sets no cookies and runs no analytics, so this is
   opt-in ready: when analytics is added later, load it inside applyConsent()
   only when the stored value is 'accepted'. */
(function () {
  var KEY = 'alosanar-consent';

  function applyConsent(value) {
    if (value === 'accepted') {
      // e.g. load analytics here once it exists:
      // var s=document.createElement('script'); s.src='...'; document.head.appendChild(s);
    }
  }

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (stored) { applyConsent(stored); return; }

  var bar = document.createElement('div');
  bar.className = 'cookie-bar';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Cookie consent');
  bar.innerHTML =
    '<div class="cookie-inner">' +
      '<p class="cookie-text">We keep this site lean: fonts are served from our own servers and we set no tracking cookies by default. ' +
      'With your consent we may add optional analytics to understand how the site is used. You can change your mind anytime by clearing your browser data.</p>' +
      '<div class="cookie-actions">' +
        '<button class="cookie-btn cookie-reject" type="button">Reject</button>' +
        '<button class="cookie-btn cookie-accept" type="button">Accept</button>' +
      '</div>' +
    '</div>';

  function choose(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    if (bar.parentNode) bar.parentNode.removeChild(bar);
    applyConsent(value);
  }

  (document.body || document.documentElement).appendChild(bar);
  bar.querySelector('.cookie-accept').addEventListener('click', function () { choose('accepted'); });
  bar.querySelector('.cookie-reject').addEventListener('click', function () { choose('rejected'); });
})();
