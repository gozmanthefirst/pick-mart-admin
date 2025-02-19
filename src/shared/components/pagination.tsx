"use client";

// External Imports
import { Table } from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

// Local Imports
import { cn } from "../lib/utils/cn";
import { Button } from "./button";

interface Props<TData, TValue> {
  table: Table<TData>;
  className?: string;
}

export const Pagination = <TData, TValue>({
  table,
  className,
}: Props<TData, TValue>) => {
  const [_, setPage] = useQueryState("page", { defaultValue: "" });

  const [paginationArray, setPaginationArray] = useState<string[]>([]);

  const totalPages = table.getPageCount();
  const totalRows = table.getRowCount();
  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageLowerLimit = pageSize * pageIndex + 1;
  const calcUpperLimit = pageSize * pageIndex + pageSize;
  const pageUpperLimit =
    calcUpperLimit < totalRows ? calcUpperLimit : totalRows;
  const page = pageIndex + 1;

  useEffect(() => {
    const generatePaginationArray = () => {
      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => String(i + 1));
      } else if (pageIndex < 2 || pageIndex >= totalPages - 2) {
        return [
          ...Array.from({ length: Math.min(2, totalPages) }, (_, i) =>
            String(i + 1),
          ),
          "...",
          ...Array.from({ length: 2 }, (_, i) => String(totalPages - 1 + i)),
        ];
      } else {
        return ["1", "...", String(page), "...", String(totalPages)];
      }
    };

    setPaginationArray(generatePaginationArray());
  }, [totalPages, pageIndex, page]);

  useEffect(() => {
    if (page === 1) {
      setPage("");
    }
    if (page > totalPages) {
      setPage(String(totalPages));
    }
    if (page < 1) {
      setPage(String(1));
    }
  }, [page, totalPages, setPage]);

  return (
    <section className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-6">
      <div className="text-sm md:text-base">
        Results: {pageLowerLimit} - {pageUpperLimit} of {totalRows}
      </div>

      <div className={cn("flex items-center gap-2 md:gap-3", className)}>
        {/* Previous Button */}
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          variant="secondary"
          size={"icon"}
          className="flex-none gap-2"
        >
          <TbChevronLeft size={20} />
        </Button>

        {/* Pagination */}
        <div className="flex flex-none items-center gap-2 md:gap-3">
          {paginationArray.map((item, index) => (
            <Button
              key={index}
              size="icon"
              onClick={() =>
                !isNaN(Number(item)) && table.setPageIndex(Number(item) - 1)
              }
              disabled={item === "..."}
              variant={Number(item) === page ? "brand" : "secondary"}
              className={cn(
                "font-semibold",
                Number(item) === page && "font-bold",
              )}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* Next Button */}
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          variant="secondary"
          size={"icon"}
          className="flex-none gap-2"
        >
          <TbChevronRight size={20} />
        </Button>
      </div>
    </section>
  );
};
