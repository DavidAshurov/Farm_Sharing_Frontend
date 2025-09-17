import {Box} from "@mui/material";
import SearchBar from "./SearchBar.tsx";
import Categories from "./Categories.tsx";
import type {Dispatch, SetStateAction} from "react";
import SortingMenu from "./SortingMenu.tsx";

interface Props {
    offersRequestParams:OffersRequest,
    setOffersRequestParams: Dispatch<SetStateAction<OffersRequest>>,
}

const FilterBar = ({offersRequestParams,setOffersRequestParams}:Props) => {
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
            <SortingMenu setOffersRequestParams={setOffersRequestParams}/>
        </Box>
    );
};

export default FilterBar;