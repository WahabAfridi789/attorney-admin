import { DataTable } from "@/components/ui/custom/data-table";
import { City } from "@/types/type"; // Assuming the interface is defined in a City.ts file
import { getAllArticles, getAllAttorneys, getCities } from "@/lib/service";
import { Button } from "@/components/ui/button";

import { columns } from "./columns";

const ArticlePage = async () => {
    const attorneys = await getAllAttorneys()
    console.log("attorneys", attorneys)
    const re = attorneys?.data;

    return (
        <div>
            <h3 className="text-2xl text-medium pt-4">Attorneys</h3>
            <DataTable data={re || []} columns={columns} searchTag="title" />
        </div>
    );
};

export default ArticlePage;
