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
    <details>
      <summary>Show info</summary>
      <pre
        style={{
          display: "flex",
          flexFlow: "column",
          gap: "var(--spacing-q)",
          padding: "var(--spacing-02)",
          border: "var(--border)",
          borderRadius: "var(--border-radius)",
          background: "var(--color-bg-alt)",
          width: "100%",
          overflow: "auto",
        }}
      >
        <span>playtesters: {queryPlaytestersTotal.count}</span>
        <span>withKey: {queryPlaytestersWithKey.count}</span>
        <span>
          without:{" "}
          {(queryPlaytestersTotal?.count || 0) -
            (queryPlaytestersWithKey?.count || 0)}
        </span>
        <span>pending email: {queryPlaytestersNotSent.count}</span>
        <span>
          keys sent but unclaimed: {queryGameKeysSentAndUnclaimed.count}
        </span>
        <span>available keys: {queryGameKeysAvailable.count}</span>
      </pre>
    </details>
  );
}
