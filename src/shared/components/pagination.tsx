"use client";

// External Imports
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

// Local Imports
import { cn } from "../lib/utils/cn";
import { Button } from "./button";

interface Props {
  className?: string;
  paginate: {
    lowerLimit: number;
    upperLimit: number;
    first: boolean;
    last: boolean;
    noOfpages: number;
    array: any[];
  };
  pageIndex: number;
}

export const Pagination = ({ className, paginate, pageIndex }: Props) => {
  const [_, setPage] = useQueryState("page", { defaultValue: "" });

  const [paginationArray, setPaginationArray] = useState<string[]>([]);

  const page = pageIndex + 1;

  useEffect(() => {
    const generatePaginationArray = () => {
      const totalPages = paginate.noOfpages;

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
  }, [paginate.noOfpages, pageIndex, page]);

  useEffect(() => {
    if (page === 1) {
      setPage("");
    }
    if (page > paginate.noOfpages) {
      setPage(String(paginate.noOfpages));
    }
    if (page < 1) {
      setPage(String(1));
    }
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(String(newPage));
  };

  return (
    <section className="flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between md:gap-6 md:py-10">
      <div className="text-fgd-secondary text-sm md:text-base">
        Results: {paginate.lowerLimit + 1} - {paginate.upperLimit} of{" "}
        {paginate.array.length}
      </div>

      <div className={cn("flex items-center gap-2 md:gap-3", className)}>
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={paginate.first}
          variant="secondary"
          size={"icon"}
          className="flex-none gap-2"
        >
          <TbChevronLeft size={20} />
        </Button>

        {/* Desktop Pagination */}
        <div className="flex flex-none items-center gap-2 md:gap-3">
          {paginationArray.map((item, index) => (
            <Button
              key={index}
              size="icon"
              onClick={() =>
                !isNaN(Number(item)) && handlePageChange(Number(item))
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

        {/* Mobile Pagination */}
        {/* <div className="flex items-center gap-3 lg:hidden">
        <Button size="icon" variant="ghost" className={cn("font-semibold")}>
          {page}
        </Button>
        <span>of</span>
        <Button size="icon" variant="ghost" className={cn("font-semibold")}>
          {paginate.noOfpages}
        </Button>
      </div> */}

        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={paginate.last}
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
