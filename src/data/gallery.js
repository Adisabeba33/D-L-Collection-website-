/* Duke & Lume — Gallery data
   ---------------------------------------------------------------
   Add a new artwork by appending an object to the array below.
   Keep this file in sync with src/data/gallery.json.
   Fields:
     id          : unique slug (kebab-case)
     title       : display title
     category    : matches a collection slug (e.g. "lifestyle")
     collection  : same as category, kept for clarity
     image       : path to image file inside src/assets/images/artworks/
     year        : year string
     description : short editorial description
     featured    : (optional) true to pin to home page Featured grid
   --------------------------------------------------------------- */

window.GALLERY_DATA = [
  {
    "id": "beach-diva",
    "title": "Beach Diva",
    "category": "lifestyle",
    "collection": "lifestyle",
    "image": "src/assets/images/artworks/beach-diva.jpg",
    "year": "2026",
    "description": "A luxury editorial beach portrait with bold character and soft coastal light.",
    "featured": true
  },
  {
    "id": "bath-icon",
    "title": "Bath Icon",
    "category": "lifestyle",
    "collection": "lifestyle",
    "image": "src/assets/images/artworks/bath-icon.jpg",
    "year": "2026",
    "description": "Editorial bath portrait — soft towel turban, quiet morning light.",
    "featured": true
  },
  {
    "id": "villa-sunset",
    "title": "Villa at Sunset",
    "category": "cinematic",
    "collection": "cinematic",
    "image": "src/assets/images/artworks/villa-sunset.jpg",
    "year": "2026",
    "description": "Pink stucco, palms, last light — a frame from an unfilmed film.",
    "featured": true
  },
  {
    "id": "noir-reader",
    "title": "The Noir Reader",
    "category": "portraits",
    "collection": "portraits",
    "image": "src/assets/images/artworks/noir-reader.jpg",
    "year": "2026",
    "description": "Hat, newspaper, a held breath — a study in restraint.",
    "featured": true
  },
  {
    "id": "abstract-bloom",
    "title": "Abstract Bloom",
    "category": "abstract",
    "collection": "abstract",
    "image": "src/assets/images/artworks/abstract-bloom.jpg",
    "year": "2026",
    "description": "Pigment as petal — gestural color, no subject required.",
    "featured": true
  },
  {
    "id": "convertible-icon",
    "title": "Convertible Icon",
    "category": "pop-culture",
    "collection": "pop-culture",
    "image": "src/assets/images/artworks/convertible-icon.jpg",
    "year": "2026",
    "description": "A pop culture reference, reframed — sun, chrome, attitude.",
    "featured": true
  }
];
