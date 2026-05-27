/* Duke & Lume — Home: Featured Artworks grid (right column)
   ---------------------------------------------------------------
   Picks up to 6 artworks. Priority order:
   1. Works flagged with "featured": true
   2. If fewer than 6, top up with the rest in order
   --------------------------------------------------------------- */

(function () {
  function init() {
    const mount = document.querySelector("[data-featured-grid]");
    if (!mount) return;

    const all = window.GALLERY_DATA || [];
    let picks = all.filter(function (w) { return w.featured === true; }).slice(0, 6);
    if (picks.length < 6) {
      const extra = all.filter(function (w) { return picks.indexOf(w) === -1; }).slice(0, 6 - picks.length);
      picks = picks.concat(extra);
    }

    if (!picks.length) {
      mount.innerHTML = '<p class="empty-state">No featured works yet.</p>';
      return;
    }

    mount.innerHTML = picks.map(function (w, i) {
      const title = DL_escape(w.title);
      const img = DL_escape(w.image);
      const idHref = DL_escape(encodeURIComponent(w.id || ""));
      const tall = (picks.length >= 6 && i === 0) ? " featured-grid__item--tall" : "";
      return '\
        <a class="featured-grid__item' + tall + '" href="inquire.html?work=' + idHref + '" title="' + title + '">\
          <img src="' + img + '" alt="' + title + '" data-fallback loading="lazy">\
        </a>';
    }).join("");

    if (window.DL_attachImageFallbacks) window.DL_attachImageFallbacks(mount);
  }

  if (window.DL_DATA_READY) init();
  else document.addEventListener("dl:dataready", init, { once: true });
})();
