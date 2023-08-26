import { Episode, EpisodeInfo } from "@/app/types";
import {
  Table,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
} from "../../molecules/Table";
import { FC } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "../../atoms/Button";
import { DataTablePagination } from "../../molecules/TablePagination";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../molecules/Dropdown";
import { EpisodeFiltersForm } from "../forms/EpisodeFilters";
// import { DataTablePagination } from "../../molecules/TablePagination";
//
//
export const columns: ColumnDef<Episode>[] = [
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const character = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <FiMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(character.name)}
            >
              Edit details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(character.name)}
            >
              Edit status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  ,
  { header: "Name", accessorKey: "name" },
  { header: "Episode", accessorKey: "episode" },
  { header: "Air date", accessorKey: "air_date" },
];

export const EpisodesTable: FC<{
  data: EpisodeInfo;
}> = ({ data: { episodes, info } }) => {
  const table = useReactTable({
    data: episodes,
    pageCount: info.pages || 0,
    columns,
    state: {
      pagination: {
        pageSize: 20,
        pageIndex: info?.next ? info.next - 1 : info.prev ? info.prev + 1 : 1,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="rounded-xl">
      <EpisodeFiltersForm />
      <div className="rounded-b-md bg-cyan">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="text-white">
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="border-t-2 border-white p-3">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
};
