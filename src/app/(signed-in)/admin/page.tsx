// External Imports
import { TbPlus } from "react-icons/tb";
import { Suspense } from "react";

// Local Imports
import { ProductTable } from "@/features/admin/components/product-table";
import { products } from "@/features/admin/data/products";
import { Button } from "@/shared/components/button";
import { Separator } from "@/shared/components/separator";

const AdminPage = () => {
  return (
    <Suspense>
      <div className="flex flex-1 flex-col gap-10 py-8 md:gap-12 md:py-12">
        {/* First Part */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-12">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">
              Products ({products.length})
            </h1>
            <p className="text-sm font-semibold text-neutral-400 md:text-base">
              Manage products for the store
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

        {/* Products Table */}
        <ProductTable />
      </div>
    </Suspense>
  );
};

export default AdminPage;
