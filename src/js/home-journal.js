/* Duke & Lume — Home: Journal preview (right column)
   --------------------------------------------------------------- */

(function () {
  function init() {
    const mount = document.querySelector("[data-journal-home]");
    if (!mount) return;

    const data = (window.JOURNAL_DATA || []).slice(0, 4);
    if (!data.length) {
      mount.innerHTML = '<p class="empty-state">No journal entries yet.</p>';
      return;
    }

    mount.innerHTML = data.map(function (e, i) {
      const title = DL_escape(e.title);
      const img = DL_escape(e.image);
      const date = DL_escape(e.date || "");
      return '\
        <a class="journal-mini" href="journal.html" data-reveal data-reveal-delay="' + (i * 80) + '">\
          <div class="journal-mini__media">\
            <img src="' + img + '" alt="' + title + '" data-fallback loading="lazy">\
          </div>\
          <div class="journal-mini__date">' + date + '</div>\
          <h4 class="journal-mini__title">' + title + '</h4>\
          <span class="journal-mini__more">Read more →</span>\
        </a>';
    }).join("");

    if (window.DL_attachImageFallbacks) window.DL_attachImageFallbacks(mount);
    if (window.DL_attachReveal) window.DL_attachReveal(mount);
  }

  if (window.DL_DATA_READY) init();
  else document.addEventListener("dl:dataready", init, { once: true });
})();
