import { createHmac, timingSafeEqual } from "node:crypto";

export type AlbumSessionTokenPayload = {
  albumSlug: string;
  expiresAt: number;
};

type SignAlbumSessionTokenInput = {
  albumSlug: string;
  secret: string;
  expiresInMinutes: number;
  now?: number;
};

function toBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(encodedPayload: string, secret: string) {
  return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

export function signAlbumSessionToken({
  albumSlug,
  secret,
  expiresInMinutes,
  now = Date.now(),
}: SignAlbumSessionTokenInput) {
  const payload: AlbumSessionTokenPayload = {
    albumSlug,
    expiresAt: now + expiresInMinutes * 60 * 1000,
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export function verifyAlbumSessionToken(
  token: string,
  secret: string,
  now = Date.now(),
): AlbumSessionTokenPayload {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    throw new Error("Invalid album session token");
  }

  const expectedSignature = signPayload(encodedPayload, secret);
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    throw new Error("Invalid album session token signature");
  }

  const payload = JSON.parse(fromBase64Url(encodedPayload)) as AlbumSessionTokenPayload;
  if (payload.expiresAt <= now) {
    throw new Error("Album session token expired");
  }

  return payload;
}
