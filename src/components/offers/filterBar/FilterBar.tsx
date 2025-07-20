import {Box} from "@mui/material";
import SearchBar from "./SearchBar.tsx";
import Categories from "./Categories.tsx";

interface Props {
    searchRequest:string,
    setSearchRequest: (value: (((prevState: string) => string) | string)) => void,
    chosenCategory:string,
    setChosenCategory: (value: (((prevState: string) => string) | string)) => void,
}

const FilterBar = ({searchRequest,setSearchRequest,chosenCategory,setChosenCategory}:Props) => {
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
            <SearchBar searchRequest={searchRequest} setSearchRequest={setSearchRequest}/>
            <Categories chosenCategory={chosenCategory} setChosenCategory={setChosenCategory}/>
        </Box>
    );
};

export default FilterBar;