import assert from "node:assert/strict";
import test from "node:test";

import { getEventHeroImage } from "../src/data/event-images";

test("uses detail image for the event page hero when provided", () => {
  const heroImage = getEventHeroImage({ image: "card-image.jpg", detailImage: "detail-image.jpg" });

  assert.equal(heroImage, "detail-image.jpg");
});

test("falls back to card image when no detail image is provided", () => {
  const heroImage = getEventHeroImage({ image: "card-image.jpg" });

  assert.equal(heroImage, "card-image.jpg");
});
