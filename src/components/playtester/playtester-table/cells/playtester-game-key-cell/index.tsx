import Link from "next/link";
import { Tables } from "types/supabase";
import { CircleCheck, CircleUser, Loader, Send } from "lucide-react";

import "./styles.css";

function getGameKeyState(gameKey: Tables<"game_key">) {
  if (gameKey.claimed) {
    return "claimed";
  }
  if (gameKey.key_sent) {
    return "sent";
  }
  if (gameKey.playtester) {
    return "assigned";
  }
  return "idle";
}

function getGameKeyIcon(gameKey: Tables<"game_key">) {
  const state = getGameKeyState(gameKey);
  switch (state) {
    case "claimed":
      return null;
    case "sent":
      return <Loader />;
    case "assigned":
      return <Send />;
    case "idle":
      return <CircleUser />;
  }
}

export default function PlaytesterGameKeyCell({
  gameKeys,
  playtesterId,
}: {
  gameKeys: (Tables<"game_key"> & { game: Tables<"game"> })[];
  playtesterId: string;
}) {
  if (gameKeys.length == 0) {
    return null;
  }

  return (
    <div className="c-playtester-game-key-cell">
      {gameKeys.map((item) => {
        return (
          <Link
            key={item.id}
            href={`/dashboard/contact/${playtesterId}/edit`}
            className="c-playtester-game-key-item c-button"
            data-hierarchy="secondary"
          >
            {getGameKeyIcon(item)}
            {item.game.name}
          </Link>
        );
      })}
    </div>
  );
}
