import { redirect } from "next/navigation";
import { Tables } from "types/supabase";
import Link from "next/link";

import { createClient } from "utils/supabase/server";

import { emailGetHTML, emailGetTxt } from "utils/email/utils";
import PlaytesterWidget from "components/playtester/playtester-widget";

import "./styles.css";
import KeyEditForm from "../contact/[contactId]/edit/key-edit-form";
import { getKeyStatusIcon } from "../game-key/utils";

interface GameKeyWithPlaytesterAndGame
  extends Omit<Tables<"game_key">, "game" | "playtester"> {
  game: Tables<"game">;
  playtester: Tables<"playtester">;
}

export default async function Pmail() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const { data: items } = await supabase
    .from("game_key")
    .select("*,game(*),playtester(*, social_profile(*))")
    .order("key_sent", { ascending: false })
    .not("playtester", "is", null)
    .eq("claimed", false);

  const name = "Playtester Name";
  const key =
    "https://amanogames.itch.io/devils-on-the-moon-pinball-playtest-2/download/vKvfNBgCwYKBSRmJdZBu88Dfa-cQJvXu3yESACNN9e1993NcsQ5mJs";
  const txt = emailGetTxt(name, key);
  const html = emailGetHTML(name, key);

  const games =
    items?.reduce<Record<string, Tables<"game">>>((acc, item) => {
      const gameId = item.game.id;

      if (!acc[gameId]) {
        acc[gameId] = item.game;
      }
      return acc;
    }, {}) || {};

  const byGameId =
    items?.reduce<Record<string, GameKeyWithPlaytesterAndGame[]>>(
      (acc, item) => {
        const gameId = item.game.id;

        if (!acc[gameId]) {
          acc[gameId] = [];
        }

        acc[gameId].push(item);
        return acc;
      },
      {},
    ) || {};

  return (
    <div className="p-mail stack">
      <header className="cluster">
        <h2>Email</h2>
      </header>
      <section className="stack">
        <details className="stack">
          <summary>Plain Text </summary>
          <pre>{txt}</pre>
        </details>
        <details className="stack">
          <summary>Html</summary>
          <pre>{html}</pre>
        </details>
        <details className="stack">
          <summary>Rendered</summary>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </details>
      </section>
      <section>
        {Object.entries(byGameId).map(([key]) => {
          const game = games[key];
          return (
            <Link key={game.id} href={`/dashboard/mail#game-${game.id}`}>
              <h3>{game.name}</h3>
            </Link>
          );
        })}
      </section>
      {Object.entries(byGameId).map(([key, value]) => {
        const game = games[key];
        return (
          <section key={game.id} id={`game-${game.id}`} className="stack">
            <header>
              <Link href={`/dashboard/mail#game-${game.id}`}>
                <h3>{game.name}</h3>
              </Link>
            </header>
            <div className="stack">
              {value?.map((item) => {
                const { playtester, ...rest } = item;
                const gameKey = {
                  ...rest,
                  playtester: playtester.id,
                } as Tables<"game_key"> & { game: Tables<"game"> };
                return (
                  <article key={item.id} className="stack">
                    <header className="cluster">
                      <PlaytesterWidget playtester={playtester} />
                      {getKeyStatusIcon(gameKey)}
                      <Link href={`/dashboard/contact/${playtester.id}/edit/`}>
                        {playtester.name}
                      </Link>
                    </header>
                    <KeyEditForm playtester={playtester} gameKey={gameKey} />
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
