/* Duke & Lume — Scroll reveal
   ---------------------------------------------------------------
   Adds an `is-revealed` class to elements with [data-reveal] when
   they enter the viewport. Pair with the CSS rule that fades and
   lifts them. Honors prefers-reduced-motion.

   Optional attributes:
     data-reveal-delay="ms"   stagger one element by N ms
   --------------------------------------------------------------- */

(function () {
  const reduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // If IntersectionObserver is unavailable or user prefers reduced motion,
  // reveal everything immediately.
  function revealAll(scope) {
    (scope || document).querySelectorAll("[data-reveal]").forEach(function (el) {
      el.classList.add("is-revealed");
    });
  }

  if (reduced || !("IntersectionObserver" in window)) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { revealAll(); });
    } else {
      revealAll();
    }
    window.DL_attachReveal = revealAll;
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
      if (delay > 0) {
        setTimeout(function () { el.classList.add("is-revealed"); }, delay);
      } else {
        el.classList.add("is-revealed");
      }
      observer.unobserve(el);
    });
  }, {
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.08
  });

  function attach(scope) {
    (scope || document).querySelectorAll("[data-reveal]:not(.is-revealed)").forEach(function (el) {
      if (el.dataset.dlReveal) return;
      el.dataset.dlReveal = "1";
      observer.observe(el);
    });
  }

  window.DL_attachReveal = attach;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { attach(document); });
  } else {
    attach(document);
  }
})();
