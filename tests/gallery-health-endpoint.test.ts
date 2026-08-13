import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import test from "node:test";

import { createGalleryApp } from "../server/lib/gallery-app";

test("health endpoint reports missing configuration without throwing", async () => {
  const app = createGalleryApp({
    getConfig: () => {
      throw new Error("Missing required environment variable: SUPABASE_URL");
    },
  });
  const server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address() as AddressInfo;

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
    const payload = (await response.json()) as { ok: boolean };

    assert.equal(response.status, 200);
    assert.equal(payload.ok, true);
  } finally {
    server.close();
  }
});
