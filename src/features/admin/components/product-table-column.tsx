"use client";

// External Imports
import { ColumnDef } from "@tanstack/react-table";
import { TbDots } from "react-icons/tb";

// Local Imports
import { Product } from "@/shared/types";

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (props) => {
      const price = parseFloat(props.row.getValue("price"));
      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return formattedPrice;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    id: "actions",
    cell: (props) => <TbDots size={20} />,
  },
];
