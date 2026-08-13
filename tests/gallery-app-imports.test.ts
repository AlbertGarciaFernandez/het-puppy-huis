import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("gallery app does not import sharp watermarking at module startup", async () => {
  const galleryApp = await readFile("server/lib/gallery-app.ts", "utf8");

  assert.doesNotMatch(galleryApp, /^import \{.*from "\.\/gallery-watermark"/m);
  assert.match(galleryApp, /import\("\.\/gallery-watermark"\)/);
});
