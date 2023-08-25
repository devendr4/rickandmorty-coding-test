/* import { Table } from "@tanstack/react-table";

import { Button } from "@/app/components/atoms/Button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
} */
import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";
import { Table } from "@tanstack/react-table";

import { Button } from "@/app/components/atoms/Button";
import { useRootStore } from "@/app/store";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData> & {}) {
  const { pageIndex } = table.getState().pagination;

  const pageCount = table.getPageCount();
  const { getCharacters } = useRootStore();
  console.log(pageIndex, pageCount);
  return (
    <div className="flex items-center justify-center px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={async () => {
              await getCharacters({
                page: 0,
              });

              table.setPageIndex(0);
            }}
            disabled={!(table.getState().pagination.pageIndex > 1)}
          >
            <span className="sr-only">Go to first page</span>
            <RxDoubleArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={async () => {
              await getCharacters({
                page: table.getState().pagination.pageIndex - 1,
              });
              table.previousPage();
            }}
            disabled={!(table.getState().pagination.pageIndex > 1)}
          >
            <span className="sr-only">Go to previous page</span>
            <RxChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={async () => {
              await getCharacters({
                page: table.getState().pagination.pageIndex + 1,
              });
              table.nextPage();
            }}
            disabled={!(pageIndex < pageCount)}
          >
            <span className="sr-only">Go to next page</span>
            <RxChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={async () => {
              await getCharacters({
                page: table.getPageCount(),
              });
              table.setPageIndex(table.getPageCount() - 1);
            }}
            disabled={!(pageIndex < pageCount)}
          >
            <span className="sr-only">Go to last page</span>
            <RxDoubleArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
