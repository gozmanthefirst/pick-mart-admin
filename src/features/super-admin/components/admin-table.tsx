// Local Imports
import { adminTableColumns } from "@/features/super-admin/components/admin-table-column";
import { admins } from "@/features/super-admin/data/admins";
import { DataTable } from "@/shared/components/data-table";

export const AdminTable = () => {
  return (
    <div>
      <DataTable columns={adminTableColumns} data={admins} />
    </div>
  );
};
