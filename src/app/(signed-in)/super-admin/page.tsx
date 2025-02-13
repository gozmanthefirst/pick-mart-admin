// External Imports
import { TbPlus } from "react-icons/tb";

// Local Imports
import { AdminTable } from "@/features/super-admin/components/admin-table";
import { admins } from "@/features/super-admin/data/admins";
import { Button } from "@/shared/components/button";
import { Separator } from "@/shared/components/separator";

const SuperAdminPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-10 py-8 md:gap-12 md:py-12">
      {/* First Part */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-12">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">
            Admins ({admins.length})
          </h1>
          <p className="text-sm font-semibold text-neutral-400 md:text-base">
            Manage admins for your store
          </p>
        </div>

        <div>
          <>
            {/* Large */}
            <Button size={"xl"} className="hidden w-full md:inline-flex">
              <TbPlus size={20} strokeWidth={3} />
              <span>Add New</span>
            </Button>

            {/* Small */}
            <Button size={"lg"} className="w-full md:hidden">
              <TbPlus size={20} strokeWidth={3} />
              <span>Add New</span>
            </Button>
          </>
        </div>
      </div>

      <Separator />

      {/* Admins Table */}
      <AdminTable />
    </div>
  );
};

export default SuperAdminPage;
