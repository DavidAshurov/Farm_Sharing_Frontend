import FilterBar from "./filterBar/FilterBar.tsx";
import OffersGrid from "./OffersGrid.tsx";
import {useState} from "react";
import {Box} from "@mui/material";

const OffersPage = () => {
    const [searchRequest, setSearchRequest] = useState('')
    const [chosenCategory, setChosenCategory] = useState('All products')
    return (
        <Box width={'100vw'}>
            <FilterBar
                searchRequest={searchRequest}
                setSearchRequest={setSearchRequest}
                chosenCategory={chosenCategory}
                setChosenCategory={setChosenCategory}
            />
            <OffersGrid
                searchRequest={searchRequest}
                chosenCategory={chosenCategory}
            />
        </Box>
    );
};

export default OffersPage;