import assert from "node:assert/strict";
import test from "node:test";

import { GALLERY_PHOTOS_BATCH_SIZE, getNextVisiblePhotoCount, getVisiblePhotos } from "../src/lib/gallery-pagination";

test("getVisiblePhotos returns only the requested number of photos", () => {
  const photos = Array.from({ length: GALLERY_PHOTOS_BATCH_SIZE + 5 }, (_, index) => ({ id: String(index) }));

  assert.equal(getVisiblePhotos(photos, GALLERY_PHOTOS_BATCH_SIZE).length, GALLERY_PHOTOS_BATCH_SIZE);
});

test("getNextVisiblePhotoCount grows by one batch without exceeding total photos", () => {
  assert.equal(getNextVisiblePhotoCount(18, 94), 36);
  assert.equal(getNextVisiblePhotoCount(90, 94), 94);
});
