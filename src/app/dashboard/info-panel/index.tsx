import { createClient } from "utils/supabase/server";

export default async function InfoPanel() {
  const supabase = createClient();

  const queryPlaytestersTotal = await supabase
    .from("playtester")
    .select("", { count: "exact", head: true });

  if (queryPlaytestersTotal.error) {
    return null;
  }

  const queryPlaytestersWithKey = await supabase
    .from("game_key")
    .select("", { count: "exact", head: true })
    .not("playtester", "is", null);

  const queryPlaytestersNotSent = await supabase
    .from("playtester")
    .select("game_key!inner()", { count: "exact", head: true })
    .is("key_sent", null)
    .not("game_key", "is", null);

  const queryGameKeysAvailable = await supabase
    .from("game_key")
    .select("", { count: "exact", head: true })
    .is("playtester", null);

  const queryGameKeysSentAndUnclaimed = await supabase
    .from("game_key")
    .select("playtester!inner()", { count: "exact", head: true })
    .eq("claimed", false)
    .not("playtester.key_sent", "is", null);

  if (queryPlaytestersTotal.error) {
    return null;
  }

  return (
    <div>
      <pre>playtesters: {queryPlaytestersTotal.count}</pre>
      <pre>withKey: {queryPlaytestersWithKey.count}</pre>
      <pre>
        without:{" "}
        {(queryPlaytestersTotal?.count || 0) -
          (queryPlaytestersWithKey?.count || 0)}
      </pre>
      <pre>pending email: {queryPlaytestersNotSent.count}</pre>
      <pre>keys sent but unclaimed: {queryGameKeysSentAndUnclaimed.count}</pre>
      <pre>available keys: {queryGameKeysAvailable.count}</pre>
    </div>
  );
}
