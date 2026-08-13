import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("contact forms expose accessible labels and explicit button types", async () => {
  const contact = await readFile("src/pages/Contact.tsx", "utf8");

  assert.match(contact, /htmlFor="newsletter-email"/);
  assert.match(contact, /id="newsletter-email"/);
  assert.match(contact, /htmlFor="booking-name"/);
  assert.match(contact, /id="booking-name"/);
  assert.match(contact, /htmlFor="booking-email"/);
  assert.match(contact, /id="booking-email"/);
  assert.match(contact, /htmlFor="booking-topic"/);
  assert.match(contact, /id="booking-topic"/);
  assert.match(contact, /htmlFor="booking-message"/);
  assert.match(contact, /id="booking-message"/);
  assert.match(contact, /type="submit"/);
});

test("photo lightbox dialog has an accessible name", async () => {
  const lightbox = await readFile("src/components/PhotoLightbox.tsx", "utf8");

  assert.match(lightbox, /role="dialog"/);
  assert.match(lightbox, /aria-label="Photo viewer"/);
});
