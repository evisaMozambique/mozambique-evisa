/* Mozambique eVisa Disqus — ONE-TIME SETUP:
 * Replace YOUR_MOZAMBIQUE_DISQUS_SHORTNAME with the exact Disqus shortname
 * shown in Disqus Admin > Settings > General. Do not enter a full URL.
 * Leave the HTML pages and the page identifiers as they are.
 */
(function () {
  'use strict';

  var DISQUS_SHORTNAME = 'mozambique-evisa-1';
  var section = document.querySelector('.moz-disqus-section');
  if (!section) return;

  var thread = document.getElementById('disqus_thread');
  var status = document.getElementById('moz-disqus-status');
  if (!thread) return;

  function notify(message) {
    if (status) {
      status.textContent = message;
      status.hidden = false;
    }
  }

  // Check only the literal setup placeholder, NEVER a potentially valid shortname.
  if (!DISQUS_SHORTNAME || DISQUS_SHORTNAME === 'YOUR_MOZAMBIQUE_DISQUS_SHORTNAME') {
    notify('Comments will appear after the website owner enters the registered Disqus shortname.');
    return;
  }

  if (!/^[a-z0-9-]+$/.test(DISQUS_SHORTNAME)) {
    notify('Disqus shortname is invalid. Enter the shortname only (letters, numbers and hyphens).');
    return;
  }

  var pageId = section.getAttribute('data-disqus-page');
  if (!pageId) {
    notify('Unable to identify the comment thread for this page.');
    return;
  }

  window.disqus_config = function () {
    this.page.url = window.location.href.split(/[?#]/)[0];
    this.page.identifier = 'mozambique-evisa:' + pageId;
    this.page.title = document.title;
  };

  notify('Loading comments…');
  var s = document.createElement('script');
  s.src = 'https://' + DISQUS_SHORTNAME + '.disqus.com/embed.js';
  s.setAttribute('data-timestamp', String(Date.now()));
  s.async = true;
  s.onload = function () {
    if (status) status.hidden = true;
  };
  s.onerror = function () {
    notify('Disqus could not load. Check the shortname, website settings, and browser content blockers.');
  };
  (document.head || document.body).appendChild(s);
})();
