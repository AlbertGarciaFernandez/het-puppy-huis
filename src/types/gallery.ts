export type GalleryAlbumSummary = {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  accessDurationMinutes: number;
};

export type GalleryPhoto = {
  id: string;
  imageUrl: string;
  downloadUrl: string;
  reportUrl: string;
};

export type GalleryAlbumDetail = GalleryAlbumSummary & {
  photos: GalleryPhoto[];
};

export type UnlockAlbumResponse = {
  sessionToken: string;
  expiresAt: number;
  accessDurationMinutes: number;
};
