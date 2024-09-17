"use client";

import React, { HTMLProps } from "react";
import Link from "next/link";
import { Circle, CircleCheck } from "lucide-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Tables } from "types/supabase";

import Time from "components/time";
import PlaytesterWidget from "../playtester-widget";

import "./styles.css";
import { markAsSent } from "app/dashboard/actions";

type PlaytesterWithGameKeys = {
  game_key: Tables<"game_key">[];
} & Tables<"playtester">;

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

const columnHelper = createColumnHelper<PlaytesterWithGameKeys>();
const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div>
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  columnHelper.accessor("id", {
    header: "№",
    cell: (info) => (
      <Link href={`/dashboard/playtester/${info.getValue()}/edit/`}>
        {info.row.index + 1}
      </Link>
    ),
  }),
  columnHelper.display({
    id: "playtester",
    cell: (props) => {
      return (
        <Link href={`/dashboard/playtester/${props.row.getValue("id")}/edit/`}>
          <PlaytesterWidget playtester={props.row.original} />
        </Link>
      );
    },
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => {
      return (
        <Link href={`/dashboard/playtester/${info.row.getValue("id")}/edit/`}>
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
        <Link href={`/dashboard/playtester/${info.row.getValue("id")}/edit/`}>
          {info.getValue()}
        </Link>
      );
    },
  }),
  // columnHelper.accessor("signup_at", {
  //   header: "Signup",
  //   cell: (info) => {
  //     return (
  //       <Link href={`/dashboard/playtester/${info.row.getValue("id")}/edit/`}>
  //         <Time formatStr="PP hh:mm:ss">{info.getValue()}</Time>;
  //       </Link>
  //     );
  //   },
  // }),
  // columnHelper.accessor("created_at", {
  //   header: "Created",
  //   cell: (info) => {
  //     return (
  //       <Link href={`/dashboard/playtester/${info.row.getValue("id")}/edit/`}>
  //         <Time formatStr="PP hh:mm:ss">{info.getValue()}</Time>
  //       </Link>
  //     );
  //   },
  // }),
  columnHelper.accessor("game_key", {
    header: "Key?",
    cell: (info) => {
      return (
        <Link href={`/dashboard/playtester/${info.row.getValue("id")}/edit/`}>
          {info.getValue().length > 0 ? (
            <CircleCheck color="var(--color-hl)" />
          ) : (
            <Circle />
          )}
        </Link>
      );
    },
  }),
  columnHelper.accessor("key_sent", {
    header: "Sent?",
    cell: (info) => {
      return (
        <Link href={`/dashboard/playtester/${info.row.getValue("id")}/edit/`}>
          {info.getValue() ? (
            <CircleCheck color="var(--color-hl)" />
          ) : (
            <Circle />
          )}
        </Link>
      );
    },
  }),
];

export default function PlaytesterTable({
  defaultData,
}: {
  defaultData: PlaytesterWithGameKeys[];
}) {
  const [data, _setData] = React.useState(() => [...defaultData]);
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

  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.getValue("id"))
    .join(",");

  return (
    <div className="c-table-container | stack">
      <div className="cluster">
        <form action={markAsSent}>
          <input
            name="selected"
            type="text"
            value={selectedIds}
            hidden
            readOnly
          />
          <input
            name="timestamp"
            type="text"
            value="2024-09-12 01:12:08+00"
            hidden
            readOnly
          />
          <button type="submit">Mark as sent</button>
        </form>
      </div>
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
                        header.getContext()
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
                        header.getContext()
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
