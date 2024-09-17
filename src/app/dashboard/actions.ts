"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "utils/supabase/server";

export async function markAsSent(formData: FormData) {
  const supabase = createClient();
  const rawFormData = {
    selected: formData.get("selected")!.toString().split(","),
    timestamp: formData.get("timestamp")?.toString(),
  };

  await supabase
    .from("playtester")
    .update({ key_sent: rawFormData.timestamp })
    .or(rawFormData.selected.map((item) => `id.eq.${item}`).join(","));

  revalidatePath("/dashboard");
}
