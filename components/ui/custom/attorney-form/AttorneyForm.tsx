"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
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
import { createAttorney, updateAttorneyById } from "@/lib/service"
import action from "@/app/actions"

const attorneyFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    address: z.string().max(160).min(4),
    phone: z.string().max(20).min(4),
    website: z.string().max(160).min(4),


})

type AttorneyFormValues = z.infer<typeof attorneyFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AttorneyFormValues> = {
    name: "",
    email: "",
    address: "",
    phone: "",
    website: "",
}

export function AttorneyForm({ attorney, id }: { attorney: object, id: string }) {
    const navigate = useRouter();
    const form = useForm<AttorneyFormValues>({
        resolver: zodResolver(attorneyFormSchema),
        defaultValues: attorney || defaultValues,
        mode: "onChange",
    })


    async function onSubmit(data: AttorneyFormValues) {
        console.log("DATA", data)


        if (attorney) {
            //@ts-ignore
            const result = await updateAttorneyById(attorney?.id, data);
            //@ts-ignore
            if (result.status === 'success') {
                toast({
                    title: "Attorney Updated",
                    //@ts-ignore
                    description: result.message,
                    variant: "success",
                })

                action('fetchAttorney')
                navigate.push('/dashboard/attorneys')

            }
        }
        else {
            console.log("create")
            const payload = {
                ...data,
                cityId: id
            }
            //@ts-ignore    
            const result = await createAttorney(payload);
            //@ts-ignore
            if (result.status === 'success') {
                toast({
                    title: "Attorney Added",
                    //@ts-ignore
                    description: result.message,
                    variant: "success",
                })
                action('fetchAttorney')
                navigate.push('/dashboard/attorneys')

            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name. It can be your real name or a
                                pseudonym. You can only change this once every 30 days.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    //@ts-ignore
                    name="image"

                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input type="text" />
                            </FormControl>
                            <FormDescription>
                                Upload an image from your computer.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public email address. It can be used to contact you
                                or to send you notifications.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Please enter your address"

                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Your address will be used to display your location
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Please enter your phone number"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Your phone number will be used to contact you
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Please enter your website"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Your website will be used to display your portfolio
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{attorney ? "Update Profile" : "Add Attorney"}</Button>
            </form>
        </Form>
    )
}