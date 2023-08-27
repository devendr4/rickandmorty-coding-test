import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from "react-icons/rx";
import { Table } from "@tanstack/react-table";

import { Button } from "@/app/components/atoms/Button";
import { useRootStore } from "@/app/store";
import { useCallback } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
  dataType,
}: DataTablePaginationProps<TData> & { dataType: "char" | "episode" }) {
  const { pageIndex } = table.getState().pagination;

  const pageCount = table.getPageCount();
  const { setCharacterFilters, setEpisodeFilters } = useRootStore();

  const setFilters = useCallback(
    (filters: { page: number }) => {
      if (dataType === "char") return setCharacterFilters(filters);
      return setEpisodeFilters(filters);
    },
    [dataType, setCharacterFilters, setEpisodeFilters]
  );
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
            className="flex h-8 w-8 p-0"
            onClick={async () => {
              await setFilters({
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
              await setFilters({
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
              await setFilters({
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
            className=" flex h-8 w-8 p-0"
            onClick={async () => {
              await setFilters({
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
