import test from "node:test";
import assert from "node:assert/strict";

import { signAlbumSessionToken, verifyAlbumSessionToken } from "../server/lib/album-session";

test("signAlbumSessionToken issues a verifiable token for the expected album", () => {
  const now = new Date("2026-07-28T10:00:00.000Z").getTime();
  const token = signAlbumSessionToken({
    albumSlug: "world-pride-2026",
    secret: "test-secret",
    expiresInMinutes: 45,
    now,
  });

  const payload = verifyAlbumSessionToken(token, "test-secret", now + 1_000);

  assert.equal(payload.albumSlug, "world-pride-2026");
  assert.equal(payload.expiresAt, now + 45 * 60 * 1000);
});

test("verifyAlbumSessionToken rejects tampered tokens and expired tokens", () => {
  const now = new Date("2026-07-28T10:00:00.000Z").getTime();
  const token = signAlbumSessionToken({
    albumSlug: "world-pride-2026",
    secret: "test-secret",
    expiresInMinutes: 45,
    now,
  });

  assert.throws(() => verifyAlbumSessionToken(`${token}tampered`, "test-secret", now + 1_000));
  assert.throws(() => verifyAlbumSessionToken(token, "test-secret", now + 45 * 60 * 1000 + 1));
});
