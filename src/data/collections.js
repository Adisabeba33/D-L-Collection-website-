/* Duke & Lume — Collections data
   ---------------------------------------------------------------
   Add or edit a collection by editing the array below.
   Keep this file in sync with src/data/collections.json.
   Fields:
     title       : display title
     slug        : URL slug used for filtering (matches artwork.category)
     count       : optional, number of works in collection (display only)
     image       : path to representative image
     description : short editorial line
   --------------------------------------------------------------- */

window.COLLECTIONS_DATA = [
  {
    "title": "Lifestyle",
    "slug": "lifestyle",
    "count": 24,
    "image": "src/assets/images/collections/lifestyle.jpg",
    "description": "Editorial scenes, luxury moments, and character-driven visual stories."
  },
  {
    "title": "Portraits",
    "slug": "portraits",
    "count": 18,
    "image": "src/assets/images/collections/portraits.jpg",
    "description": "Intimate, character-driven studies in light, mood, and identity."
  },
  {
    "title": "Cinematic Scenes",
    "slug": "cinematic",
    "count": 27,
    "image": "src/assets/images/collections/cinematic.jpg",
    "description": "Frames pulled from imagined films — atmospheric, narrative, painterly."
  },
  {
    "title": "Abstract",
    "slug": "abstract",
    "count": 20,
    "image": "src/assets/images/collections/abstract.jpg",
    "description": "Texture, form, and color as the only language."
  },
  {
    "title": "Pop Culture",
    "slug": "pop-culture",
    "count": 16,
    "image": "src/assets/images/collections/pop-culture.jpg",
    "description": "Icons, references, and reinterpretations from contemporary culture."
  }
];
