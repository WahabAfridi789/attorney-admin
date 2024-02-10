import { DataTable } from "@/components/ui/custom/data-table";
import { City } from "@/types/type"; // Assuming the interface is defined in a City.ts file
import { getCities } from "@/lib/service";
import { Button } from "@/components/ui/button";
interface CitiesProps {
    cities: City[];
}
import { columns } from "./columns";

const Cities = async ({ searchParams }: { searchParams: any }) => {

    const page = searchParams?.page || "1";

    const citiesResponse = await getCities(page)
    if (citiesResponse.success === false) {
        return <div>Something went wrong</div>
    }
    const cities = citiesResponse.data;
    const re = cities?.response;

    console.log(cities)


    return (
        <div>
            <DataTable data={re || []} columns={columns} searchTag="city" />
        </div>
    );
};

export default Cities;
