/* Duke & Lume — Home: Featured Artworks grid (right column)
   ---------------------------------------------------------------
   Picks up to 6 artworks. Priority order:
   1. Works flagged with "featured": true in gallery.js
   2. If none flagged, first 6 from the array
   --------------------------------------------------------------- */

(function () {
  const mount = document.querySelector("[data-featured-grid]");
  if (!mount) return;

  const all = window.GALLERY_DATA || [];
  let picks = all.filter((w) => w.featured === true).slice(0, 6);
  if (picks.length < 6) {
    const extra = all.filter((w) => !picks.includes(w)).slice(0, 6 - picks.length);
    picks = picks.concat(extra);
  }

  if (!picks.length) {
    mount.innerHTML = '<p class="empty-state">No featured works yet.</p>';
    return;
  }

  mount.innerHTML = picks.map((w, i) => {
    const title = DL_escape(w.title);
    const img = DL_escape(w.image);
    const id = DL_escape(w.id);
    const tall = i === 0 ? " featured-grid__item--tall" : "";
    return `
      <a class="featured-grid__item${tall}" href="inquire.html?work=${id}" title="${title}">
        <img src="${img}" alt="${title}" data-fallback loading="lazy">
      </a>
    `;
  }).join("");

  if (window.DL_attachImageFallbacks) window.DL_attachImageFallbacks(mount);
})();
