import Link from "next/link";
import { Tables } from "types/supabase";
import { createColumnHelper } from "@tanstack/react-table";
import PlaytesterWidget from "components/playtester/playtester-widget";
import Time from "components/time";
import { Circle, CircleCheck } from "lucide-react";

export type GameKeyWithPlaytester = Tables<"game_key"> & {
  playtester: Tables<"playtester">;
  game: Tables<"game">;
};

export const columnHelper = createColumnHelper<GameKeyWithPlaytester>();
export const columns = [
  columnHelper.accessor("id", {
    header: "№",
    cell: (info) => (
      <Link href={`/dashboard/game-key/${info.getValue()}/edit/`}>
        {info.row.index + 1}
      </Link>
    ),
  }),
  columnHelper.display({
    id: "playtester",
    header: "Contact",
    cell: (props) => {
      const { playtester } = props.row.original;
      if (playtester) {
        return <PlaytesterWidget playtester={playtester} />;
      }
    },
  }),
  columnHelper.display({
    id: "game",
    header: "Game",
    cell: (props) => {
      const { game } = props.row.original;
      console.log(game);
      if (game) {
        return <span>{game.name}</span>;
      }
    },
  }),
  columnHelper.accessor("url", {
    header: "URL",
    cell: (props) => {
      const url = props.getValue();
      if (url) {
        return (
          <a className="c-game-key-url-cell" href={url}>
            {props.getValue()}
          </a>
        );
      } else {
        return null;
      }
    },
  }),
  columnHelper.accessor("claimed", {
    cell: (props) => {
      if (props.getValue()) {
        return <CircleCheck color="var(--color-hl)" />;
      }
      return <Circle color="var(--color-fg-alt)" />;
    },
  }),
  columnHelper.accessor("key_sent", {
    cell: (props) => {
      const value = props.getValue() as string;
      if (value) {
        return <Time>{value}</Time>;
      }
    },
  }),
];
