import { Info } from "@/app/types";
import {
  Table,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
} from "../../molecules/Table";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "../../molecules/TablePagination";

interface GenericTableProps<T> {
  data: { info: Info; results: T[] };
  columns: ColumnDef<T>[];
  dataType: "char" | "episode";
}

export const GenericDataTable = <T extends object>({
  data: { results, info },
  columns,
  dataType,
}: GenericTableProps<T>) => {
  const table = useReactTable({
    data: results,
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
    <div className=" to-cyan rounded-b-md bg-gradient-to-l  from-green opacity-90">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="border-t-2 border-white p-3">
        <DataTablePagination table={table} dataType={dataType} />
      </div>
    </div>
  );
};
