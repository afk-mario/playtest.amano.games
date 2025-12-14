interface TwitterUser {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
}

export async function getTwitterUserDataByUsername(
  username: string
): Promise<TwitterUser> {
  const res = await fetch(
    `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error(`Twitter API error: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}
