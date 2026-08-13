import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Vercel API entrypoint exports an explicit request handler", async () => {
  const entrypoint = await readFile("api/index.ts", "utf8");

  assert.match(entrypoint, /export default function handler/);
  assert.match(entrypoint, /galleryApp\(req, res\)/);
});
