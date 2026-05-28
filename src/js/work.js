/* Duke & Lume — Work detail page
   ---------------------------------------------------------------
   Reads ?id=<slug> from the URL, finds the matching artwork in
   GALLERY_DATA, renders the detail layout, and shows up to 4
   related works from the same collection.
   --------------------------------------------------------------- */

(function () {
  function init() {
    const mount = document.querySelector("[data-work-mount]");
    const relatedSection = document.querySelector("[data-related-section]");
    const relatedMount = document.querySelector("[data-related-mount]");
    if (!mount) return;

    const id = window.DL_query && DL_query("id");
    const works = window.GALLERY_DATA || [];
    const collections = window.COLLECTIONS_DATA || [];

    const work = id ? works.find(function (w) { return w.id === id; }) : null;

    if (!work) {
      mount.innerHTML =
        '<div class="work-detail__empty">' +
          '<div class="work-detail__eyebrow">Work not found</div>' +
          '<h1 class="work-detail__title">This piece is no longer on view.</h1>' +
          '<p class="work-detail__body">Browse the <a href="gallery.html">full gallery</a> or explore our <a href="collections.html">collections</a>.</p>' +
        '</div>';
      return;
    }

    const slug = work.category || work.collection || "";
    const collection = collections.find(function (c) { return c.slug === slug; });
    const collectionLabel = collection ? collection.title : slug;

    // Update page title + meta for share previews
    document.title = work.title + " — Duke & Lume Collection";
    setMeta('meta[name="description"]', "content", work.description || "");
    setMeta('meta[property="og:title"]', "content", work.title + " — Duke & Lume Collection");
    setMeta('meta[property="og:description"]', "content", work.description || "");
    setMeta('meta[property="og:image"]', "content", work.image || "");
    setMeta('meta[name="twitter:title"]', "content", work.title);
    setMeta('meta[name="twitter:description"]', "content", work.description || "");
    setMeta('meta[name="twitter:image"]', "content", work.image || "");

    const title = DL_escape(work.title);
    const img = DL_escape(work.image);
    const year = DL_escape(work.year || "");
    const desc = DL_escape(work.description || "");
    const idHref = DL_escape(encodeURIComponent(work.id || ""));
    const slugHref = DL_escape(encodeURIComponent(slug));
    const colLabel = DL_escape(collectionLabel);

    mount.innerHTML =
      '<div class="work-detail__media"' +
        ' data-lightbox' +
        ' data-lightbox-src="' + img + '"' +
        ' data-lightbox-caption="' + title + (year ? " — " + year : "") + '"' +
        ' data-lightbox-group="work-' + DL_escape(slug) + '"' +
        ' tabindex="0" role="button" aria-label="Zoom image">' +
        '<img src="' + img + '" alt="' + title + '" data-fallback>' +
      '</div>' +
      '<div class="work-detail__text" data-reveal>' +
        '<a href="collections.html?category=' + slugHref + '" class="work-detail__eyebrow">' + colLabel + '</a>' +
        '<h1 class="work-detail__title">' + title + '</h1>' +
        (year ? '<div class="work-detail__year">' + year + '</div>' : "") +
        '<p class="work-detail__body">' + desc + '</p>' +
        '<a href="inquire.html?work=' + idHref + '" class="btn">Inquire about this piece</a>' +
        '<a href="gallery.html" class="work-detail__back">← Back to gallery</a>' +
      '</div>';

    if (window.DL_attachImageFallbacks) window.DL_attachImageFallbacks(mount);
    if (window.DL_attachLightbox) window.DL_attachLightbox(mount);
    if (window.DL_attachReveal) window.DL_attachReveal(mount);

    // Related works: same collection, exclude current, take up to 4
    const related = works
      .filter(function (w) { return w.id !== work.id && (w.category || w.collection) === slug; })
      .slice(0, 4);

    if (related.length && relatedSection && relatedMount) {
      relatedMount.innerHTML = related.map(function (w) {
        const wTitle = DL_escape(w.title);
        const wImg = DL_escape(w.image);
        const wYear = DL_escape(w.year || "");
        const wId = DL_escape(encodeURIComponent(w.id || ""));
        return '\
          <a class="artwork-card" href="work.html?id=' + wId + '" data-reveal>\
            <div class="artwork-card__media">\
              <img src="' + wImg + '" alt="' + wTitle + '" data-fallback loading="lazy">\
            </div>\
            <h3 class="artwork-card__title">' + wTitle + '</h3>\
            <div class="artwork-card__meta">' + colLabel + (wYear ? " — " + wYear : "") + '</div>\
          </a>';
      }).join("");
      relatedSection.hidden = false;
      if (window.DL_attachImageFallbacks) window.DL_attachImageFallbacks(relatedMount);
      if (window.DL_attachReveal) window.DL_attachReveal(relatedMount);
    }
  }

  function setMeta(selector, attr, value) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  if (window.DL_DATA_READY) init();
  else document.addEventListener("dl:dataready", init, { once: true });
})();
