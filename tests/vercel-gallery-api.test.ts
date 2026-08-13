import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

test("Vercel exposes the gallery API as a serverless function", async () => {
  await assert.doesNotReject(access("api/gallery/[...path].ts"));
});
