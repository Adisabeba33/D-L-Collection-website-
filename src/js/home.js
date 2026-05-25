/* Duke & Lume — Home page: collections preview row
   --------------------------------------------------------------- */

(function () {
  const mount = document.querySelector("[data-collections-preview]");
  if (!mount) return;

  const data = window.COLLECTIONS_DATA || [];
  if (!data.length) {
    mount.innerHTML = '<p class="empty-state">No collections yet.</p>';
    return;
  }

  const html = data.map((c) => {
    const slug = DL_escape(c.slug);
    const title = DL_escape(c.title);
    const img = DL_escape(c.image);
    const count = typeof c.count === "number" ? c.count : "";
    const meta = count ? `${count} ${count === 1 ? "work" : "works"}` : "Collection";
    return `
      <a class="collection-card" href="collections.html?category=${slug}">
        <div class="collection-card__media">
          <img src="${img}" alt="${title}" data-fallback loading="lazy">
        </div>
        <h3 class="collection-card__title">${title}</h3>
        <div class="collection-card__meta">${meta}</div>
      </a>
    `;
  }).join("");

  mount.innerHTML = html;
  if (window.DL_attachImageFallbacks) window.DL_attachImageFallbacks(mount);
})();
