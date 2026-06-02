# Featured Collections images

Drop replacement images here using these exact filenames so captions on the home page stay in sync:

| Filename | Home page caption |
|----------|-------------------|
| `bridal-lehenga.png` | Bridal Lehenga |
| `groom-sherwani.png` | Groom Sherwani |
| `indo-western.png` | Indo-Western Fusion |
| `party-wear.png` | Party Wear |
| `kids-ethnic.png` | Kids Ethnic |
| `western-formals.png` | Western Formals |

Recommended: portrait or 3:4 ratio, at least 1200×1600px. PNG or JPG both work — if you use JPG, update paths in `src/lib/data.ts` (`featuredCollections`).

**Framing tip:** Keep faces in the upper third of the image. Crop/focus is tuned in `src/lib/data.ts` via `imagePosition` (e.g. `center 8%`) if a swap still cuts heads.
