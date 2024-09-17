"use server";

import Link from "next/link";
import { createClient } from "utils/supabase/server";

import "./styles.css";
import { editPlaytester, removeKey } from "./actions";
import AddKeyForm from "./add-key-form";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";

export default async function Page({
  params,
}: {
  params: { playtesterId: string };
}) {
  const { playtesterId } = params;
  const supabase = createClient();
  const playtesterQuery = await supabase
    .from("playtester")
    .select(`*, game_key(*)`)
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
    currentIndex < playtestersQuery.data.length ? currentIndex + 1 : null;
  const prevId = currentIndex > 0 ? currentIndex - 1 : null;

  return (
    <div className="p-playtester-edit | stack">
      <header className="p-playtester-edit-header | cluster">
        <div className="cluster">
          <Link href="/dashboard">
            <ChevronsLeft />
          </Link>
          {prevId ? (
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
      {playtester.game_key.length == 0 ? (
        <AddKeyForm
          playtesterId={Number(playtesterId)}
          defaultKeys={gameKeysQuery.data}
        />
      ) : (
        <form action={removeKey} id="removeKey">
          <input
            name="keyId"
            type="text"
            value={playtester.game_key[0]?.id || undefined}
            readOnly
            hidden
          />
          <label>
            <span>Itch.io Key</span>
            <input
              name="keyUrl"
              type="text"
              value={playtester.game_key[0]?.url || undefined}
              readOnly
            />
          </label>
          <button type="submit">Remove</button>
        </form>
      )}
      <form action="">
        <input
          name="playtesterId"
          type="text"
          value={playtesterId || undefined}
          readOnly
          hidden
        />
        <label>
          <span>Avatar</span>
          <input type="file" value={playtester.avatar || undefined} />
        </label>
      </form>
      <form action={editPlaytester}>
        <input
          name="playtesterId"
          type="text"
          value={playtesterId || undefined}
          readOnly
          hidden
        />
        <label>
          <span>Email</span>
          <input type="email" readOnly value={playtester.email || undefined} />
        </label>
        <label>
          <span>Description</span>
          <textarea
            readOnly
            value={playtester.description || undefined}
            rows={10}
          />
        </label>
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
    </div>
  );
}
