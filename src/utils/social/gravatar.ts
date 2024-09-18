import crypto from "crypto";

export function getGravatarUrl(email?: string, size = 80) {
  if (email == null) return undefined;
  const trimmedEmail = email.trim().toLowerCase();
  const hash = crypto.createHash("sha256").update(trimmedEmail).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}
