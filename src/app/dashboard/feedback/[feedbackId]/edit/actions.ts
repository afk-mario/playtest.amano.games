"use server";

import { revalidatePath } from "next/cache";
import { RedirectType } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { redirect } from "next/navigation";

export async function feedbackAdd(prevState, formData: FormData) {
  const supabase = await createClient();
  const { gameId, playtesterId, feedbackPlatform, feedbackText, feedbackUrl } =
    {
      playtesterId: Number(formData.get("playtesterId")),
      feedbackPlatform: formData.get("feedbackPlatform") as string,
      feedbackText: formData.get("feedbackText") as string,
      feedbackUrl: formData.get("feedbackUrl") as string,
      gameId: Number(formData.get("gameId")),
    };
  const res = await supabase
    .from("feedback")
    .insert({
      game: gameId,
      playtester: playtesterId,
      platform: feedbackPlatform,
      text: feedbackText,
      url: feedbackUrl,
    })
    .eq("id", playtesterId);
  if (res.error) {
    console.error(res.error);
  }
  revalidatePath("/dashboard/contact/[contactId]", "page");
}

export async function editFeedback(prevState, formData: FormData) {
  const supabase = await createClient();
  const { gameId, feedbackUrl, feedbackPlatform, feedbackText, feedbackId } = {
    feedbackId: Number(formData.get("feedbackId")),
    feedbackPlatform: formData.get("feedbackPlatform") as string,
    feedbackText: formData.get("feedbackText") as string,
    feedbackUrl: formData.get("feedbackUrl") as string,
    gameId: Number(formData.get("gameId")),
  };
  const res = await supabase
    .from("feedback")
    .update({
      platform: feedbackPlatform,
      text: feedbackText,
      game: gameId,
      url: feedbackUrl,
    })
    .eq("id", feedbackId)
    .select();

  if (res.error) {
    console.error(res.error);
  }

  revalidatePath("/dashboard/feedback/[feedbackId]", "page");
}

export async function deleteFeedback(prevState, formData: FormData) {
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
