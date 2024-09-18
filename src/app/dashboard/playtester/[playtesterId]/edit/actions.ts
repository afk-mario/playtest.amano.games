"use server";

import { revalidatePath } from "next/cache";
import { sendEmail } from "utils/email";
import { getDiscordAvatarURL, getDiscordUserData } from "utils/social/discord";
import { getKeyInfo } from "utils/social/itch";
import { createClient } from "utils/supabase/server";

export async function editPlaytester(formData: FormData) {
  const supabase = createClient();
  const rawFormData = {
    playtesterId: formData.get("playtesterId"),
    notes: formData.get("notes")?.toString(),
  };

  await supabase
    .from("playtester")
    .update({ notes: rawFormData.notes })
    .eq("id", Number(rawFormData.playtesterId!))
    .select();
  revalidatePath("/dashboard/playtester/[playtesterId]", "page");
}

export async function removeKey(formData: FormData) {
  const supabase = createClient();
  const rawFormData = {
    keyId: formData.get("keyId"),
  };

  await supabase
    .from("game_key")
    .update({ playtester: null })
    .eq("id", Number(rawFormData.keyId!))
    .select();
  revalidatePath("/dashboard/playtester/[playtesterId]", "page");
}

export async function addKey(formData: FormData) {
  const supabase = createClient();
  const rawFormData = {
    playtesterId: formData.get("playtesterId"),
    keyId: formData.get("keyId"),
  };

  await supabase
    .from("game_key")
    .update({ playtester: Number(rawFormData.playtesterId) })
    .eq("id", Number(rawFormData.keyId))
    .select();
  revalidatePath("/dashboard/playtester/[playtesterId]", "page");
}

export async function changeAvatar(formData: FormData) {
  const supabase = createClient();
  const bucket = "media";
  const rawFormData = {
    avatar: formData.get("avatar") as File,
    playtesterId: Number(formData.get("playtesterId")),
  };
  const ext = rawFormData.avatar.name.split(".").pop();
  const res = await supabase.storage
    .from(bucket)
    .upload(`avatars/${rawFormData.playtesterId}.${ext}`, rawFormData.avatar, {
      upsert: true,
      contentType: rawFormData.avatar.type,
    });

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(`${res.data?.path}`);

  await supabase
    .from("playtester")
    .update({
      avatar: data.publicUrl,
    })
    .eq("id", rawFormData.playtesterId);
  revalidatePath("/dashboard/playtester/[playtesterId]", "page");
}

export async function updateKeyState(formData: FormData) {
  const supabase = createClient();
  const { keyUrl, playtesterId } = {
    keyUrl: formData.get("keyUrl") as string,
    playtesterId: Number(formData.get("playtesterId")),
  };

  const downloadKey = keyUrl.slice(72);
  const itchGameKey = await getKeyInfo(downloadKey);
  const owner = itchGameKey.download_key?.owner;
  const isClaimed = owner != null;

  await supabase
    .from("game_key")
    .update({ claimed: isClaimed })
    .eq("url", keyUrl);

  if (isClaimed) {
    await supabase.from("social_profile").upsert(
      {
        playtester: playtesterId,
        platform: "itch.io",
        display_name: owner.username,
        social_id: owner.id.toString(),
      },
      { onConflict: "playtester,platform", ignoreDuplicates: false }
    );
  }

  revalidatePath("/dashboard/playtester/[playtesterId]", "page");
  revalidatePath("/dashboard/", "page");
}

export async function sendGameKeyEmail(formData: FormData) {
  console.log("Sending email");
  const supabase = createClient();
  const { keyUrl, playtesterId, playtesterName, playtesterEmail } = {
    keyUrl: formData.get("keyUrl") as string,
    playtesterId: Number(formData.get("playtesterId")),
    playtesterName: formData.get("playtesterName") as string,
    playtesterEmail: formData.get("playtesterEmail") as string,
  };

  try {
    const email = playtesterEmail;
    await sendEmail(playtesterName, email, keyUrl);
    const timestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", "+00");
    console.log("email sent succesfully");
    await supabase
      .from("playtester")
      .update({ key_sent: timestamp })
      .eq("id", playtesterId);
    revalidatePath("/dashboard/", "page");
    console.log("user updated");
  } catch (e) {
    console.error("Error sending email", e);
  }
}

export async function saveDiscord(formData: FormData) {
  const supabase = createClient();
  const { playtesterId, discordSocialId } = {
    playtesterId: Number(formData.get("playtesterId")),
    discordSocialId: formData.get("discordSocialId") as string,
  };

  await supabase.from("social_profile").upsert(
    {
      platform: "discord",
      playtester: playtesterId,
      social_id: discordSocialId,
    },
    { onConflict: "playtester,platform", ignoreDuplicates: false }
  );
  revalidatePath("/dashboard/playtester/[playtesterId]", "page");
  revalidatePath("/dashboard/", "page");
}

export async function updateDiscord(formData: FormData) {
  const supabase = createClient();
  const { discordSocialId, discordProfileId } = {
    discordProfileId: Number(formData.get("discordProfileId")),
    discordSocialId: formData.get("discordSocialId") as string,
  };
  const discordUser = await getDiscordUserData(discordSocialId);

  await supabase
    .from("social_profile")
    .update({
      display_name: discordUser.username,
    })
    .eq("id", discordProfileId);
  revalidatePath("/dashboard/playtester/[playtesterId]", "page");
  revalidatePath("/dashboard/", "page");
}

export async function scrapeDiscordAvatar(formData: FormData) {
  const supabase = createClient();
  const bucket = "media";
  const { playtesterId, discordSocialId } = {
    playtesterId: Number(formData.get("playtesterId")),
    discordSocialId: formData.get("discordSocialId") as string,
  };
  const avatarUrl = await getDiscordAvatarURL(discordSocialId);
  const blob = await fetch(avatarUrl).then((r) => r.blob());

  const res = await supabase.storage
    .from(bucket)
    .upload(`avatars/${playtesterId}.png`, blob, {
      upsert: true,
    });

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(`${res.data?.path}`);

  await supabase
    .from("playtester")
    .update({
      avatar: data.publicUrl,
    })
    .eq("id", playtesterId);
  revalidatePath("/dashboard/playtester/[playtesterId]", "page");
}

export async function addFeedback(formData: FormData) {
  const supabase = createClient();
  const { playtesterId, feedbackPlatform, feedbackText } = {
    playtesterId: Number(formData.get("playtesterId")),
    feedbackPlatform: formData.get("feedbackPlatform") as string,
    feedbackText: formData.get("feedbackText") as string,
  };
  await supabase
    .from("feedback")
    .insert({
      playtester: playtesterId,
      platform: feedbackPlatform,
      text: feedbackText,
    })
    .eq("id", playtesterId);
  revalidatePath("/dashboard/playtester/[playtesterId]", "page");
}
