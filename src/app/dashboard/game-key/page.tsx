import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";

import Link from "next/link";
import { CirclePlus } from "lucide-react";
import GameKeyTable from "containers/game-key/game-key-table";
import Spinner from "components/spinner";

import "./styles.css";

export default async function Page() {
  const supabase = await createClient();
  const userRes = await supabase.auth.getUser();
  if (userRes.error || !userRes.data?.user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("game_key")
    .select("*,playtester(*),game(*)")
    .order("id");

  console.log(data);
  return (
    <div className="p-game-key-list">
      <header className="cluster">
        <h2>Game keys</h2>
        <Link href="/dashboard/game-key/new" className="c-button">
          <CirclePlus />
          New
        </Link>
      </header>
      {data ? <GameKeyTable defaultData={data} /> : <Spinner />}
    </div>
  );
}
