# Handoff — Profile Gallery

Design → engineering spec for the profile screen and photo viewer. Everything
here matches the tokens in `src/tokens/tokens.css` and the implementation in
`src/components/ProfileGallery/`. When a value here and in code disagree, code
wins and this doc is the bug.

- **Platform:** mobile-first, 390px reference width (iPhone 14). Scales up.
- **Theme:** dark only.
- **Owner:** Miranda Liang · **Status:** ready for build.

---

## 1. Screen anatomy

```
┌─────────────────────────────┐
│ status bar (device chrome)  │
├─────────────────────────────┤
│           ( 👽 )            │  ← avatar 108
│        Miranda Liang ✓      │  ← serif name + blue verified
│    @mirandaliang · 128 …    │  ← meta (muted)
│         ( Follow )          │  ← blue pill CTA, white label
│  ┌────────┐   ┌────────┐    │
│  │  tile  │   │  tile  │    │  ← 2-col gallery, 1:1 tiles
│  │  Twin  │   │ Cross… │    │
│  └────────┘   └────────┘    │
│  ┌────────┐   ┌────────┐    │
│  │ After… │   │ Lombard│    │
│  └────────┘   └────────┘    │
├─────────────────────────────┤
│  ⌂    ⚲    ▯▯    ⚡    ◍     │  ← tab bar (device chrome)
└─────────────────────────────┘
```

Alignment: header is **center-aligned**; gallery tile captions are
**left-aligned** under each tile.

> The status bar, tab bar, and phone frame are **presentation chrome**. The
> shipped `ProfileGallery` component is the region between them. In Storybook
> the frame is a decorator, not part of the component.

---

## 2. Design tokens

### Color

| Token                    | Value                     | Usage                          | On-black contrast |
| ------------------------ | ------------------------- | ------------------------------ | ----------------- |
| `--pg-color-bg`          | `#000000`                 | Screen background              | —                 |
| `--pg-color-text`        | `#ffffff`                 | Name, titles, primary text     | 21:1              |
| `--pg-color-text-muted`  | `#8e8e93`                 | Meta, captions                 | ~6.4:1 (AA ✓)     |
| `--pg-color-text-dim`    | `#636366`                 | Counter, separators (non-essential) | ~3.6:1 (see A11y note) |
| `--pg-color-link`        | `#5b8def`                 | Verified badge, CTA fill, focus ring | ~6.9:1 (AA ✓) |
| `--pg-color-pill-bg`     | `#ffffff`                 | CTA background                 | —                 |
| `--pg-color-hairline`    | `rgba(255,255,255,.08)`   | Tile inner border              | —                 |
| `--pg-color-tile-base`   | `#0d0d0f`                 | Tile background before image   | —                 |
| `--pg-color-scrim`       | `rgba(0,0,0,.92)`         | Lightbox backdrop (+ blur 24)  | —                 |

### Typography

| Role        | Family (`--pg-font-*`)             | Size / token          | Weight | Notes                    |
| ----------- | ---------------------------------- | --------------------- | ------ | ------------------------ |
| Name        | serif — Newsreader → system serif  | 30 / `--pg-text-name` | 500    | display                  |
| Meta        | sans — SF Pro / system             | 15 / `--pg-text-body` | 400    |                          |
| CTA         | sans                               | 16 / `--pg-text-cta`  | 600    |                          |
| Tile title  | sans                               | 16 / `--pg-text-tile` | 600    |                          |
| Tile caption| sans                               | 13 / `--pg-text-sub`  | 400    | muted                    |
| Avatar      | Apple Color Emoji                  | 56                    | —      | 👽 renders in color on macOS |

The name uses **Newsreader** (web font) with a native serif fallback
(`Iowan Old Style`, `Palatino`, `Georgia`). No web font is required for the
component to look correct — the fallback is deliberate.

### Radius / spacing / motion

| Token                | Value    | Token                | Value  |
| -------------------- | -------- | -------------------- | ------ |
| `--pg-radius-tile`   | 14px     | `--pg-gutter`        | 16px   |
| `--pg-radius-pill`   | 999px    | `--pg-tile-gap`      | 10px   |
| `--pg-radius-media`  | 16px     | `--pg-avatar-size`   | 108px  |
| `--pg-dur`           | 260ms    | `--pg-ease-emphasis` | `cubic-bezier(.22,1,.36,1)` |

---

## 3. Redlines

**Header** — no action bar (back, share, and more are all omitted). The header
is the first element in the scroll region, `padding-top: 14px` below the status
bar.

**Avatar** — 108 circle, radial gradient `#3a3f52 → #14151b`, inner top
highlight `inset 0 1px 0 rgba(255,255,255,.1)`, drop shadow
`0 8px 26px -12px rgba(0,0,0,.9)`. 14px below to the name.

**Name row** — name + 20px verified badge (blue, `--pg-color-link`, white knocked-out check), 8px gap, 4px below to meta. No bio line.

**CTA** — label “Follow”, height 44, padding `0 30`, full white pill with blue label (`--pg-color-link`).
Margin `18` above / `22` below.

**Gallery** — `grid-template-columns: 1fr 1fr`, gap `22px` row / `10px` column,
padding `4px 16px 24px`. Tiles are `aspect-ratio: 1/1`, radius 14, inner
hairline border. Caption block 10px below the thumb: title 16/600, then caption
13/400 muted.

**Lightbox** — media frame `min(92vw, 1000px)` at `3:2`, capped `74vh`,
radius 16, `object-fit: contain` on a black field. Caption centered 14px below;
counter 10px below that. Controls are 48 circles (44 ≤ 560px) on
`rgba(255,255,255,.1)`; close top-right `18/18`, prev/next vertically centered
`14` from the edges (`8` ≤ 560px).

---

## 4. States

| Element      | State        | Treatment                                             |
| ------------ | ------------ | ----------------------------------------------------- |
| Icon button  | hover        | bg `rgba(255,255,255,.06)`                             |
| Icon button  | active       | bg `rgba(255,255,255,.12)`                             |
| CTA          | hover        | opacity .92                                            |
| CTA          | active       | `scale(.97)`                                           |
| Tile         | active       | thumb `scale(.98)`                                     |
| Tile / any   | focus-visible| 2px `--pg-color-link` outline, 3px offset             |
| Tile image   | loading/failed | poster fallback shows underneath; `onError` keeps it |
| Viewer ctrl  | hover        | bg `rgba(255,255,255,.2)`                             |
| Viewer ctrl  | active       | `scale(.92)`                                          |
| Gallery      | empty        | grid renders no tiles (see `Empty` story)             |

**Poster fallbacks** (shown before/if a photo is missing) — one class per slot,
approximating each frame's palette: `posterSunset`, `posterBokeh`,
`posterTraffic`, `posterStreaks`. These are intentional placeholders, not final
art; they're replaced the moment the real asset loads.

---

## 5. Interaction spec

**Open** — tap/click a tile, or focus it and press `Enter`/`Space`. The viewer
opens at that photo; `onPhotoOpen(photo, index)` fires (analytics hook).

**Navigate** — prev/next buttons, `←`/`→` keys, or horizontal swipe
(> 50px) on touch. Index wraps at both ends.

**Close** — close button, `Esc`, or click/tap the scrim outside the image.

**Focus management** — on open, focus moves to the close button and is trapped
across `[close, prev, next]` via `Tab`/`Shift+Tab`. On close, focus returns to
the tile that opened the viewer. Background scroll is locked while open.

**Motion** — viewer content does a single 260ms scale-and-fade entrance. No
non-user-triggered motion elsewhere. All transitions disabled under
`prefers-reduced-motion`.

---

## 6. Accessibility checklist

- [x] Tiles are real `<button>`s — keyboard operable, correct roles.
- [x] Viewer: `role="dialog"` + `aria-modal="true"` + `aria-label`.
- [x] Focus moved in on open, trapped, and restored on close (WCAG 2.4.3).
- [x] `Esc` to dismiss; arrow keys to navigate.
- [x] Every image has descriptive `alt`; decorative posters are `aria-hidden`.
- [x] Counter is an `aria-live="polite"` region.
- [x] Visible focus indicator on all interactive elements (WCAG 2.4.7).
- [x] Hit targets ≥ 44×44 (WCAG 2.5.5).
- [x] `prefers-reduced-motion` respected.
- [x] Primary text ≥ 4.5:1 (name/titles 21:1, muted 6.4:1, link 6.9:1).

> **A11y note — `--pg-color-text-dim` (`#636366`).** ~3.6:1 on black: meets AA
> for large/non-text (3:1) but **not** normal-text AA (4.5:1). It is used only
> for the viewer counter and the middle-dot separators. If any essential body
> text needs this token, bump to `#7a7a7e` (≈4.6:1) first.

---

## 7. Responsive

- **≤ 430px** — component fills the viewport; the demo frame drops its radius
  and shadow (frame concern only, not the component).
- **≤ 560px** — viewer controls shrink to 44px and tuck to 8px from the edges.
- **Grid** stays 2-up at all widths by design (matches the reference). To go
  wider on tablet, change `grid-template-columns` to
  `repeat(auto-fill, minmax(160px, 1fr))` — single-line change, noted for later.

---

## 8. Tailwind mapping

For a Tailwind codebase, wire the tokens into `theme.extend` and use these
equivalents (the component itself ships with a CSS Module, so this is only for
teams porting it into a Tailwind design system):

```js
// tailwind.config.js → theme.extend
colors: {
  bg: "#000000",
  fg: "#ffffff",
  "fg-muted": "#8e8e93",
  "fg-dim": "#636366",
  link: "#5b8def",
},
borderRadius: { tile: "14px", media: "16px" },
transitionTimingFunction: { emphasis: "cubic-bezier(.22,1,.36,1)" },
```

| Spec                    | Tailwind                                            |
| ----------------------- | --------------------------------------------------- |
| Tile grid               | `grid grid-cols-2 gap-x-2.5 gap-y-[22px] px-4 pb-6` |
| Tile thumb              | `relative aspect-square rounded-[14px] overflow-hidden ring-1 ring-white/10` |
| Thumb image             | `absolute inset-0 h-full w-full object-cover`       |
| CTA pill                | `h-11 px-[30px] rounded-full bg-link text-white font-semibold` |
| Scrim                   | `fixed inset-0 bg-black/90 backdrop-blur-2xl`       |
| Focus ring              | `focus-visible:outline focus-visible:outline-2 focus-visible:outline-link focus-visible:outline-offset-[3px]` |

---

## 9. Changelog vs. reference

Adaptations from the source comp:

1. **Action bar removed entirely** — no back, share, or more icons; the header
   sits higher as a result.
2. **Name** → *Miranda Liang*; **meta** → `@mirandaliang · 128 Following`. The
   bio line (*Design Engineer · mirandaliang.com*) is removed.
3. **Verified badge is blue** (`--pg-color-link`); the CTA is now **Follow**,
   a blue-filled pill with white text.
4. **Avatar** → macOS alien emoji (👽) on a dark gradient.
5. **Gallery content** → the four uploaded photos: Twin Peaks (dusk cityscape),
   Crosstown (night traffic), Afterglow (out-of-focus bokeh), and Lombard (the
   Fuel 24:7 corner). Titles are editable in `profile.data.ts`.
6. **Tiles are now individually openable** — each opens the full photo in an
   accessible viewer (the source comp showed static album covers).
