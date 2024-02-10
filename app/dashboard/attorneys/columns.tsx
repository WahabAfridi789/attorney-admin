'use client'
import { Attorney, City } from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const columns: ColumnDef<Attorney>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "address",
        header: "Address"
    },
    {
        accessorKey: "website",
        header: "Website"
    },
    {
        accessorKey: "phone",
        header: "Phone"
    },
    {
        accessorKey: "website",
        header: "actions",
        cell: ({ row }) => <Link href={`/dashboard/attorneys/${row.original.id}`}><Button>View</Button></Link>
    },
];