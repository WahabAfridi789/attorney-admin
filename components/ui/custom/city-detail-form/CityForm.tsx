"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

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

const cityFormSchema = z.object({
    city: z
        .string()
        .min(2, {
            message: "City name must be at least 2 characters.",
        })
        .max(30, {
            message: "City name must not be longer than 30 characters.",
        }),
    state_name: z.string().min(2).max(50), // Assuming state code is 2 characters long
    lat: z.number(), // Assuming latitude is a number
    lng: z.number(), // Assuming longitude is a number
    population: z.number(), // Assuming population is a number
    density: z.number(), // Assuming density is a number
    timezone: z.string(), // Assuming timezone is a string
})

type cityFormValues = z.infer<typeof cityFormSchema>




export function ProfileForm({ city }: { city: object }) {
    const form = useForm<cityFormValues>({
        resolver: zodResolver(cityFormSchema),
        defaultValues: city,
        mode: "onChange",
    })

    const { fields, append } = useFieldArray({

        //@ts-ignore
        name: "urls",
        control: form.control,
    })

    function onSubmit(data: cityFormValues) {
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* City Name Field */}
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Article Title</FormLabel>
                            <FormControl>
                                <Input placeholder="City Name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name of your city
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* State Field */}
                <FormField
                    control={form.control}
                    name="state_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Latitude Field */}
                <FormField
                    control={form.control}
                    name="lat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                                <Input placeholder="Latitude" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Longitude Field */}
                <FormField
                    control={form.control}
                    name="lng"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                                <Input placeholder="Longitude" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Population Field */}
                <FormField
                    control={form.control}
                    name="population"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Population</FormLabel>
                            <FormControl>
                                <Input placeholder="Population" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Density Field */}
                <FormField
                    control={form.control}
                    name="density"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Density</FormLabel>
                            <FormControl>
                                <Input placeholder="Density" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Timezone Field */}
                <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Timezone</FormLabel>
                            <FormControl>
                                <Input placeholder="Timezone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    )
}