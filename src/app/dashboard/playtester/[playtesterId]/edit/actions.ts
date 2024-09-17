"use server";

import { revalidatePath } from "next/cache";
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
  revalidatePath("/dashboard/playtester/[playtesterId]");
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
  revalidatePath("/dashboard/playtester/[playtesterId]");
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
  revalidatePath("/dashboard/playtester/[playtesterId]");
}
