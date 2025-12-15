"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";
import { createClient } from "utils/supabase/server";

export async function markAsSent(formData: FormData) {
  const supabase = await createClient();
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

export async function contactNew(prevState, formData: FormData) {
  const supabase = await createClient();
  const { tags, name, email } = {
    name: formData.get("name")?.toString(),
    email: formData.get("email")?.toString(),
    tags: formData.get("tags")?.toString(),
  };

  const res = await supabase
    .from("playtester")
    .insert([{ name, email, tags }])
    .select();

  if (res.error) {
    console.error(res.error);
  }
  revalidatePath("/dashboard/contact/", "page");
  if (res.data) {
    const [contact] = res.data;
    redirect(`/dashboard/contact/${contact.id}/edit`, RedirectType.push);
  }
}

export async function contactDelete(prevState, formData: FormData) {
  const supabase = await createClient();
  const { contactId } = {
    contactId: Number(formData.get("contactId")?.toString()),
  };

  const res = await supabase.from("playtester").delete().eq("id", contactId);

  if (res.error) {
    console.error(res.error);
  } else {
    revalidatePath("/dashboard/contact/", "page");
    redirect("/dashboard/contact/", RedirectType.push);
  }
}
