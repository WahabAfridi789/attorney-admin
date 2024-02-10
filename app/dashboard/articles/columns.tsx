'use client'
import { Article, City } from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const columns: ColumnDef<Article>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "author",
        header: "Auther"
    },
    {
        accessorKey: "city",
        header: "City",
        cell: ({ row }) => <p>{row.original.cityId.city}</p>
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "actions",
        header: "actions",
        cell: ({ row }) => <Link href={`/dashboard/articles/${row.original.id}`}><Button>View</Button></Link>
    },
];