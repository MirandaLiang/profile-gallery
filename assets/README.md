# Assets

The four photos are the web-optimized copies (long edge ~2000px, sRGB) that the
React component loads from `/public/assets/…`
(see `src/components/ProfileGallery/profile.data.ts`).

| Filename        | Slot | Title      | Caption                 |
| --------------- | ---- | ---------- | ----------------------- |
| `DSC06136.JPG`  | 1    | Twin Peaks | Dusk over the city      |
| `DSC02319.jpeg` | 2    | Crosstown  | Traffic at a standstill |
| `DSC06140.JPG`  | 3    | Afterglow  | Lights, out of focus    |
| `DSC02322.jpeg` | 4    | Lombard    | Fuel, any hour          |

To swap in full-resolution originals, replace these files (keep the names) or
update the paths in `profile.data.ts`. The standalone `index.html` embeds the
same images inline, so it needs no assets folder.
