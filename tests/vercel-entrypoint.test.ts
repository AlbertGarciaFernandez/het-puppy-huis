import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Vercel API entrypoint exports an explicit request handler", async () => {
  const entrypoint = await readFile("api/index.ts", "utf8");

  assert.match(entrypoint, /export default async function handler/);
  assert.match(entrypoint, /import\("\.\.\/server\/lib\/gallery-app\.js"\)/);
  assert.doesNotMatch(entrypoint, /import \{ createGalleryApp \} from/);
});

test("Vercel API entrypoint does not expose invocation error details", async () => {
  const entrypoint = await readFile("api/index.ts", "utf8");

  assert.doesNotMatch(entrypoint, /reason:/);
});
