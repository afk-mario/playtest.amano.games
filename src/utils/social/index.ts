import { Tables } from "types/supabase";

export function getSocialURL(profile: Tables<"social_profile">) {
  switch (profile.platform) {
    case "itch.io":
      if (profile.display_name == null) return null;
      return `https://itch.io/profile/${profile.display_name
        .toLowerCase()
        .replace(/\./g, "")}`;
    case "mastodon": {
      if (profile.social_id == null) return null;
      const bits = profile.social_id?.split("@");
      const [, user, server] = bits;
      return `https://${server}/@${user}`;
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
