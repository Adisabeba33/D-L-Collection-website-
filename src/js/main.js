/* Duke & Lume — Shared utilities + global UI
   --------------------------------------------------------------- */

(function () {
  // Mark active nav link based on current page
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("is-active");
    }
  });

  // Update copyright year
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("is-open"));
  }
})();

/* Image fallback: if image fails to load, swap to a placeholder block */
window.DL_attachImageFallbacks = function (root) {
  const scope = root || document;
  scope.querySelectorAll("img[data-fallback]").forEach((img) => {
    img.addEventListener("error", function handler() {
      const src = img.getAttribute("src") || "";
      // Try .jpeg if .jpg failed (and vice versa) — once
      if (!img.dataset.triedAlt) {
        img.dataset.triedAlt = "1";
        if (/\.jpg$/i.test(src)) {
          img.src = src.replace(/\.jpg$/i, ".jpeg");
          return;
        }
        if (/\.jpeg$/i.test(src)) {
          img.src = src.replace(/\.jpeg$/i, ".jpg");
          return;
        }
      }
      // Replace with placeholder
      const ph = document.createElement("div");
      ph.className = "image-placeholder";
      ph.style.width = "100%";
      ph.style.height = "100%";
      ph.style.position = "absolute";
      ph.style.inset = "0";
      const parent = img.parentNode;
      if (parent) {
        parent.style.position = parent.style.position || "relative";
        parent.appendChild(ph);
      }
      img.style.opacity = "0";
    }, { once: true });
  });
};

/* Small helper: read ?key=value query param */
window.DL_query = function (key) {
  const params = new URLSearchParams(location.search);
  return params.get(key);
};

/* Escape HTML for safe insertion */
window.DL_escape = function (s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};
