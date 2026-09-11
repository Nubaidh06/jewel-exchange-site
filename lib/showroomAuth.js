import crypto from "crypto";

const SHOWROOM_AUTH_SECRET =
  process.env.SHOWROOM_AUTH_SECRET || "jewel_exchange_showroom_secure_2026_salt";
const SHOWROOM_PASSCODE = process.env.SHOWROOM_PASSCODE || "jewel@2026";

/**
 * Creates a cryptographically signed auth token.
 * Format: {timestamp}.{hmac_signature}
 */
export function createAuthToken() {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", SHOWROOM_AUTH_SECRET)
    .update(`showroom-auth:${timestamp}`)
    .digest("hex");

  return `${timestamp}.${signature}`;
}

/**
 * Verifies the auth token with constant-time equality check
 * and expiration window (default 30 days for showroom tablet session).
 */
export function verifyAuthToken(token, maxAgeMs = 30 * 24 * 60 * 60 * 1000) {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  const timeNum = parseInt(timestamp, 10);
  if (isNaN(timeNum)) return false;

  // Check expiration
  const age = Date.now() - timeNum;
  if (age < 0 || age > maxAgeMs) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", SHOWROOM_AUTH_SECRET)
    .update(`showroom-auth:${timestamp}`)
    .digest("hex");

  // Constant-time comparison to prevent timing attacks
  const sigBuf = Buffer.from(signature, "utf-8");
  const expectedBuf = Buffer.from(expectedSignature, "utf-8");

  if (sigBuf.length !== expectedBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(sigBuf, expectedBuf);
}

/**
 * Validates the submitted passcode against configured showroom passcode
 * using constant-time string comparison.
 */
export function verifyPasscode(input) {
  if (!input || typeof input !== "string") return false;

  const submitted = input.trim();
  const target = SHOWROOM_PASSCODE.trim();

  const bufA = Buffer.from(submitted, "utf-8");
  const bufB = Buffer.from(target, "utf-8");

  if (bufA.length !== bufB.length) {
    return false;
  }

  return crypto.timingSafeEqual(bufA, bufB);
}
