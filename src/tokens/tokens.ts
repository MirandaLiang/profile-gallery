/**
 * Typed mirror of tokens.css for use in JS/TS (analytics, tests, Storybook
 * controls). Keep in sync with tokens.css — it is the source of truth for
 * anything that renders.
 */
export const color = {
  bg: "#000000",
  text: "#ffffff",
  textMuted: "#8e8e93",
  textDim: "#636366",
  link: "#5b8def",
  pillBg: "#ffffff",
  hairline: "rgba(255,255,255,0.08)",
  tileBase: "#0d0d0f",
  scrim: "rgba(0,0,0,0.92)",
} as const;

export const radius = {
  tile: 14,
  pill: 999,
  media: 16,
} as const;

export const motion = {
  easeEmphasis: "cubic-bezier(0.22, 1, 0.36, 1)",
  duration: 260,
} as const;

export type Color = keyof typeof color;
