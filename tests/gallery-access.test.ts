import test from "node:test";
import assert from "node:assert/strict";

import {
  createAlbumSessionToken,
  isAlbumSessionPayloadValid,
  readAlbumAccessState,
  storeAlbumAccessState,
} from "../src/lib/gallery-access";

test("createAlbumSessionToken stores the album slug and expiration", () => {
  const now = new Date("2026-07-28T10:00:00.000Z").getTime();

  const token = createAlbumSessionToken("world-pride-2026", 45, now, "signed-token");

  assert.equal(token.albumSlug, "world-pride-2026");
  assert.equal(token.expiresAt, now + 45 * 60 * 1000);
  assert.equal(token.sessionToken, "signed-token");
});

test("isAlbumSessionPayloadValid accepts matching non-expired sessions", () => {
  const now = new Date("2026-07-28T10:00:00.000Z").getTime();
  const token = createAlbumSessionToken("world-pride-2026", 45, now, "signed-token");

  assert.equal(isAlbumSessionPayloadValid(token, "world-pride-2026", now + 1_000), true);
});

test("isAlbumSessionPayloadValid rejects expired or mismatched sessions", () => {
  const now = new Date("2026-07-28T10:00:00.000Z").getTime();
  const token = createAlbumSessionToken("world-pride-2026", 45, now, "signed-token");

  assert.equal(isAlbumSessionPayloadValid(token, "other-album", now + 1_000), false);
  assert.equal(isAlbumSessionPayloadValid(token, "world-pride-2026", token.expiresAt + 1), false);
});

test("storeAlbumAccessState and readAlbumAccessState persist valid sessions only", () => {
  const storage = new Map<string, string>();
  const adapter = {
    getItem(key: string) {
      return storage.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      storage.set(key, value);
    },
    removeItem(key: string) {
      storage.delete(key);
    },
  };

  const now = new Date("2026-07-28T10:00:00.000Z").getTime();
  const token = createAlbumSessionToken("world-pride-2026", 45, now, "signed-token");

  storeAlbumAccessState(adapter, token);

  assert.deepEqual(readAlbumAccessState(adapter, "world-pride-2026", now + 1_000), token);
  assert.equal(readAlbumAccessState(adapter, "other-album", now + 1_000), null);
  assert.equal(readAlbumAccessState(adapter, "world-pride-2026", token.expiresAt + 1), null);
  assert.equal(storage.size, 0);
});
