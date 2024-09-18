import { Tables } from "types/supabase";

export function getSocialURL(profile: Tables<"social_profile">) {
  switch (profile.platform) {
    case "itch.io":
      if (profile.display_name == null) return null;
      return `https://itch.io/profile/${profile.display_name
        .toLowerCase()
        .replace(/\./g, "")}`;
    case "mastodon":
      if (profile.display_name == null) return null;
      const bits = profile.display_name?.split("@");
      const [, user, server] = bits;
      return `https://${server}/@${user}`;
    case "discord":
      if (profile.social_id == null) return null;
      return `https://discord.com/users/${profile.social_id}`;

    default:
      return null;
  }
}
