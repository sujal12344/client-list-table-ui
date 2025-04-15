import { Client } from "@/types/client";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarIcon, GridIcon, MailIcon, User2 } from "lucide-react";

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "id",
    header: () => (
      <div className="flex items-center">
        <GridIcon className="h-4 w-4 mr-2 text-gray-500" />
        Client ID
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center">
        <User2 className="h-4 w-4 mr-2 text-gray-500" />
        Client Name
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Client Type",
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="flex items-center">
        <MailIcon className="h-4 w-4 mr-2 text-gray-500" />
        Email
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex items-center">
          <div
            className={`h-2.5 w-2.5 rounded-full mr-2 ${
              status === "Active" ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center">
        <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
        Created At
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => (
      <div className="flex items-center">
        <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
        Updated At
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date;
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
    },
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
  },
];
