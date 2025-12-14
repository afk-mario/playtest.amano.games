"use server";

import { revalidatePath } from "next/cache";
import { RedirectType } from "next/navigation";
import { createClient } from "utils/supabase/server";
import { redirect } from "next/navigation";

export async function editFeedback(prevState, formData: FormData) {
  const supabase = await createClient();
  const { gameId, feedbackPlatform, feedbackText, feedbackId } = {
    feedbackId: Number(formData.get("feedbackId")),
    feedbackPlatform: formData.get("feedbackPlatform") as string,
    feedbackText: formData.get("feedbackText") as string,
    gameId: Number(formData.get("gameId")),
  };
  const res = await supabase
    .from("feedback")
    .update({
      platform: feedbackPlatform,
      text: feedbackText,
      game: gameId,
    })
    .eq("id", feedbackId);
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
