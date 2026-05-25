/* Duke & Lume — Home: Collections strip (left column, bottom)
   --------------------------------------------------------------- */

(function () {
  const mount = document.querySelector("[data-collections-preview]");
  if (!mount) return;

  const data = window.COLLECTIONS_DATA || [];
  const works = window.GALLERY_DATA || [];

  if (!data.length) {
    mount.innerHTML = '<p class="empty-state">No collections yet.</p>';
    return;
  }

  mount.innerHTML = data.map((c) => {
    const slug = DL_escape(c.slug);
    const title = DL_escape(c.title);
    const img = DL_escape(c.image);
    const count = typeof c.count === "number"
      ? c.count
      : works.filter((w) => (w.category || w.collection) === c.slug).length;
    return `
      <a class="collection-mini" href="collections.html?category=${slug}">
        <div class="collection-mini__media">
          <img src="${img}" alt="${title}" data-fallback loading="lazy">
        </div>
        <h3 class="collection-mini__title">${title}</h3>
        <div class="collection-mini__count">${count} ${count === 1 ? "artwork" : "artworks"}</div>
      </a>
    `;
  }).join("");

  if (window.DL_attachImageFallbacks) window.DL_attachImageFallbacks(mount);
})();
