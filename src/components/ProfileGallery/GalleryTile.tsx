import { useState } from "react";
import type { Photo } from "./types";
import styles from "./ProfileGallery.module.css";

interface GalleryTileProps {
  photo: Photo;
  onOpen: () => void;
}

/**
 * A single tappable tile: square thumbnail with a graceful poster fallback,
 * plus title and caption. Rendered as a <button> so it is keyboard- and
 * screen-reader-operable by default.
 */
export function GalleryTile({ photo, onOpen }: GalleryTileProps) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      className={styles.tile}
      onClick={onOpen}
      aria-label={`Open ${photo.title}. ${photo.caption}`}
    >
      <span className={styles.thumb}>
        {photo.posterClassName && (
          <span
            className={`${styles.poster} ${styles[photo.posterClassName] ?? ""}`}
            aria-hidden="true"
          />
        )}
        {!failed && (
          <img
            className={styles.thumbImg}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </span>
      <span className={styles.caption}>
        <span className={styles.tileTitle}>{photo.title}</span>
        <span className={styles.tileSub}>{photo.caption}</span>
      </span>
    </button>
  );
}
