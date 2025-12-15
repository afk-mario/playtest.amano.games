"use server";

import { revalidatePath } from "next/cache";
import { RedirectType } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { redirect } from "next/navigation";

export async function feedbackAdd(prevState, formData: FormData) {
  const supabase = await createClient();
  const {
    gameId,
    playtesterId,
    feedbackPlatform,
    feedbackText,
    feedbackUrl,
    feedbackTimestamp,
  } = {
    playtesterId: Number(formData.get("playtesterId")),
    feedbackPlatform: formData.get("feedbackPlatform") as string,
    feedbackText: formData.get("feedbackText") as string,
    feedbackUrl: formData.get("feedbackUrl") as string,
    feedbackTimestamp: formData.get("feedbackTimestamp") as string,
    gameId: Number(formData.get("gameId")),
  };

  const timestamp = feedbackTimestamp
    ? new Date(feedbackTimestamp).toISOString()
    : undefined;
  const res = await supabase
    .from("feedback")
    .insert({
      game: gameId,
      playtester: playtesterId,
      platform: feedbackPlatform,
      text: feedbackText,
      url: feedbackUrl,
      timestamp,
    })
    .eq("id", playtesterId);
  if (res.error) {
    console.error(res.error);
  }
  revalidatePath("/dashboard/contact/[contactId]", "page");
}

export async function feedbackEdit(prevState, formData: FormData) {
  const supabase = await createClient();
  const {
    gameId,
    feedbackId,
    feedbackUrl,
    feedbackText,
    feedbackPlatform,
    feedbackTimestamp,
  } = {
    feedbackId: Number(formData.get("feedbackId")),
    feedbackPlatform: formData.get("feedbackPlatform") as string,
    feedbackText: formData.get("feedbackText") as string,
    feedbackUrl: formData.get("feedbackUrl") as string,
    feedbackTimestamp: formData.get("feedbackTimestamp") as string,
    gameId: Number(formData.get("gameId")),
  };
  console.log(feedbackTimestamp);

  const timestamp = feedbackTimestamp
    ? new Date(feedbackTimestamp).toISOString()
    : undefined;
  const res = await supabase
    .from("feedback")
    .update({
      platform: feedbackPlatform,
      text: feedbackText,
      game: gameId,
      url: feedbackUrl,
      timestamp,
    })
    .eq("id", feedbackId)
    .select();

  if (res.error) {
    console.error(res.error);
  }

  revalidatePath("/dashboard/feedback/[feedbackId]", "page");
}

export async function feedbackDelete(prevState, formData: FormData) {
  const supabase = await createClient();
  const { feedbackId } = {
    feedbackId: Number(formData.get("feedbackId")),
  };
  const res = await supabase.from("feedback").delete().eq("id", feedbackId);
  if (res.error) {
    console.error(res.error);
  }

  revalidatePath("/dashboard/feedback/[feedbackId]", "page");
  redirect("/dashboard", RedirectType.push);
}
