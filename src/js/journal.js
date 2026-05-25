/* Duke & Lume — Journal listing
   --------------------------------------------------------------- */

(function () {
  const mount = document.querySelector("[data-journal-grid]");
  if (!mount) return;

  const data = window.JOURNAL_DATA || [];
  if (!data.length) {
    mount.innerHTML = '<p class="empty-state">No journal entries yet.</p>';
    return;
  }

  mount.innerHTML = data.map((e) => {
    const title = DL_escape(e.title);
    const img = DL_escape(e.image);
    const date = DL_escape(e.date || "");
    const excerpt = DL_escape(e.excerpt || "");
    return `
      <article class="journal-card">
        <div class="journal-card__media">
          <img src="${img}" alt="${title}" data-fallback loading="lazy">
        </div>
        <div class="journal-card__date">${date}</div>
        <h3 class="journal-card__title">${title}</h3>
        <p class="journal-card__excerpt">${excerpt}</p>
      </article>
    `;
  }).join("");

  if (window.DL_attachImageFallbacks) window.DL_attachImageFallbacks(mount);
})();
