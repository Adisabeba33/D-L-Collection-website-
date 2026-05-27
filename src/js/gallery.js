/* Duke & Lume — Gallery page: full grid + filtering by collection
   --------------------------------------------------------------- */

(function () {
  function init() {
    const grid = document.querySelector("[data-gallery-grid]");
    const filters = document.querySelector("[data-gallery-filters]");
    if (!grid) return;

    const works = window.GALLERY_DATA || [];
    const collections = window.COLLECTIONS_DATA || [];

    const initialCategory = (window.DL_query && DL_query("category")) || "all";
    let active = initialCategory;

    function render() {
      const filtered = active === "all"
        ? works
        : works.filter(function (w) { return (w.category || w.collection) === active; });

      if (!filtered.length) {
        grid.innerHTML = '<p class="empty-state">No works yet in this collection.</p>';
        return;
      }

      grid.innerHTML = filtered.map(function (w) {
        const title = DL_escape(w.title);
        const img = DL_escape(w.image);
        const year = DL_escape(w.year || "");
        const cat = DL_escape(w.category || w.collection || "");
        return '\
          <a class="artwork-card" href="inquire.html?work=' + DL_escape(w.id) + '">\
            <div class="artwork-card__media">\
              <img src="' + img + '" alt="' + title + '" data-fallback loading="lazy">\
            </div>\
            <h3 class="artwork-card__title">' + title + '</h3>\
            <div class="artwork-card__meta">' + cat + (year ? " — " + year : "") + '</div>\
          </a>';
      }).join("");

      if (window.DL_attachImageFallbacks) window.DL_attachImageFallbacks(grid);
    }

    function renderFilters() {
      if (!filters) return;
      const chips = [{ slug: "all", title: "All Works" }].concat(collections);
      filters.innerHTML = chips.map(function (c) {
        const isActive = c.slug === active ? " is-active" : "";
        return '<button class="filter-chip' + isActive + '" data-slug="' + DL_escape(c.slug) + '">' + DL_escape(c.title) + '</button>';
      }).join("");

      filters.querySelectorAll(".filter-chip").forEach(function (btn) {
        btn.addEventListener("click", function () {
          active = btn.dataset.slug;
          const url = new URL(location.href);
          if (active === "all") url.searchParams.delete("category");
          else url.searchParams.set("category", active);
          history.replaceState({}, "", url);
          renderFilters();
          render();
        });
      });
    }

    renderFilters();
    render();
  }

  if (window.DL_DATA_READY) init();
  else document.addEventListener("dl:dataready", init, { once: true });
})();
