import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import test from "node:test";

const maxHeroImageBytes = 1_500_000;
const maxHeroVideoBytes = 10_000_000;

test("large hero image assets stay web-sized", async () => {
  const image = await stat("src/assets/DSC02400_VSCO.jpeg");

  assert.ok(
    image.size <= maxHeroImageBytes,
    `DSC02400_VSCO.jpeg is ${image.size} bytes, expected <= ${maxHeroImageBytes}`,
  );
});

test("mansion hero video stays web-sized", async () => {
  const video = await stat("src/assets/replicate-prediction-x2e9yrzhg1rmt0cytgzbapsg70.mp4");

  assert.ok(
    video.size <= maxHeroVideoBytes,
    `Mansion hero video is ${video.size} bytes, expected <= ${maxHeroVideoBytes}`,
  );
});
