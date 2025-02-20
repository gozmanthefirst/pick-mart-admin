// External Imports
import { TbPlus } from "react-icons/tb";

// Local Imports
import { AdminTable } from "@/features/super-admin/components/admin-table";
import { admins } from "@/features/super-admin/data/admins";
import { buttonVariants } from "@/shared/components/button";
import { Separator } from "@/shared/components/separator";
import { cn } from "@/shared/lib/utils/cn";
import Link from "next/link";

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
            <Link
              href={"/super-admin/new-admin"}
              className={cn(
                buttonVariants({ size: "xl" }),
                "hidden w-full md:inline-flex",
              )}
            >
              <TbPlus size={20} strokeWidth={3} />
              <span>Add New</span>
            </Link>

            {/* Small */}
            <Link
              href={"/super-admin/new-admin"}
              className={cn(buttonVariants({ size: "lg" }), "w-full md:hidden")}
            >
              <TbPlus size={20} strokeWidth={3} />
              <span>Add New</span>
            </Link>
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
