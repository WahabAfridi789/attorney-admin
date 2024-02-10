import { Separator } from "@/components/ui/separator";

import { getArticleById, getAttorneyById, getCityById } from "@/lib/service";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { City } from "@/types/type";
import { ArticleForm } from "@/components/ui/custom/article-form/ArticleForm";
import { AttorneyForm } from "@/components/ui/custom/attorney-form/AttorneyForm";
async function page({ params }: { params: City }) {
    const { id } = params;
    const result = await getAttorneyById(id);
    if (result.success === false) {
        return <div>Something went wrong</div>
    }
    const attorney = result?.data;
    return (
        <section className="flex flex-col justify-center items-center flex-1 my-8 space-y-8
        ">
            <div className="flex justify-center items-center relative w-full" >
                <Link href="/dashboard/attorneys" className="flex items-center space-x-2 absolute left-0">

                    <ArrowLeft size={20} />
                    <span>Back to attorneys</span>

                </Link>




            </div>
            <Separator />
            <AttorneyForm attorney={attorney || {}} id={id} />
        </section>
    )
}

export default page