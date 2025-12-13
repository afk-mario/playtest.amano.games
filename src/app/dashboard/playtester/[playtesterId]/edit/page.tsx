"use server";

import Link from "next/link";
import { createClient } from "utils/supabase/server";

import { editPlaytester } from "./actions";
import AddKeyForm from "./add-key-form";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import ChangeAvatarForm from "./avatar-form";

import PlaytesterInfo from "../playtester-info";
import PlaytesterDiscordForm from "./discord-form";

import "./styles.css";
import PlaytesterAddFeedbackForm from "./add-feedback-form";
import { PlaytesterFeedbackItem } from "components/playtester/playtester-feedback-item";
import { Tables } from "types/supabase";
import KeyEditForm from "./key-edit-form";

export default async function Page(props: {
  params: Promise<{ playtesterId: string }>;
}) {
  const params = await props.params;
  const { playtesterId } = params;
  const supabase = await createClient();
  const playtesterQuery = await supabase
    .from("playtester")
    .select(
      `*, game_key(*, game:game(*)), social_profile(*), feedback(*, game(*))`
    )
    .eq("id", playtesterId)
    .single();

  if (playtesterQuery.error) {
    return (
      <div>
        <h2>Error Playtester</h2>
        <pre>{JSON.stringify(playtesterQuery.error, null, 2)}</pre>
      </div>
    );
  }

  const playtestersQuery = await supabase
    .from("playtester")
    .select(`id`)
    .order("id");

  if (playtestersQuery.error) {
    return (
      <div>
        <h2>Error Playtesters</h2>
        <pre>{JSON.stringify(playtestersQuery.error, null, 2)}</pre>
      </div>
    );
  }

  const gamesQuery = await supabase.from("game").select("*");

  if (gamesQuery.error) {
    return (
      <div>
        <h2>Error Playtesters</h2>
        <pre>{JSON.stringify(gamesQuery.error, null, 2)}</pre>
      </div>
    );
  }

  const gameKeysQuery = await supabase
    .from("game_key")
    .select(`*`)
    .is("playtester", null);

  if (gameKeysQuery.error) {
    return (
      <div>
        <h2>Error Keys</h2>
        <pre>{JSON.stringify(gameKeysQuery.error, null, 2)}</pre>
      </div>
    );
  }

  const games = gamesQuery.data;
  const playtester = playtesterQuery.data;
  const currentIndex = playtestersQuery.data.findIndex(
    (item) => item.id === Number(playtesterId)
  );

  const nextId =
    currentIndex < playtestersQuery.data.length - 1 ? currentIndex + 1 : null;
  const prevId = currentIndex > 0 ? currentIndex - 1 : null;

  return (
    <div className="p-playtester-edit | stack">
      <header className="p-playtester-edit-header | cluster">
        <div className="cluster">
          {prevId != null ? (
            <Link
              href={`/dashboard/playtester/${playtestersQuery.data[prevId].id}/edit`}
            >
              <ChevronLeft />
            </Link>
          ) : null}
        </div>
        <h2>{playtester.name}</h2>
        {nextId ? (
          <Link
            href={`/dashboard/playtester/${playtestersQuery.data[nextId].id}/edit`}
          >
            <ChevronRight />
          </Link>
        ) : null}
      </header>
      <div className="p-playtester-edit-info-container ">
        <ChangeAvatarForm
          playtesterId={playtesterId}
          avatar={playtester.avatar || undefined}
        />
        <PlaytesterInfo playtester={playtester} />
      </div>

      {playtester.game_key.length > 0
        ? playtester.game_key.map(
            (item: Tables<"game_key"> & { game: Tables<"game"> }) => {
              return (
                <KeyEditForm
                  key={item.id}
                  gameKey={item}
                  playtester={playtester}
                />
              );
            }
          )
        : null}

      <AddKeyForm
        playtesterId={Number(playtesterId)}
        defaultKeys={gameKeysQuery.data}
      />

      <form action={editPlaytester}>
        <input
          name="playtesterId"
          type="text"
          value={playtesterId || undefined}
          readOnly
          hidden
        />
        <label>
          <span>Notes</span>
          <textarea
            name="notes"
            defaultValue={playtester.notes || undefined}
            rows={10}
          />
        </label>
        <button className="c-button" type="submit">
          <Save /> Save
        </button>
      </form>
      <PlaytesterDiscordForm playtester={playtester} />
      <PlaytesterAddFeedbackForm playtester={playtester} games={games} />
      <div className="stack">
        {playtester.feedback.map((item) => {
          return (
            <PlaytesterFeedbackItem
              key={item.id}
              feedback={item}
              playtester={playtester}
              game={item.game}
            />
          );
        })}
      </div>
      <details>
        <summary>Show data</summary>
        <pre
          style={{
            padding: "var(--spacing-02)",
            border: "var(--border)",
            borderRadius: "var(--border-radius)",
            background: "var(--color-bg-alt)",
            width: "100%",
            overflow: "auto",
          }}
        >
          {JSON.stringify(playtester, null, 2)}
        </pre>
      </details>
    </div>
  );
}
