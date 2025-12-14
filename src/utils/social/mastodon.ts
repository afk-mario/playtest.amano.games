interface MastodonAccount {
  id: string;
  username: string;
  avatar: string;
  avatar_static: string;
  display_name: string;
}

export async function getMastodonUserData(
  handle: string
): Promise<MastodonAccount> {
  const { username, instance } = parseMastodonHandle(handle);
  const res = await fetch(
    `https://${instance}/api/v1/accounts/lookup?acct=${username}`
  );

  if (!res.ok) {
    throw new Error(`Mastodon API error: ${res.status}`);
  }

  return res.json();
}
export function parseMastodonHandle(handle: string) {
  // accepts "@user@instance.tld" or "user@instance.tld"
  const clean = handle.startsWith("@") ? handle.slice(1) : handle;
  const [username, instance] = clean.split("@");

  if (!username || !instance) {
    throw new Error("Invalid Mastodon handle");
  }

  return { username, instance };
}

export async function getMastodonAvatarURLByHandle(handle: string) {
  const user = await getMastodonUserData(handle);
  return user.avatar_static || user.avatar;
}
