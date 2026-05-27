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
  const sources = [
    { url: "src/data/gallery.json",     key: "GALLERY_DATA",     field: "artworks" },
    { url: "src/data/collections.json", key: "COLLECTIONS_DATA", field: "collections" },
    { url: "src/data/journal.json",     key: "JOURNAL_DATA",     field: "entries" }
  ];

  window.GALLERY_DATA     = window.GALLERY_DATA     || [];
  window.COLLECTIONS_DATA = window.COLLECTIONS_DATA || [];
  window.JOURNAL_DATA     = window.JOURNAL_DATA     || [];

  function loadOne(src) {
    return fetch(src.url, { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (data && Array.isArray(data[src.field])) {
          window[src.key] = data[src.field];
        } else if (Array.isArray(data)) {
          window[src.key] = data;
        }
      })
      .catch(function () { /* leave defaults */ });
  }

  Promise.all(sources.map(loadOne)).then(function () {
    window.DL_DATA_READY = true;
    document.dispatchEvent(new Event("dl:dataready"));
  });
})();
