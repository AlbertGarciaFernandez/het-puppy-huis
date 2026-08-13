export const GALLERY_PHOTOS_BATCH_SIZE = 18;

export function getVisiblePhotos<T>(photos: T[], visibleCount: number) {
  return photos.slice(0, visibleCount);
}

export function getNextVisiblePhotoCount(currentCount: number, totalCount: number) {
  return Math.min(currentCount + GALLERY_PHOTOS_BATCH_SIZE, totalCount);
}
