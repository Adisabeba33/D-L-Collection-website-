/* Duke & Lume — Gallery page: full grid + filtering by collection + search
   --------------------------------------------------------------- */

(function () {
  function init() {
    const grid = document.querySelector("[data-gallery-grid]");
    const filters = document.querySelector("[data-gallery-filters]");
    const searchInput = document.querySelector("[data-gallery-search]");
    const countEl = document.querySelector("[data-gallery-count]");
    if (!grid) return;

    const works = window.GALLERY_DATA || [];
    const collections = window.COLLECTIONS_DATA || [];

    const params = new URLSearchParams(location.search);
    let active = params.get("category") || "all";
    let query = (params.get("q") || "").trim();

    if (searchInput && query) searchInput.value = query;

    function matchesSearch(w, q) {
      if (!q) return true;
      const needle = q.toLowerCase();
      const haystack = [w.title, w.description, w.category, w.collection, w.year]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.indexOf(needle) !== -1;
    }

    function render() {
      const filtered = works.filter(function (w) {
        const inCategory = active === "all" || (w.category || w.collection) === active;
        return inCategory && matchesSearch(w, query);
      });

      if (countEl) {
        if (query || active !== "all") {
          countEl.textContent = filtered.length + " of " + works.length + " works";
        } else {
          countEl.textContent = "";
        }
      }

      if (!filtered.length) {
        grid.innerHTML = '<p class="empty-state">No works match your search.</p>';
        return;
      }

      grid.innerHTML = filtered.map(function (w) {
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

      if (window.DL_attachImageFallbacks) window.DL_attachImageFallbacks(grid);
      if (window.DL_attachReveal) window.DL_attachReveal(grid);
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
          syncUrl();
          renderFilters();
          render();
        });
      });
    }

    function syncUrl() {
      const url = new URL(location.href);
      if (active === "all") url.searchParams.delete("category");
      else url.searchParams.set("category", active);
      if (!query) url.searchParams.delete("q");
      else url.searchParams.set("q", query);
      history.replaceState({}, "", url);
    }

    // Debounced search
    let searchTimer = null;
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const v = searchInput.value.trim();
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
          if (v === query) return;
          query = v;
          syncUrl();
          render();
        }, 140);
      });
    }

    renderFilters();
    render();
  }

  if (window.DL_DATA_READY) init();
  else document.addEventListener("dl:dataready", init, { once: true });
})();
