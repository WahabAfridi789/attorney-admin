"use client";
import { CopyIcon } from "lucide-react"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QuillForm } from "./quill-form"
import { PlusCircle } from "lucide-react"

export function AddArticleModal() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}

        >
            <DialogTrigger asChild>
                <Button variant="outline">Add
                    <PlusCircle className="w-5 h-5 ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent className=" sm:max-w-md">
                <DialogHeader className="flex justify-center items-center">
                    <DialogTitle>Add Article</DialogTitle>

                </DialogHeader>


                <DialogFooter className="flex justify-between sm:justify-start">
                    <DialogClose asChild className="w-full" >
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
