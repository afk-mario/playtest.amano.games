"use client";

import React from "react";
import Link from "next/link";
import { Circle, CircleCheck } from "lucide-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Tables } from "types/supabase";

import PlaytesterWidget from "../playtester-widget";

import { updateKeyState } from "app/dashboard/contact/[contactId]/edit/actions";

import "./styles.css";
import "./actions.css";
import { PlaytesterSendEmailForm } from "../playtester-send-email-form";

type PlaytesterWithGameKeys = {
  game_key: Tables<"game_key">[];
  social_profile: Tables<"social_profile">[];
  feedback: Tables<"feedback">[];
} & Tables<"playtester">;

const columnHelper = createColumnHelper<PlaytesterWithGameKeys>();
const columns = [
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
        <Link href={`/dashboard/playtester/${info.row.getValue("id")}/edit/`}>
          {info.getValue()}
        </Link>
      );
    },
  }),
  columnHelper.accessor("tags", {
    header: "Tags",
    cell: (info) => {
      return (
        <Link
          className="cell-tag"
          href={`/dashboard/contact/${info.row.getValue("id")}/edit/`}
        >
          <ul className="c-tag-list">
            {info
              .getValue()
              ?.split(",")
              .map((tag, i) => (
                <li key={i}>
                  <span className="c-tag">{tag}</span>
                </li>
              ))}
          </ul>
        </Link>
      );
    },
  }),
  // columnHelper.accessor("signup_at", {
  //   header: "Signup",
  //   cell: (info) => {
  //     return (
  //       <Link href={`/dashboard/contact/${info.row.getValue("id")}/edit/`}>
  //         <Time formatStr="PP hh:mm:ss">{info.getValue()}</Time>;
  //       </Link>
  //     );
  //   },
  // }),
  // columnHelper.accessor("created_at", {
  //   header: "Created",
  //   cell: (info) => {
  //     return (
  //       <Link href={`/dashboard/contact/${info.row.getValue("id")}/edit/`}>
  //         <Time formatStr="PP hh:mm:ss">{info.getValue()}</Time>
  //       </Link>
  //     );
  //   },
  // }),
  columnHelper.accessor("game_key", {
    header: "Key?",
    cell: (info) => {
      return (
        <Link href={`/dashboard/contact/${info.row.getValue("id")}/edit/`}>
          {info.getValue().length > 0 ? (
            <CircleCheck color="var(--color-hl)" />
          ) : (
            <Circle />
          )}
        </Link>
      );
    },
  }),
  columnHelper.accessor("game_key", {
    id: "key_sent",
    header: "Sent?",
    cell: (info) => {
      const playtester = info.row.original;
      const [gameKey] = info.getValue();
      const hasKey = gameKey != null;
      const keySent = gameKey?.key_sent != null;
      if (keySent) {
        return (
          <Link href={`/dashboard/contact/${info.row.getValue("id")}/edit/`}>
            <CircleCheck color="var(--color-hl)" />
          </Link>
        );
      }
      if (hasKey) {
        return <PlaytesterSendEmailForm playtester={playtester} />;
      }
      return <Circle />;
    },
  }),
  columnHelper.accessor((row) => row.game_key[0]?.claimed, {
    header: "Claimed?",
    cell: (info) => {
      const gameKeys: Tables<"game_key">[] =
        info.row.getValue("game_key") || [];
      const [gameKey] = gameKeys;
      return (
        <form action={updateKeyState} className="c-update-key-row-action">
          <input
            name="playtesterId"
            type="text"
            value={info.row.getValue("id")}
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
          <button type="submit" disabled={gameKey == null}>
            {info.getValue() ? (
              <CircleCheck color="var(--color-hl)" />
            ) : (
              <Circle />
            )}
          </button>
        </form>
      );
    },
  }),
  columnHelper.accessor((row) => row.feedback.length > 0, {
    header: "Feedback?",
    cell: (info) => {
      if (info.getValue()) {
        return <CircleCheck color="var(--color-hl)" />;
      }
      return <Circle />;
    },
  }),
];

export default function PlaytesterTable({
  defaultData,
}: {
  defaultData: PlaytesterWithGameKeys[];
}) {
  const [data] = React.useState(() => [...defaultData]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: (e) => {
      setRowSelection(e);
    },
  });

  // const selectedCount = table.getSelectedRowModel().flatRows.length;
  // const selectedPlaytesters = table
  //   .getSelectedRowModel()
  //   .rows.map((row) => row.original);

  return (
    <div className="c-playtester-table c-table-container | stack">
      <table>
        <thead className="c-table-header">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="c-table-row" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
