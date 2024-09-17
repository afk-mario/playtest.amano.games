import { redirect } from "next/navigation";

import PlaytesterTable from "components/playtester/playtester-table";
import { createClient } from "utils/supabase/server";

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const { data: playtesters } = await supabase
    .from("playtester")
    .select("*,game_key(*)")
    .order("id");

  return (
    <div>
      {playtesters ? (
        <PlaytesterTable defaultData={playtesters} />
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
}
