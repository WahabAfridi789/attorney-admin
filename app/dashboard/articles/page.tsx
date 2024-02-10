import { DataTable } from "@/components/ui/custom/data-table";
import { City } from "@/types/type"; // Assuming the interface is defined in a City.ts file
import { getAllArticles, getCities } from "@/lib/service";
import { Button } from "@/components/ui/button";
interface CitiesProps {
    cities: City[];
}
import { columns } from "./columns";

const ArticlePage = async () => {
    const articles = await getAllArticles()

    if (articles.success === false) {
        return <div>Something went wrong</div>
    }
    console.log("articles", articles)
    const ar = articles.data;


    return (
        <div>
            <h3 className="text-2xl text-medium pt-4">Articles</h3>
            <DataTable data={ar || []} columns={columns} searchTag="name" />
        </div>
    );
};

export default ArticlePage;
