/* Duke & Lume — Collections page
   - With ?category=slug : shows artworks for that collection
   - Without : shows full grid of collections
   --------------------------------------------------------------- */

(function () {
  function init() {
    const mount = document.querySelector("[data-collections-mount]");
    const titleEl = document.querySelector("[data-collections-title]");
    const eyebrowEl = document.querySelector("[data-collections-eyebrow]");
    if (!mount) return;

    const collections = window.COLLECTIONS_DATA || [];
    const works = window.GALLERY_DATA || [];
    const category = window.DL_query && DL_query("category");

    if (category) {
      const meta = collections.find(function (c) { return c.slug === category; });
      const filtered = works.filter(function (w) { return (w.category || w.collection) === category; });

      if (eyebrowEl) eyebrowEl.textContent = "Collection";
      if (titleEl) titleEl.textContent = meta ? meta.title : category;

      if (!filtered.length) {
        mount.innerHTML = '<p class="empty-state">No works yet in this collection.</p>';
        return;
      }

      mount.classList.remove("collections-grid");
      mount.classList.add("gallery-grid");

      mount.innerHTML = filtered.map(function (w) {
        const title = DL_escape(w.title);
        const img = DL_escape(w.image);
        const year = DL_escape(w.year || "");
        const cat = DL_escape(w.category || w.collection || "");
        const idHref = DL_escape(encodeURIComponent(w.id || ""));
        return '\
          <a class="artwork-card" href="work.html?id=' + idHref + '" data-reveal>\
            <div class="artwork-card__media">\
              <img src="' + img + '" alt="' + title + '" data-fallback loading="lazy">\
            </div>\
            <h3 class="artwork-card__title">' + title + '</h3>\
            <div class="artwork-card__meta">' + cat + (year ? " — " + year : "") + '</div>\
          </a>';
      }).join("");

      if (window.DL_attachImageFallbacks) window.DL_attachImageFallbacks(mount);
      if (window.DL_attachReveal) window.DL_attachReveal(mount);
      return;
    }

    if (!collections.length) {
      mount.innerHTML = '<p class="empty-state">No collections yet.</p>';
      return;
    }

    mount.innerHTML = collections.map(function (c) {
      const title = DL_escape(c.title);
      const slugHref = DL_escape(encodeURIComponent(c.slug));
      const img = DL_escape(c.image);
      const desc = DL_escape(c.description || "");
      const hasCount = typeof c.count === "number" && c.count > 0;
      const count = hasCount
        ? c.count
        : works.filter(function (w) { return (w.category || w.collection) === c.slug; }).length;
      const meta = count + " " + (count === 1 ? "work" : "works");
      return '\
        <a class="collection-tile" href="collections.html?category=' + slugHref + '" data-reveal>\
          <div class="collection-tile__media">\
            <img src="' + img + '" alt="' + title + '" data-fallback loading="lazy">\
          </div>\
          <h3 class="collection-tile__title">' + title + '</h3>\
          <div class="collection-tile__meta">' + meta + '</div>\
          <p class="collection-tile__desc">' + desc + '</p>\
        </a>';
    }).join("");

    if (window.DL_attachImageFallbacks) window.DL_attachImageFallbacks(mount);
    if (window.DL_attachReveal) window.DL_attachReveal(mount);
  }

  if (window.DL_DATA_READY) init();
  else document.addEventListener("dl:dataready", init, { once: true });
})();
