"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Button } from "../../button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../form"
import { Input } from "../../input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../select"
import { Textarea } from "../../textarea"
import { toast } from "../../use-toast"

const faqFormSchema = z.object({
    prompt: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        })
})

type FaqsFormValues = z.infer<typeof faqFormSchema>

// This can come from your database or API.
const defaultValues: Partial<FaqsFormValues> = {
    prompt: "",
}

export function FaqForm() {
    const form = useForm<FaqsFormValues>({
        resolver: zodResolver(faqFormSchema),
        defaultValues,
        mode: "onChange",
    })

    function onSubmit(data: FaqsFormValues) {
        console.log("DATA", data)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (

        <div className="flex flex-col space-y-4 pt-4 justify-center items-center">
            <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It's animated by default, but you can disable it if you prefer.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="flex space-x-2 justify-center items-center">
                <Button type="submit">Save</Button>

                <Button>Generate new</Button>

            </div>
        </div>
    )
}