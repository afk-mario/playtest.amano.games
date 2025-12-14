"use server";

import { revalidatePath } from "next/cache";
import { getSocialAvatarUrl, getSocialDisplayName } from "utils/social";
import { getDiscordAvatarURL } from "utils/social/discord";
import { createClient } from "utils/supabase/server";

export async function upsertSocialProfile(prevState, formData: FormData) {
  const supabase = await createClient();
  const { socialProfileId, playtesterId, platform, displayName, socialId } = {
    socialProfileId: Number(formData.get("socialProfileId")),
    playtesterId: Number(formData.get("playtesterId")),
    platform: formData.get("platform"),
    displayName: formData.get("displayName"),
    socialId: formData.get("socialId"),
  };

  const res = await supabase
    .from("social_profile")
    .upsert({
      id: socialProfileId || undefined,
      display_name: displayName,
      social_id: socialId,
      platform,
      playtester: playtesterId,
    })
    .select();

  if (res.error) {
    console.error(res.error);
  }

  revalidatePath("/dashboard/contact/[contactId]", "page");
}

export async function scrapeDisplayName(prevState, formData: FormData) {
  const supabase = await createClient();
  const { platform, socialProfileId, socialId } = {
    platform: formData.get("platform") as string,
    socialId: formData.get("socialId") as string,
    socialProfileId: Number(formData.get("socialProfileId")),
  };
  const displayName = await getSocialDisplayName(platform, socialId);
  if (displayName) {
    const res = await supabase
      .from("social_profile")
      .update({
        display_name: displayName,
      })
      .eq("id", socialProfileId);
    if (res.error) {
      console.error(res.error);
    }
  }
  revalidatePath("/dashboard/contact/[contactId]", "page");
  revalidatePath("/dashboard/", "page");
}

export async function scrapeAvatar(prevState, formData: FormData) {
  const supabase = await createClient();
  const bucket = "media";
  const { playtesterId, platform, socialId } = {
    playtesterId: Number(formData.get("playtesterId")),
    platform: formData.get("platform") as string,
    socialId: formData.get("socialId") as string,
  };

  const avatarUrl = await getSocialAvatarUrl(platform, socialId);

  if (avatarUrl) {
    const blob = await fetch(avatarUrl).then((r) => r.blob());

    const uploadRes = await supabase.storage
      .from(bucket)
      .upload(`avatars/${playtesterId}.png`, blob, {
        upsert: true,
      });

    if (uploadRes.error) {
      console.error(uploadRes.error);
    } else {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(`${uploadRes.data?.path}`);

      const res = await supabase
        .from("playtester")
        .update({
          avatar: data.publicUrl,
        })
        .eq("id", playtesterId);
      if (res.error) {
        console.error(res.error);
      }
    }
  }
  revalidatePath("/dashboard/contact/[contactId]", "page");
}
