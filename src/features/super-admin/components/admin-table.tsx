"use client";

// External Imports
import { useQueryState } from "nuqs";

// Local Imports
import { adminTableColumns } from "@/features/super-admin/components/admin-table-column";
import { admins } from "@/features/super-admin/data/admins";
import { DataTable } from "@/shared/components/data-table";
import { Pagination } from "@/shared/components/pagination";
import { usePaginate } from "@/shared/hooks/use-paginate";

export const AdminTable = () => {
  const [page, setPage] = useQueryState("page", { defaultValue: "" });

  // Pagination
  const pageIndex = Number(page) ? Number(page) - 1 : 0;
  const pageSize = 10;
  const paginate = usePaginate(admins, pageSize, pageIndex);

  return (
    <div>
      <DataTable
        columns={adminTableColumns}
        data={admins}
        pagination={{
          pageIndex,
          pageSize,
        }}
      />

      <Pagination paginate={paginate} pageIndex={pageIndex} />
    </div>
  );
};
