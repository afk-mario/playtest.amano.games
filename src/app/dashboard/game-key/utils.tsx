import { Tables } from "types/supabase";
import {
  Ban,
  Check,
  Clock1,
  Send,
  TicketSlashIcon,
  UserPlus,
} from "lucide-react";

export const status = [
  "invalid",
  "available",
  "assigned",
  "sent",
  "claimed",
] as const;

export type GameKeyStatus = (typeof status)[number];

export function getKeyStatus(
  gameKey: Tables<"game_key"> & { game: Tables<"game"> },
): GameKeyStatus {
  if (!gameKey.game) {
    return "invalid";
  }

  if (!gameKey.playtester) {
    return "available";
  }

  if (!gameKey.key_sent) {
    return "assigned";
  }

  if (!gameKey.claimed) {
    return "sent";
  }

  return "claimed";
}

export function getKeyStatusIcon(
  gameKey: Tables<"game_key"> & { game: Tables<"game"> },
) {
  const status = getKeyStatus(gameKey);
  switch (status) {
    case "invalid":
      return <Ban />;
    case "available":
      return <UserPlus />;
    case "assigned":
      return <Send />;
    case "sent":
      return <TicketSlashIcon />;
    case "claimed":
      return <Check />;
    default:
      return <Ban />;
  }
}
