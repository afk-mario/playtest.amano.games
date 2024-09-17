"use server";

import PlaytesterTable from "components/playtester/playtester-table";

import { createClient } from "utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data: playtesters } = await supabase.from("playtester").select();

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
