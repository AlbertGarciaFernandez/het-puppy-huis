import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("Vercel exposes the gallery API as a serverless function", async () => {
  await assert.doesNotReject(access("api/index.ts"));
});

test("Vercel routes API requests before the SPA fallback", async () => {
  const config = JSON.parse(await readFile("vercel.json", "utf8")) as {
    rewrites: Array<{ source: string; destination: string }>;
  };

  assert.deepEqual(config.rewrites[0], {
    source: "/api/(.*)",
    destination: "/api",
  });
});
