"use client";

import React from "react";
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

const columnHelper = createColumnHelper<Tables<"playtester">>();
const columns = [
  columnHelper.accessor("id", {
    header: "№",
    cell: (info) => info.row.index + 1,
  }),
  columnHelper.display({
    id: "playtester",
    cell: (props) => {
      return <PlaytesterWidget playtester={props.row.original} />;
    },
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("tags", {
    header: "Tags",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("signup_at", {
    header: "Signup",
    cell: (info) => <Time formatStr="PP | hh:mm:ss">{info.getValue()}</Time>,
  }),
  columnHelper.accessor("created_at", {
    header: "Created",
    cell: (info) => <Time formatStr="PP | hh:mm:ss">{info.getValue()}</Time>,
  }),
];

export default function PlaytesterTable({
  defaultData,
}: {
  defaultData: Tables<"playtester">[];
}) {
  const [data, _setData] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="c-table-container">
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
