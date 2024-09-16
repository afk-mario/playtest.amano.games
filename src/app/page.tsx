"use server";

import { createClient } from "utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data: playtesters } = await supabase.from("playtester").select();

  return <pre>{JSON.stringify(playtesters, null, 2)}</pre>;
}
