import FilterBar from "./filterBar/FilterBar.tsx";
import OffersGrid from "./OffersGrid.tsx";
import {useState} from "react";
import {Box} from "@mui/material";
import Header from "../Header.tsx";

const OffersPage = () => {
    const [offersRequestParams, setOffersRequestParams] = useState<OffersRequest>({
        pageNumber:0,
        search:'',
        category:'All products',
        sortDirection:'asc',
        sortField:'title',
        minPrice:0,
        maxPrice:0,
    })
    return (
        <>
            <Header/>
            <Box width={'100vw'}>
                <FilterBar
                    offersRequestParams={offersRequestParams}
                    setOffersRequestParams={setOffersRequestParams}
                />
                <OffersGrid
                    offersRequestParams={offersRequestParams}
                />
            </Box>
        </>
    );
};

export default OffersPage;