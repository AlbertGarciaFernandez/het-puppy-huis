import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("GalleryAlbum delegates major UI sections to focused components", async () => {
  const galleryAlbum = await readFile("src/pages/GalleryAlbum.tsx", "utf8");

  assert.match(galleryAlbum, /<GalleryAlbumNav/);
  assert.match(galleryAlbum, /<GalleryAlbumHero/);
  assert.match(galleryAlbum, /<GalleryPhotoGrid/);
  assert.match(galleryAlbum, /<PhotoLightbox/);
  assert.ok(galleryAlbum.split("\n").length <= 240, "GalleryAlbum should stay below 240 lines");
});

test("GalleryAlbum uses named lightbox handlers", async () => {
  const galleryAlbum = await readFile("src/pages/GalleryAlbum.tsx", "utf8");

  assert.match(galleryAlbum, /function handlePreviousPhoto/);
  assert.match(galleryAlbum, /function handleNextPhoto/);
  assert.doesNotMatch(galleryAlbum, /onPrevious=\{\(\) => setSelectedIndex/);
  assert.doesNotMatch(galleryAlbum, /onNext=\{\(\) => setSelectedIndex/);
});
