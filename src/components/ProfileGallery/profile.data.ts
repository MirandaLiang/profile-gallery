import type { Photo, ProfileData } from "./types";

export const profile: ProfileData = {
  name: "Miranda Liang",
  handle: "mirandaliang",
  followingCount: "128",
  avatarEmoji: "👽",
  verified: true,
};

/**
 * Each entry maps one uploaded file to a gallery slot. Drop the four
 * originals into `/public/assets` with the filenames below (see README).
 * `posterClassName` references the fallback gradients in
 * ProfileGallery.module.css so the grid looks intentional before the
 * real assets are present.
 */
export const photos: Photo[] = [
  {
    id: "twin-peaks",
    src: "/assets/DSC06136.JPG",
    alt: "City skyline at dusk with an orange horizon over silhouetted buildings",
    title: "Twin Peaks",
    caption: "Dusk over the city",
    posterClassName: "posterSunset",
  },
  {
    id: "crosstown",
    src: "/assets/DSC02319.jpeg",
    alt: "Night traffic with red tail lights and a green signal, softly blurred",
    title: "Crosstown",
    caption: "Traffic at a standstill",
    posterClassName: "posterTraffic",
  },
  {
    id: "afterglow",
    src: "/assets/DSC06140.JPG",
    alt: "Warm out-of-focus street lights forming soft bokeh circles",
    title: "Afterglow",
    caption: "Lights, out of focus",
    posterClassName: "posterBokeh",
  },
  {
    id: "lombard",
    src: "/assets/DSC02322.jpeg",
    alt: "A Fuel 24:7 gas station lit at night at the Lombard Street corner, red signals glowing",
    title: "Lombard",
    caption: "Fuel, any hour",
    posterClassName: "posterStreaks",
  },
];
