'use client'
import { City } from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const columns: ColumnDef<City>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "city",
        header: "City"
    },
    {
        accessorKey: "state_name",
        header: "State"
    },
    {
        accessorKey: "population",
        header: "Population"
    },
    {
        accessorKey: "density",
        header: "Density"
    },
    {
        accessorKey: "timezone",
        header: "Timezone"
    },
    {
        accessorKey: "ranking",
        header: "Ranking"
    },
    {
        accessorKey: "actions",
        header: "actions",
        cell: ({ row }) => <Link href={`/dashboard/cities/${row.original.id}`}><Button>View</Button></Link>
    },
];