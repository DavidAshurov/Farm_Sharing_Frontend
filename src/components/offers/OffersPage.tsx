import FilterBar from "./filterBar/FilterBar.tsx";
import OffersGrid from "./OffersGrid.tsx";
import {useState} from "react";

const OffersPage = () => {
    const [searchRequest, setSearchRequest] = useState('')
    const [chosenCategory, setChosenCategory] = useState('All products')
    return (
        <>
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
        </>
    );
};

export default OffersPage;