"use client";
import { Tables } from "types/supabase";
import { Send } from "lucide-react";

import { sendGameKeyEmail } from "app/dashboard/contact/[contactId]/edit/actions";

import "./styles.css";
import { useActionState } from "react";
import Spinner from "components/spinner";

export function PlaytesterSendEmailForm({
  playtester,
}: {
  playtester: Tables<"playtester"> & {
    game_key: Tables<"game_key">[];
  };
}) {
  const [gameKey] = playtester.game_key;
  const [, action, pending] = useActionState(sendGameKeyEmail, false);
  return (
    <form className="c-playtester-send-mail-form" action={action}>
      <input
        name="playtesterId"
        type="text"
        value={playtester.id}
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
        name="keyUrl"
        type="text"
        value={gameKey.url || undefined}
        readOnly
        hidden
      />
      <button className="c-button" type="submit" disabled={pending}>
        {pending ? <Spinner /> : <Send color="currentColor" />}
      </button>
    </form>
  );
}
