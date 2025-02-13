"use client";

// External Imports
import { useQueryState } from "nuqs";

// Local Imports
import { admins } from "@/features/super-admin/data/admins";
import { DataTable } from "@/shared/components/data-table";
import { Input } from "@/shared/components/input";
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
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Search */}
      <Input className="w-full smd:w-2/3 md:w-1/2 xl:w-1/3" />

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
    </div>
  );
};
