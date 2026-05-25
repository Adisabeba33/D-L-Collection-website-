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
   --------------------------------------------------------------- */

window.GALLERY_DATA = [
  {
    "id": "beach-diva",
    "title": "Beach Diva",
    "category": "lifestyle",
    "collection": "lifestyle",
    "image": "src/assets/images/artworks/beach-diva.jpg",
    "year": "2026",
    "description": "A luxury editorial beach portrait with bold character and soft coastal light."
  }
];
