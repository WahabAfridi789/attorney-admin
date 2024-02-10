'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../../button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../form";
import { Input } from "../../input";
import { Textarea } from "../../textarea";
import { toast } from "../../use-toast";
import { createReview } from "@/lib/service";
import action from "@/app/actions";

const reviewFormSchema = z.object({
    rating: z.string().min(1, "Rating must be at least 1").max(5, "Rating must not exceed 5"),
    review: z.string().min(10, "Review must be at least 10 characters"),
    name: z.string().min(2, "Name must be at least 2 characters").max(30, "Name must not exceed 30 characters"),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const defaultValues: Partial<ReviewFormValues> = {
    rating: "0",
    review: "",
    name: "",
};

export function ReviewForm({ review, id }: { review: object, id: string }) {
    const navigate = useRouter();
    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: defaultValues,
        mode: "onChange",
    });

    async function onSubmit(data: ReviewFormValues) {
        const result = await createReview(data, id);
        //@ts-ignore
        if (result.status === "success") {
            toast({
                title: "Review Added",
                //@ts-ignore
                description: result.message,
                variant: "success",
            });

            navigate.push("/dashboard");
        }
        else {
            toast({
                title: "Review Failed",
                //@ts-ignore
                description: result.message,
                variant: "destructive",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter rating (1-5)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="review"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Review</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter your review" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{"Add Review"}</Button>
            </form>
        </Form>
    );
}
