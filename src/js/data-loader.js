/* Duke & Lume — JSON data loader
   ---------------------------------------------------------------
   Fetches the three data files in parallel, extracts the inner
   array from each, exposes them as window.* globals, then fires
   a `dl:dataready` event so the page renderers can run.

   NOTE: opening index.html directly from disk (file://) blocks
   fetch() in most browsers. Run a local server during dev:

     python3 -m http.server 8000

   Or just use the deployed site — Decap CMS writes these JSON
   files directly and Netlify rebuilds on push.
   --------------------------------------------------------------- */

(function () {
  const listSources = [
    { url: "src/data/gallery.json",     key: "GALLERY_DATA",     field: "artworks" },
    { url: "src/data/collections.json", key: "COLLECTIONS_DATA", field: "collections" },
    { url: "src/data/journal.json",     key: "JOURNAL_DATA",     field: "entries" }
  ];
  const objectSources = [
    { url: "src/data/site.json", key: "SITE_DATA" }
  ];

  window.GALLERY_DATA     = window.GALLERY_DATA     || [];
  window.COLLECTIONS_DATA = window.COLLECTIONS_DATA || [];
  window.JOURNAL_DATA     = window.JOURNAL_DATA     || [];
  window.SITE_DATA        = window.SITE_DATA        || {};

  function loadList(src) {
    return fetch(src.url, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status + " for " + src.url);
        return r.json();
      })
      .then(function (data) {
        if (data && Array.isArray(data[src.field])) {
          window[src.key] = data[src.field];
        } else if (Array.isArray(data)) {
          window[src.key] = data;
        }
      })
      .catch(function (err) {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("[Duke & Lume] data load failed:", src.url, err && err.message ? err.message : err);
        }
      });
  }

  function loadObject(src) {
    return fetch(src.url, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status + " for " + src.url);
        return r.json();
      })
      .then(function (data) {
        if (data && typeof data === "object" && !Array.isArray(data)) {
          window[src.key] = data;
        }
      })
      .catch(function (err) {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("[Duke & Lume] data load failed:", src.url, err && err.message ? err.message : err);
        }
      });
  }

  const all = listSources.map(loadList).concat(objectSources.map(loadObject));
  Promise.all(all).then(function () {
    applySiteImages();
    window.DL_DATA_READY = true;
    document.dispatchEvent(new Event("dl:dataready"));
  });

  /* Swap any [data-site-image="<key>"] element's src to the path
     stored in site.json. Keeps the static src as fallback. */
  function applySiteImages() {
    const site = window.SITE_DATA || {};
    document.querySelectorAll("[data-site-image]").forEach(function (el) {
      const key = el.getAttribute("data-site-image");
      const val = site[key];
      if (val && el.getAttribute("src") !== val) {
        el.setAttribute("src", val);
      }
    });
  }
})();
