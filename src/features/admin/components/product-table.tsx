"use client";

// External Imports
import { useQueryState } from "nuqs";

// Local Imports
import { DataTable } from "@/shared/components/data-table";
import { Pagination } from "@/shared/components/pagination";
import { usePaginate } from "@/shared/hooks/use-paginate";
import { products } from "../data/products";
import { productTableColumns } from "./product-table-column";

export const ProductTable = () => {
  const [page, setPage] = useQueryState("page", { defaultValue: "" });

  // Pagination
  const pageIndex = Number(page) ? Number(page) - 1 : 0;
  const pageSize = 10;
  const paginate = usePaginate(products, pageSize, pageIndex);

  return (
    <div>
      <DataTable
        columns={productTableColumns}
        data={products}
        pagination={{
          pageIndex,
          pageSize,
        }}
      />

      <Pagination paginate={paginate} pageIndex={pageIndex} />
    </div>
  );
};
