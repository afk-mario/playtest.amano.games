import Time from "components/time";
import { Tables } from "types/supabase";
import { RefreshCcw, Send, Trash } from "lucide-react";
import { removeKey, sendGameKeyEmail, updateKeyState } from "../actions";

import "./styles.css";

export default function KeyEditForm({
  gameKey,
  playtester,
}: {
  gameKey: Tables<"game_key"> & { game: Tables<"game"> };
  playtester: Tables<"playtester">;
}) {
  return (
    <form
      key={gameKey.id}
      id={`editKey-${gameKey.id}`}
      className="c-key-edit-form"
    >
      <input
        name="playtesterId"
        type="text"
        value={playtester.id || undefined}
        readOnly
        hidden
      />
      <input
        name="playtesterName"
        type="text"
        value={playtester.name || undefined}
        readOnly
        hidden
      />
      <input
        name="playtesterEmail"
        type="text"
        value={playtester.email || undefined}
        readOnly
        hidden
      />
      <input
        name="keyId"
        type="text"
        value={gameKey.id || undefined}
        readOnly
        hidden
      />
      <input
        name="gameId"
        type="text"
        value={gameKey.game?.itch_id || undefined}
        readOnly
        hidden
      />
      <label>
        <span>
          Itch.io Key [{gameKey.claimed ? "Claimed" : "Pending"}] for game{" "}
          {gameKey.game.slug}
        </span>
        {gameKey.key_sent != null ? (
          <span>
            Email sent on: <Time>{gameKey.key_sent}</Time>
          </span>
        ) : null}
        <input
          name="keyUrl"
          type="text"
          value={gameKey?.url || undefined}
          readOnly
        />
      </label>
      <div className="c-key-edit-form-actions cluster">
        <button className="c-button" type="submit" formAction={updateKeyState}>
          <RefreshCcw />
        </button>
        <button
          className="c-button"
          type="submit"
          formAction={sendGameKeyEmail}
        >
          <Send />
        </button>
        <button className="c-button" type="submit" formAction={removeKey}>
          <Trash />
        </button>
      </div>
    </form>
  );
}
