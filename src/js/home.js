/* Duke & Lume — Home: Collections strip (left column, bottom)
   --------------------------------------------------------------- */

(function () {
  function init() {
    const mount = document.querySelector("[data-collections-preview]");
    if (!mount) return;

    const data = window.COLLECTIONS_DATA || [];
    const works = window.GALLERY_DATA || [];

    if (!data.length) {
      mount.innerHTML = '<p class="empty-state">No collections yet.</p>';
      return;
    }

    mount.innerHTML = data.map(function (c, i) {
      const slugHref = DL_escape(encodeURIComponent(c.slug));
      const title = DL_escape(c.title);
      const img = DL_escape(c.image);
      const hasCount = typeof c.count === "number" && c.count > 0;
      const count = hasCount
        ? c.count
        : works.filter(function (w) { return (w.category || w.collection) === c.slug; }).length;
      return '\
        <a class="collection-mini" href="collections.html?category=' + slugHref + '" data-reveal data-reveal-delay="' + (i * 70) + '">\
          <div class="collection-mini__media">\
            <img src="' + img + '" alt="' + title + '" data-fallback loading="lazy">\
          </div>\
          <h3 class="collection-mini__title">' + title + '</h3>\
          <div class="collection-mini__count">' + count + ' ' + (count === 1 ? "artwork" : "artworks") + '</div>\
        </a>';
    }).join("");

    if (window.DL_attachImageFallbacks) window.DL_attachImageFallbacks(mount);
    if (window.DL_attachReveal) window.DL_attachReveal(mount);
  }

  if (window.DL_DATA_READY) init();
  else document.addEventListener("dl:dataready", init, { once: true });
})();
