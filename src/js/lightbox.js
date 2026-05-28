/* Duke & Lume — Lightbox
   ---------------------------------------------------------------
   Click any element with [data-lightbox] to zoom its image full-
   screen. Use [data-lightbox-group="..."] to link items so the
   user can navigate prev/next with arrow keys or on-screen arrows.

   Element attributes:
     data-lightbox                   marks the trigger
     data-lightbox-src="..."         image URL (falls back to inner <img src>)
     data-lightbox-caption="..."     optional caption text
     data-lightbox-group="..."       optional group key for navigation
   --------------------------------------------------------------- */

(function () {
  let overlay, imgEl, captionEl, prevBtn, nextBtn, closeBtn;
  let items = [];
  let index = 0;
  let lastFocus = null;
  let touchStartX = null;

  function ensureOverlay() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Image viewer");
    overlay.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close">×</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous image">‹</button>' +
      '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next image">›</button>' +
      '<figure class="lightbox__figure">' +
        '<img class="lightbox__img" alt="">' +
        '<figcaption class="lightbox__caption"></figcaption>' +
      '</figure>';
    document.body.appendChild(overlay);

    imgEl = overlay.querySelector(".lightbox__img");
    captionEl = overlay.querySelector(".lightbox__caption");
    prevBtn = overlay.querySelector(".lightbox__nav--prev");
    nextBtn = overlay.querySelector(".lightbox__nav--next");
    closeBtn = overlay.querySelector(".lightbox__close");

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target === imgEl.parentNode) close();
    });
    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () { step(-1); });
    nextBtn.addEventListener("click", function () { step(1); });

    overlay.addEventListener("touchstart", function (e) {
      if (e.touches && e.touches.length === 1) touchStartX = e.touches[0].clientX;
    }, { passive: true });
    overlay.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      const endX = (e.changedTouches[0] || {}).clientX;
      const dx = endX - touchStartX;
      touchStartX = null;
      if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    });
  }

  function open(item, group) {
    ensureOverlay();
    items = group;
    index = group.indexOf(item);
    if (index < 0) { items = [item]; index = 0; }
    lastFocus = document.activeElement;
    render();
    overlay.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    setTimeout(function () { closeBtn && closeBtn.focus(); }, 50);
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    document.removeEventListener("keydown", onKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function step(d) {
    if (items.length <= 1) return;
    index = (index + d + items.length) % items.length;
    render();
  }

  function render() {
    const item = items[index];
    if (!item) return;
    imgEl.src = item.src;
    imgEl.alt = item.caption || "";
    captionEl.textContent = item.caption || "";
    captionEl.style.display = item.caption ? "" : "none";
    const multi = items.length > 1;
    prevBtn.style.display = multi ? "" : "none";
    nextBtn.style.display = multi ? "" : "none";
  }

  function onKey(e) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  }

  function collect(rootEl) {
    rootEl = rootEl || document;
    const triggers = rootEl.querySelectorAll("[data-lightbox]");
    triggers.forEach(function (el) {
      if (el.dataset.dlLbBound) return;
      el.dataset.dlLbBound = "1";

      el.addEventListener("click", function (e) {
        // Skip if it's a real link/button — only intercept when the
        // element is purely decorative (image wrapper).
        if (el.tagName === "A" || el.tagName === "BUTTON") return;
        e.preventDefault();
        triggerOpen(el);
      });
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerOpen(el);
        }
      });
    });
  }

  function triggerOpen(el) {
    const group = el.getAttribute("data-lightbox-group");
    const allInGroup = group
      ? Array.prototype.slice.call(document.querySelectorAll('[data-lightbox-group="' + group + '"]'))
      : [el];

    const items = allInGroup.map(toItem);
    const self = toItem(el);
    open(self, items);
  }

  function toItem(el) {
    const innerImg = el.querySelector("img");
    return {
      src: el.getAttribute("data-lightbox-src") || (innerImg && innerImg.getAttribute("src")) || "",
      caption: el.getAttribute("data-lightbox-caption") || ""
    };
  }

  window.DL_attachLightbox = collect;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { collect(document); });
  } else {
    collect(document);
  }
})();
