// Local Imports
import { NewAdminForm } from "@/features/super-admin/components/new-admin-form";
import { Separator } from "@/shared/components/separator";

const NewAdminPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-10 py-8 md:gap-12 md:py-12">
      {/* First Part */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-12">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Create new admin</h1>
          <p className="text-sm font-semibold text-neutral-400 md:text-base">
            Add a new admin to your store
          </p>
        </div>
      </div>

      <Separator />

      {/* Admins Table */}
      <NewAdminForm />
    </div>
  );
};

export default NewAdminPage;
