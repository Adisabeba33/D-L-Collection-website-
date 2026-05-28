# Duke & Lume Collection

A curated AI art gallery website. Static HTML + CSS + a little vanilla
JavaScript. Content is managed through **Decap CMS** at `/admin/` once
deployed to Netlify — no code editing required.

---

## Local development

The site fetches its data from JSON files, so opening `index.html`
directly with `file://` will not load content. Run any tiny local
server in the project root:

```bash
# Python (no install needed on macOS / Linux)
python3 -m http.server 8000
# then open http://localhost:8000

# Or, with Node installed
npx serve .
```

---

## Deploying to Netlify + enabling the admin panel

One-time setup, takes about 10 minutes.

### 1. Push to GitHub (already done)

The repo is at:
`https://github.com/Adisabeba33/D-L-Collection-website-`

### 2. Connect to Netlify

1. Go to <https://app.netlify.com> and sign up (free).
2. **Add new site → Import an existing project → GitHub** → pick this
   repo.
3. Build settings: leave **build command empty**, **publish directory `.`**
   — Netlify reads `netlify.toml` so this is already correct.
4. Hit **Deploy**. Within a minute you'll have a live URL like
   `dukeandlume.netlify.app` (rename in **Site settings → Domain
   management** if you like).

### 3. Turn on Netlify Identity (login system)

In the Netlify dashboard for the site:

1. **Site configuration → Identity → Enable Identity**
2. Under **Registration**, set it to **Invite only** — that means
   only people you invite can log in.
3. Under **Services → Git Gateway**, click **Enable Git Gateway**.
   This lets the admin panel write back to your GitHub repo.

### 4. Invite yourself

1. **Identity → Invite users** → enter your email
   (`dukekartel88@gmail.com`).
2. Check your inbox, click the invitation link, set a password.
3. You'll be redirected to `/admin/` and logged in. Done.

### 5. Use the admin

From now on, just go to `https://your-site.netlify.app/admin/`,
log in, and edit. Every save commits to the `main` branch on GitHub
and Netlify rebuilds the live site in ~30 seconds.

---

## The admin panel — what you can do

`/admin/` shows three sections in the sidebar:

### Artworks
- **+ Add Artwork** — drag-and-drop image, fill in title / category /
  description / year, toggle **Feature on home page**, hit **Publish**.
- Edit or delete existing works.
- Category determines which Collection page it appears on. Use the same
  slug as the matching collection (handled by the dropdown).

### Collections
- Add / edit the five gallery categories.
- Set the cover image, title, slug, description, count.
- **Slug must match** what artworks use in their Category field.

### Journal
- Editorial entries shown on the Journal page and previewed on the
  home page.

### Where files land
- Artwork images → `src/assets/images/artworks/`
- Collection cover images → `src/assets/images/collections/`
- Journal images → `src/assets/images/journal/`
- Other uploads → `src/assets/images/uploads/`

You never have to think about these — Decap handles it.

---

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — two-column editorial spread |
| `gallery.html` | All works with collection filter chips |
| `collections.html` | Collections grid; `?category=slug` shows works in that collection |
| `about.html` | About, license, terms, FAQ |
| `journal.html` | Journal entries |
| `inquire.html` | Contact form (Netlify Forms) |
| `thank-you.html` | Post-submit landing page |
| `admin/index.html` | Decap CMS UI |

---

## Hero / Vision / Quote images (editable via CMS)

The three big editorial images on the home page are now controlled
through **Site Settings** in the admin panel:

- **Hero image** — the wide image behind the home headline
- **Vision section image** — the "Our Vision" block
- **Quote background image** — the "Every piece tells a story" block

Open `/admin/` → **Site Settings → Site** → swap any of the three.
The site loads the paths from `src/data/site.json` at runtime, so
your changes are live within seconds of publishing.

The static `<img src>` values in `index.html` are kept as fallback —
if `site.json` is missing or a field is empty, the original file is
used.

## Social preview images (Open Graph / Twitter Cards)

Every page links to `/src/assets/images/og/og-default.jpg` for
social shares. Drop a single 1200×630 JPG at that path and links
will render with a preview card on Instagram, Telegram, iMessage,
Twitter/X, LinkedIn, etc.

(Per-page OG images can be added later — say the word.)

## Contact form

`inquire.html` submits through **Netlify Forms** — submissions show
up in your Netlify dashboard under **Forms** and can be emailed to
you on every new entry (configure in Netlify → Forms → Notifications).

No backend, no API keys, no signup elsewhere. Free for 100 form
submissions per month on the free Netlify tier.

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
├── netlify.toml
├── admin/
│   ├── index.html             # Decap CMS loader
│   └── config.yml             # admin schema
└── src/
    ├── css/styles.css
    ├── js/
    │   ├── main.js            # nav, year, image fallbacks, helpers
    │   ├── data-loader.js     # fetches JSON → window globals → event
    │   ├── home.js            # collections preview row
    │   ├── home-featured.js   # featured artworks grid
    │   ├── home-journal.js    # journal preview
    │   ├── gallery.js         # full gallery + filter chips
    │   ├── collections.js     # collections grid + ?category= view
    │   └── journal.js         # journal listing
    ├── data/
    │   ├── gallery.json       # written by CMS
    │   ├── collections.json   # written by CMS
    │   ├── journal.json       # written by CMS
    │   └── site.json          # written by CMS (Site Settings → home images)
    └── assets/images/
        ├── hero/
        ├── vision/
        ├── collections/
        ├── artworks/
        ├── journal/
        ├── og/                 # 1200×630 social preview image
        └── uploads/            # catch-all for Decap uploads
```

---

## If an image is missing

The layout doesn't break — a soft "DUKE & LUME" placeholder card is
shown in its place. The site also auto-tries `.jpeg` if `.jpg` 404s,
and vice versa.

---

## Design notes

- Ivory / cream palette (`#f6f1e8`), black ink, soft taupe accents.
- Cormorant Garamond display + Inter body + Dancing Script for the
  signature, all from Google Fonts.
- Wide whitespace, thin type, no heavy shadows, subtle hover zoom.
- Sticky translucent header, no separate menu button.
- Two-column editorial spread on the home page (collapses gracefully
  to single column under 1180px).
