import { redirect } from "next/navigation";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

import PlaytesterTable from "components/playtester/playtester-table";
import InfoPanel from "../info-panel";
import { createClient } from "utils/supabase/server";

import "./styles.css";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const { data: playtesters } = await supabase
    .from("playtester")
    .select("*,game_key(*),social_profile(*),feedback(*)")
    .order("id");

  return (
    <div className="p-contacts stack">
      <header className="cluster">
        <h2>Contacts</h2>
        <Link href="/dashboard/contact/new" className="c-button">
          <CirclePlus />
          New
        </Link>
      </header>
      <InfoPanel />
      {playtesters ? (
        <PlaytesterTable defaultData={playtesters} />
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
}
