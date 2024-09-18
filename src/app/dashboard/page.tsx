import { redirect } from "next/navigation";

import PlaytesterTable from "components/playtester/playtester-table";
import InfoPanel from "./info-panel";
import { createClient } from "utils/supabase/server";

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const { data: playtesters } = await supabase
    .from("playtester")
    .select("*,game_key(*),social_profile(*)")
    .order("id");

  return (
    <div className="stack">
      <InfoPanel />
      {playtesters ? (
        <PlaytesterTable defaultData={playtesters} />
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
}
