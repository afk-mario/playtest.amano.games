"use client";

import { updateKeyState } from "app/dashboard/contact/[contactId]/edit/actions";
import { Circle, CircleCheck } from "lucide-react";
import { useActionState } from "react";
import { Tables } from "types/supabase";

export function GameKeyUpdateForm({
  playtesterId,
  gameKey,
}: {
  playtesterId: string;
  gameKey: Tables<"game_key">;
}) {
  const [, action, pending] = useActionState(updateKeyState, false);
  return (
    <form action={action} className="c-update-key-row-action">
      <input
        name="playtesterId"
        type="text"
        value={playtesterId}
        readOnly
        hidden
      />
      <input
        name="keyId"
        type="text"
        value={gameKey?.id || undefined}
        readOnly
        hidden
      />
      <input
        name="keyUrl"
        type="text"
        value={gameKey?.url || undefined}
        readOnly
        hidden
      />
      <button type="submit" disabled={gameKey == null || pending}>
        {gameKey?.claimed ? <CircleCheck color="var(--color-hl)" /> : null}
        {gameKey?.claimed ? <Circle /> : null}
      </button>
    </form>
  );
}
