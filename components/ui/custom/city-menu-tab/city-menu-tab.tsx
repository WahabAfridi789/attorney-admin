
import { ProfileForm } from "@/components/ui/custom/city-detail-form/CityForm";
import { ArticleForm } from "../article-form/ArticleForm";
import { AddArticleModal } from "./add-article";
import { FaqForm } from "../faq-form/FaqForm";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { Separator } from "../../separator";
import { AttorneyForm } from "../attorney-form/AttorneyForm";
import { ReviewForm } from "../reviews-form/ReviewForm";

export function CityMenuTabs({ city, id }: { id: string, city: any }) {
    return (
        <div className="flex flex-col justify-center items-center space-y-4">
            <Card className="w-full lg:min-w-[900px]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">
                        {city?.city}
                    </CardTitle>

                </CardHeader>
                <CardContent className="flex flex-row justify-between items-center">
                    <div>
                        <label htmlFor="pop" className="text-xs text-muted-foreground">
                            Population:
                        </label>
                        <div id="pop" className="text-xl font-medium">{city?.population}</div>

                    </div>


                    <div>
                        <label htmlFor="state" className="text-xs text-muted-foreground">
                            State:
                        </label>
                        <div id="state" className="text-xl font-medium">{city?.state_name}</div>

                    </div>
                    <div>
                        <label htmlFor="ranking" className="text-xs text-muted-foreground">
                            Ranking:
                        </label>
                        <div id="ranking" className="text-xl font-medium">{city?.ranking}</div>

                    </div>


                </CardContent>
            </Card>
            <Tabs defaultValue="profile" className=" w-full min-w-[400px] max-w-[1000px]">
                <TabsList className="grid w-full grid-cols-5 mb-4">
                    <TabsTrigger value="profile">Details</TabsTrigger>
                    <TabsTrigger value="article">Add Article</TabsTrigger>
                    <TabsTrigger value="attorneys">Add Atorney</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="faqs">FAQs</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <ProfileForm city={city} />
                </TabsContent>
                <TabsContent value="article">
                    <ArticleForm article={city} id={city?.id} />
                    {/* <QuillForm /> */}
                </TabsContent>

                <TabsContent value="attorneys">
                    <AttorneyForm attorney={city} id={city?.id} />
                </TabsContent>
                <TabsContent value="reviews">
                    <ReviewForm review={city} id={city?.id} />
                </TabsContent>
                <TabsContent value="faqs">
                    <FaqForm />
                </TabsContent>
            </Tabs>
        </div>

    )
}
