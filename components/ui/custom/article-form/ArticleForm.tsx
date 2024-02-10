"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { QuillForm } from "@/components/ui/custom/city-menu-tab/quill-form";
import action from "@/app/actions"

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
import { createArticle, updateArticleById } from "@/lib/service"
import { useRouter } from "next/navigation"
const articleFormSchema = z.object({
    title: z
        .string()
        .min(2, {
            message: "City name must be at least 2 characters.",
        })
        .max(30, {
            message: "City name must not be longer than 30 characters.",
        }),
    author: z.string().min(2).max(50), // Assuming state code is 2 characters long
    body: z.string(), // Assuming state code is 2 characters long
})

type articleFormValues = z.infer<typeof articleFormSchema>




export function ArticleForm({ article, id }: { article: any, id: string }) {
    console.log("Inside article", article)
    const form = useForm<articleFormValues>({
        resolver: zodResolver(articleFormSchema),
        defaultValues: article,
        mode: "onChange",
    })

    const navigate = useRouter();

    async function onSubmit(data: articleFormValues) {

        if (!article) {
            const payload = {
                ...data,
                cityId: id
            } as any
            console.log("create payload", payload)

            const result = await createArticle(payload)
            //@ts-ignore
            if (result === 'success') {
                toast({
                    title: "Article Added",
                    //@ts-ignore
                    description: result.message,
                    variant: "success",
                })

                action("fetchArticle")

                navigate.push('/articles')
            }

        }
        else {

            console.log("update payload", article.id, data)

            const result = await updateArticleById(article.id, data)
            //@ts-ignore
            if (result.status === 'success') {
                toast({
                    title: "Article Updated",
                    //@ts-ignore
                    description: result.message,
                    variant: "success",
                })
                action("fetchArticle")
                navigate.push('/articles')
            }
        }
    }

    return (
        <>
            {
                typeof window !== "undefined" && <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Article Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Article title" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is title of the article.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Author" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the author of the article.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />


                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => {

                                return (
                                    <FormItem>
                                        <FormLabel>Article</FormLabel>
                                        <FormControl>
                                            <QuillForm field={field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                            }
                        />




                        <Button type="submit">{article ? "Update" : "Add Article"}</Button>
                    </form>
                </Form>
            }

        </>
    )
}