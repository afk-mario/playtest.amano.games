import { createColumnHelper } from "@tanstack/react-table";
import { Tables } from "types/supabase";
import Link from "next/link";
import { Circle, CircleCheck } from "lucide-react";
import PlaytesterWidget from "../playtester-widget";
import PlaytesterTagsCell from "./cells/playtester-tags-cell";
import PlaytesterGameKeyCell from "./cells/playtester-game-key-cell";

export type PlaytesterWithGameKeys = {
  game_key: (Tables<"game_key"> & { game: Tables<"game"> })[];
  social_profile: Tables<"social_profile">[];
  feedback: Tables<"feedback">[];
} & Tables<"playtester">;

export const columnHelper = createColumnHelper<PlaytesterWithGameKeys>();
export const columns = [
  columnHelper.accessor("id", {
    header: "№",
    cell: (info) => (
      <Link href={`/dashboard/contact/${info.getValue()}/edit/`}>
        {info.row.index + 1}
      </Link>
    ),
  }),
  columnHelper.display({
    id: "playtester",
    cell: (props) => {
      return <PlaytesterWidget playtester={props.row.original} />;
    },
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => {
      return (
        <Link href={`/dashboard/contact/${info.row.getValue("id")}/edit/`}>
          {info.getValue()}
        </Link>
      );
    },
  }),
  columnHelper.accessor("email", {
    header: "email",
    cell: (info) => {
      return (
        <Link href={`/dashboard/contact/${info.row.getValue("id")}/edit/`}>
          {info.getValue()}
        </Link>
      );
    },
  }),
  columnHelper.accessor("game_key", {
    header: "Game keys",
    cell: (info) => {
      const playtesterId = info.row.getValue("id") as string;
      const gameKeys = info.getValue();
      return (
        <PlaytesterGameKeyCell
          playtesterId={playtesterId}
          gameKeys={gameKeys}
        />
      );
    },
  }),
  columnHelper.accessor("tags", {
    header: "Tags",
    cell: (info) => {
      const playtesterId = info.row.getValue("id") as string;
      const tags = info.getValue() as string;
      return <PlaytesterTagsCell playtesterId={playtesterId} tags={tags} />;
    },
  }),
  columnHelper.accessor((row) => row.feedback.length > 0, {
    header: "Feedback?",
    cell: (info) => {
      if (info.getValue()) {
        return <CircleCheck color="var(--color-hl)" />;
      }
      return <Circle color="var(--color-fg-alt)" />;
    },
  }),
];
