import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { AuthForm } from "@/components/ui/custom/auth-form/AuthForm"

import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options.js"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default async function AuthenticationPage() {
    // @ts-ignore: Unreachable code error
    const session = await getServerSession(options)

    console.log("Sign", session)
    if (session) {
        redirect('/dashboard')
    }
    return (
        <div className="flex justify-center items-center w-full h-[100vh]">

            <div className="flex justify-center items-center w-full h-full">


                <div className="flex lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Welcome back
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your credentials to access your account
                            </p>
                        </div>
                        <AuthForm />

                    </div>
                </div>
            </div>
        </div>
    )
}