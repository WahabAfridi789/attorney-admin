"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react"

import { useToast } from "../../use-toast"

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

import { toast } from "../../use-toast"
import { useRouter } from "next/navigation"

const authFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

type authFormValues = z.infer<typeof authFormSchema>




export function AuthForm() {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<authFormValues>({
        resolver: zodResolver(authFormSchema),
        mode: "onChange",
    })


    async function onSubmit(data: authFormValues) {

        const response = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
            role: "admin",
        })

        console.log("response", response)


        if (response?.error) {
            toast({
                title: "Error",
                className: "btext-white font-bold ",
                description: `UnAuthorized. Email or password is incorrect.`,
                variant: "destructive",
            });
        }

        if (response?.status == 200) {
            toast({
                title: "Login Success",
                description: "You have successfully logged in.",
                variant: "success",
            });
            router.push("/dashboard");
        }



    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* City Name Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* State Field */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Latitude Field */}

                <Button className="w-full" type="submit">Login</Button>
            </form>
        </Form>
    )
}