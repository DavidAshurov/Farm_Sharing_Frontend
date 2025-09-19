import {Box} from "@mui/material";
import SearchBar from "./SearchBar.tsx";
import Categories from "./Categories.tsx";
import type {Dispatch, SetStateAction} from "react";
import {useEffect, useState} from "react";
import SortingMenu from "./SortingMenu.tsx";
import FiltersMenu from "./FiltersMenu.tsx";
import {useGetMinMaxPriceQuery} from "../../../app/api/offerApi.ts";

interface Props {
    offersRequestParams: OffersRequest,
    setOffersRequestParams: Dispatch<SetStateAction<OffersRequest>>,
}

const FilterBar = ({offersRequestParams, setOffersRequestParams}: Props) => {
    const [minMaxPrice, setMinMaxPrice] = useState<{ min: number, max: number }>({min:0,max:0})
    const {data} = useGetMinMaxPriceQuery()

    useEffect(() => {
        if (data) {
            setMinMaxPrice(data)
        }
    }, [data]);

    return (
        <Box
            p={'1.5rem 1rem'}
            boxSizing={'border-box'}
            display={"flex"}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            flexDirection={"row"}
            borderBottom={'1px solid grey'}
        >
            <SearchBar offersRequestParams={offersRequestParams}
                       setOffersRequestParams={setOffersRequestParams}/>
            <Categories offersRequestParams={offersRequestParams}
                        setOffersRequestParams={setOffersRequestParams}/>
            <FiltersMenu offersRequestParams={offersRequestParams}
                         setOffersRequestParams={setOffersRequestParams}
                         minPrice={minMaxPrice.min} maxPrice={minMaxPrice.max}/>
            <SortingMenu setOffersRequestParams={setOffersRequestParams}/>
        </Box>
    );
};

export default FilterBar;