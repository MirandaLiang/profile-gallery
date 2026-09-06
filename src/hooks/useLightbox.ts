import { useCallback, useEffect, useRef, useState } from "react";

export interface UseLightboxResult {
  isOpen: boolean;
  index: number;
  open: (index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

/**
 * Owns viewer state for a gallery of `count` items:
 * open/close, current index (wrapping), body scroll lock, and focus
 * restoration to the element that opened the viewer.
 */
export function useLightbox(count: number): UseLightboxResult {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = useCallback((i: number) => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setIndex(i);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Return focus to the tile that opened the viewer (WCAG 2.4.3).
    lastFocused.current?.focus?.();
  }, []);

  const next = useCallback(
    () => setIndex((i) => (count ? (i + 1) % count : 0)),
    [count],
  );
  const prev = useCallback(
    () => setIndex((i) => (count ? (i - 1 + count) % count : 0)),
    [count],
  );

  // Lock background scroll while the viewer is open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  return { isOpen, index, open, close, next, prev };
}
