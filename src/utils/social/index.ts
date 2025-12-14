import { Tables } from "types/supabase";
import {
  getMastodonAvatarURLByHandle,
  getMastodonUserData,
  parseMastodonHandle,
} from "./mastodon";
import { getDiscordAvatarURL, getDiscordUserData } from "./discord";
import { getBlueskyProfile } from "./bluesky";
import { getTwitterUserDataByUsername } from "./twitter";

export function getSocialURL(profile: Tables<"social_profile">) {
  switch (profile.platform) {
    case "itch.io":
      if (profile.display_name == null) return null;
      return `https://itch.io/profile/${profile.display_name
        .toLowerCase()
        .replace(/\./g, "")}`;
    case "mastodon": {
      if (profile.social_id == null) return null;
      const { username, instance } = parseMastodonHandle(profile.social_id);
      return `https://${instance}/@${username}`;
    }
    case "bluesky": {
      if (profile.social_id == null) return null;
      return `https://bsky.app/profile/${profile.social_id}`;
    }
    case "twitter": {
      if (profile.social_id == null) return null;
      return `https://x.com/${profile.social_id}`;
    }

    case "discord":
      if (profile.social_id == null) return null;
      return `https://discord.com/users/${profile.social_id}`;

    default:
      return null;
  }
}

export async function getSocialDisplayName(platform: string, socialId: string) {
  switch (platform) {
    case "discord": {
      const discordUser = await getDiscordUserData(socialId);
      return discordUser.username;
    }
    case "bluesky": {
      try {
        const res = await getBlueskyProfile(socialId);
        return res.displayName;
      } catch (e) {
        console.error(`${e}`);
        return null;
      }
    }
    case "mastodon": {
      const mastodonAccont = await getMastodonUserData(socialId);
      return mastodonAccont.display_name;
    }
    case "twitter": {
      const twitterUser = await getTwitterUserDataByUsername(socialId);
      return twitterUser.name;
    }
  }
  return null;
}

export async function getSocialAvatarUrl(platform: string, socialId: string) {
  switch (platform) {
    case "discord": {
      const avatarUrl = await getDiscordAvatarURL(socialId);
      return avatarUrl;
    }
    case "mastodon": {
      const avatarUrl = await getMastodonAvatarURLByHandle(socialId);
      return avatarUrl;
    }
    case "bluesky": {
      try {
        const res = await getBlueskyProfile(socialId);
        return res.displayName;
      } catch (e) {
        console.error(`${e}`);
        return null;
      }
    }
    case "twitter": {
      const twitterUser = await getTwitterUserDataByUsername(socialId);
      return twitterUser.name;
    }
  }
  return null;
}
