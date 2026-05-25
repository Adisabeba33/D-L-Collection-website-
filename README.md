# Duke & Lume Collection

A curated AI art gallery website. Static HTML, CSS, and a tiny bit of vanilla
JavaScript. No build step, no backend, no database.

---

## Running locally

Just open `index.html` in any modern browser. That's it.

Optional (recommended for cleaner URLs and parity with production):

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

Drop the whole folder into Netlify, Vercel, GitHub Pages, or any static host.
No configuration needed — everything is relative-path.

---

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, vision, collections preview, value row |
| `gallery.html` | All works with collection filter chips |
| `collections.html` | Collections grid; `?category=slug` shows works in that collection |
| `about.html` | About, license, terms, FAQ (anchor sections) |
| `journal.html` | Journal entries |
| `inquire.html` | Contact form (mailto-based); pre-fills `?work=id` |

---

## Adding artworks

1. Drop the JPG into `src/assets/images/artworks/`. Use a clean filename like
   `beach-diva.jpg`. `.jpeg` works too — the site auto-falls-back between
   `.jpg` ↔ `.jpeg`.
2. Open **`src/data/gallery.js`** and append a new object to the array:

   ```js
   {
     "id": "beach-diva",
     "title": "Beach Diva",
     "category": "lifestyle",
     "collection": "lifestyle",
     "image": "src/assets/images/artworks/beach-diva.jpg",
     "year": "2026",
     "description": "A luxury editorial beach portrait with bold character and soft coastal light."
   }
   ```

3. (Optional) Mirror the same object into `src/data/gallery.json` if you want
   the JSON kept in sync for future tooling. The website itself reads from
   `gallery.js`.
4. Save, refresh. The work now appears on Gallery, on the matching Collection,
   and contributes to the count on the home preview.

> **Why `.js` and `.json` both?** Opening `index.html` directly from the
> filesystem (file://) blocks `fetch()` from reading JSON in most browsers.
> The `.js` mirror solves that — it's identical data, just wrapped in
> `window.GALLERY_DATA = [ … ];` so it works offline and on any host.

---

## Adding / editing collections

Edit **`src/data/collections.js`** (and mirror to `collections.json` if you
want). The `slug` is what links cards to filters — it must match the
`category` value on each artwork.

```js
{
  "title": "Lifestyle",
  "slug": "lifestyle",
  "count": 1,
  "image": "src/assets/images/collections/lifestyle.jpg",
  "description": "Editorial scenes, luxury moments, and character-driven visual stories."
}
```

Collection cover image goes in `src/assets/images/collections/<slug>.jpg`.

The `count` field is shown on cards but is not auto-recalculated — update it
manually, or set it to `0` and the Collections page will compute from
gallery data.

---

## Adding journal entries

Edit `src/data/journal.js`. Images live in `src/assets/images/journal/`.

---

## Image folders

```
src/assets/images/
├── hero/         # full-bleed home hero  (hero.jpg)
├── vision/       # vision section image  (vision.jpg)
├── collections/  # one cover per collection slug (<slug>.jpg)
├── artworks/     # every individual artwork file
└── journal/      # journal entry images
```

If an image is missing, the layout does not break — a soft "DUKE & LUME"
placeholder card is shown in its place.

---

## File map

```
.
├── index.html
├── gallery.html
├── collections.html
├── about.html
├── journal.html
├── inquire.html
└── src/
    ├── css/styles.css
    ├── js/
    │   ├── main.js          # nav, year, image fallbacks, helpers
    │   ├── home.js          # collections preview row
    │   ├── gallery.js       # full gallery + filter chips
    │   ├── collections.js   # collections grid + ?category= view
    │   └── journal.js       # journal listing
    └── data/
        ├── gallery.js       # ← edit this to add artworks
        ├── gallery.json     # JSON mirror (reference)
        ├── collections.js   # ← edit this to add/change collections
        ├── collections.json # JSON mirror (reference)
        └── journal.js
```

---

## Design notes

- Ivory / cream palette (`#f6f1e8`), black ink, soft taupe accents.
- Cormorant Garamond display + Inter body, both from Google Fonts.
- Wide whitespace, thin type, no heavy shadows, subtle hover zoom on images.
- Desktop home preview is a 5-up row; mobile becomes a horizontal swipe.
- Sticky translucent header, no separate menu button.
