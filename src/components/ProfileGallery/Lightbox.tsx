import { useEffect, useRef, useState } from "react";
import type { Photo } from "./types";
import styles from "./ProfileGallery.module.css";

interface LightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const SWIPE_THRESHOLD = 50;

/**
 * Modal photo viewer. Implements the WAI-ARIA dialog pattern:
 * role="dialog" + aria-modal, focus moved in on open, focus trapped to the
 * controls, Escape / arrow-key handling, and focus restored on close
 * (restoration lives in useLightbox).
 */
export function Lightbox({ photos, index, onClose, onNext, onPrev }: LightboxProps) {
  const photo = photos[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const [failed, setFailed] = useState(false);

  // Reset the image-failed flag whenever the active photo changes.
  useEffect(() => setFailed(false), [index]);

  // Move focus to the close button when the viewer opens.
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Keyboard: Escape, arrows, and a simple focus trap across the controls.
  useEffect(() => {
    const order = [closeRef, prevRef, nextRef];

    function handleKey(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          onNext();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "Tab": {
          e.preventDefault();
          const els = order.map((r) => r.current).filter(Boolean) as HTMLElement[];
          const active = document.activeElement as HTMLElement;
          const i = els.indexOf(active);
          const dir = e.shiftKey ? -1 : 1;
          const target = els[(i + dir + els.length) % els.length] ?? els[0];
          target?.focus();
          break;
        }
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  function handleTouchStart(e: React.TouchEvent) {
    touchX.current = e.changedTouches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) (dx < 0 ? onNext : onPrev)();
    touchX.current = null;
  }

  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        ref={closeRef}
        type="button"
        className={`${styles.lbBtn} ${styles.lbClose}`}
        onClick={onClose}
        aria-label="Close viewer"
      >
        <CloseIcon />
      </button>
      <button
        ref={prevRef}
        type="button"
        className={`${styles.lbBtn} ${styles.lbPrev}`}
        onClick={onPrev}
        aria-label="Previous photo"
      >
        <ChevronIcon dir="left" />
      </button>
      <button
        ref={nextRef}
        type="button"
        className={`${styles.lbBtn} ${styles.lbNext}`}
        onClick={onNext}
        aria-label="Next photo"
      >
        <ChevronIcon dir="right" />
      </button>

      <figure className={styles.lbFigure}>
        <div className={styles.lbMedia}>
          {photo.posterClassName && (
            <span
              className={`${styles.poster} ${styles[photo.posterClassName] ?? ""}`}
              aria-hidden="true"
            />
          )}
          {!failed && (
            <img
              className={styles.lbImg}
              src={photo.src}
              alt={photo.alt}
              onError={() => setFailed(true)}
            />
          )}
        </div>
        <figcaption className={styles.lbCaption}>
          <span className={styles.lbTitle}>{photo.title}</span>
          <span className={styles.lbSub}>{photo.caption}</span>
        </figcaption>
        <p className={styles.lbCounter} aria-live="polite">
          {index + 1} / {photos.length}
        </p>
      </figure>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} />
    </svg>
  );
}
