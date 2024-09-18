"use server";

import Link from "next/link";
import { createClient } from "utils/supabase/server";

import { editPlaytester, removeKey, updateKeyState } from "./actions";
import AddKeyForm from "./add-key-form";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";
import ChangeAvatarForm from "./avatar-form";

import PlaytesterInfo from "../playtester-info";
import PlaytesterDiscordForm from "./discord-form";

import "./styles.css";

export default async function Page({
  params,
}: {
  params: { playtesterId: string };
}) {
  const { playtesterId } = params;
  const supabase = createClient();
  const playtesterQuery = await supabase
    .from("playtester")
    .select(`*, game_key(*), social_profile(*)`)
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
          <Link href="/dashboard">
            <ChevronsLeft />
          </Link>
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
      <div className="p-playtester-edit-info-container ">
        <ChangeAvatarForm
          playtesterId={playtesterId}
          avatar={playtester.avatar || undefined}
        />
        <PlaytesterInfo playtester={playtester} />
      </div>

      {playtester.game_key.length == 0 ? (
        <AddKeyForm
          playtesterId={Number(playtesterId)}
          defaultKeys={gameKeysQuery.data}
        />
      ) : (
        <form id="editKey">
          <input
            name="playtesterId"
            type="text"
            value={playtesterId || undefined}
            readOnly
            hidden
          />
          <input
            name="keyId"
            type="text"
            value={playtester.game_key[0]?.id || undefined}
            readOnly
            hidden
          />
          <label>
            <span>
              Itch.io Key [
              {playtester.game_key[0]?.claimed ? "Claimed" : "Pending"}]
            </span>
            <input
              name="keyUrl"
              type="text"
              value={playtester.game_key[0]?.url || undefined}
              readOnly
            />
          </label>
          <div className="cluster">
            <button type="submit" formAction={updateKeyState}>
              Update
            </button>
            <button type="submit" formAction={removeKey}>
              Remove
            </button>
          </div>
        </form>
      )}

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
        <button type="submit">Save</button>
      </form>
      <PlaytesterDiscordForm playtester={playtester} />
    </div>
  );
}
