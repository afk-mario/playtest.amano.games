export interface BlueskyProfile {
  did: string;
  handle: string;
  displayName?: string;
  description?: string;
  avatar?: {
    ref: {
      $link: string;
    };
    mimeType: string;
    size: number;
  };
}

export async function getBlueskyProfile(
  handle: string
): Promise<BlueskyProfile> {
  const res = await fetch(
    `https://bsky.social/xrpc/app.bsky.actor.getProfile?actor=${handle}`
  );

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.json();
}

export function getBlueskyAvatarURL(profile: BlueskyProfile) {
  if (!profile.avatar?.ref?.$link) return null;

  return `https://cdn.bsky.app/img/avatar/plain/${profile.did}/${profile.avatar.ref.$link}@jpeg`;
}
