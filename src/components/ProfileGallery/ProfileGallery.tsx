import { GalleryTile } from "./GalleryTile";
import { Lightbox } from "./Lightbox";
import { useLightbox } from "../../hooks/useLightbox";
import type { ProfileGalleryProps } from "./types";
import styles from "./ProfileGallery.module.css";

/**
 * Profile screen with an interactive photo gallery. Tapping a tile opens a
 * full-screen, accessible viewer.
 *
 * This is the *screen* only — no device frame. Wrap it in your own frame for
 * demos (see ProfileGallery.stories.tsx).
 */
export function ProfileGallery({
  profile,
  photos,
  onFollow,
  onPhotoOpen,
  className,
}: ProfileGalleryProps) {
  const viewer = useLightbox(photos.length);

  function handleOpen(index: number) {
    viewer.open(index);
    onPhotoOpen?.(photos[index], index);
  }

  return (
    <div className={`${styles.screen} ${className ?? ""}`}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.avatar} role="img" aria-label="Alien avatar">
          {profile.avatarEmoji}
        </div>

        <div className={styles.nameRow}>
          <h1 className={styles.name}>{profile.name}</h1>
          {profile.verified && (
            <span className={styles.verified} aria-label="Verified account" title="Verified">
              <VerifiedIcon />
            </span>
          )}
        </div>

        <p className={styles.meta}>
          @{profile.handle} · {profile.followingCount} Following
        </p>

        <button type="button" className={styles.cta} onClick={onFollow}>
          Follow
        </button>
      </header>

      {/* Gallery */}
      <main className={styles.grid} aria-label="Photo gallery">
        {photos.map((photo, i) => (
          <GalleryTile key={photo.id} photo={photo} onOpen={() => handleOpen(i)} />
        ))}
      </main>

      {viewer.isOpen && (
        <Lightbox
          photos={photos}
          index={viewer.index}
          onClose={viewer.close}
          onNext={viewer.next}
          onPrev={viewer.prev}
        />
      )}
    </div>
  );
}

function VerifiedIcon() {
  // Seal is tinted via CSS `color` on .verified; the check is knocked out white.
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5l2.4 1.8 3-.2 1 2.8 2.6 1.5-.7 2.9L22 12l-2.7 1.7.7 2.9-2.6 1.5-1 2.8-3-.2L12 22.5l-2.4-1.8-3 .2-1-2.8L3 16.6l.7-2.9L1 12l2.7-1.7L3 7.4l2.6-1.5 1-2.8 3 .2L12 1.5z" />
      <path d="M10.6 14.6 8.2 12.2l-1.1 1.1 3.5 3.5 6-6-1.1-1.1-4.9 4.9z" fill="#fff" />
    </svg>
  );
}
