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
  revalidatePath("/dashboard/playtester/[playtesterId]");
}
