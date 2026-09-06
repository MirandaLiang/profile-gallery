/** A single gallery item. */
export interface Photo {
  /** Stable id — used as the React key and as an analytics slug. */
  id: string;
  /** Full-resolution asset path, relative to the app's public root. */
  src: string;
  /** Alt text describing the photo. Required for screen readers. */
  alt: string;
  /** Title shown beneath the tile and in the viewer. */
  title: string;
  /** One-line caption / meta shown under the title. */
  caption: string;
  /**
   * Optional CSS class for the fallback poster rendered behind the image.
   * Shown until the asset loads, and kept visible if it fails to load.
   */
  posterClassName?: string;
}

/** Profile header content. */
export interface ProfileData {
  name: string;
  /** Without the leading "@". */
  handle: string;
  /** Pre-formatted, e.g. "128". */
  followingCount: string;
  /** Emoji rendered as the avatar (macOS renders 👽 in Apple Color Emoji). */
  avatarEmoji: string;
  verified?: boolean;
}

export interface ProfileGalleryProps {
  profile: ProfileData;
  photos: Photo[];
  /** Fires when the primary CTA is pressed. */
  onFollow?: () => void;
  /** Fires when a photo is opened in the viewer. */
  onPhotoOpen?: (photo: Photo, index: number) => void;
  className?: string;
}
