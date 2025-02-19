// Local Imports
import { DataTable } from "@/shared/components/data-table";
import { products } from "../data/products";
import { productTableColumns } from "./product-table-column";

export const ProductTable = () => {
  return (
    <div>
      <DataTable columns={productTableColumns} data={products} />
    </div>
  );
};
