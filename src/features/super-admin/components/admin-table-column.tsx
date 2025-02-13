"use client";

// External Imports
import { ColumnDef } from "@tanstack/react-table";
import { TbDots } from "react-icons/tb";

// Local Imports
import { Admin } from "@/shared/types";

export const adminTableColumns: ColumnDef<Admin>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "products",
    header: "No. of products",
  },
  {
    id: "actions",
    cell: (props) => <TbDots size={20} />,
  },
];
