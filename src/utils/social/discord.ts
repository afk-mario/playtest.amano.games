export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  verified: boolean;
  email: string;
  flags: number;
  banner: string;
  accent_color: number;
  premium_type: number;
  public_flags: number;
  avatar_decoration_data: {
    sku_id: string;
    asset: string;
  };
}

export async function getDiscordUserData(userId: string) {
  const res = await fetch(`https://discord.com/api/v10/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN!}`,
    },
  });
  const data: DiscordUser = await res.json();
  return data;
}

export async function getDiscordAvatarURL(userId: string) {
  const discordUser = await getDiscordUserData(userId);
  const url = `https://cdn.discordapp.com/avatars/${userId}/${discordUser.avatar}.png?size=1024`;
  return url;
}
