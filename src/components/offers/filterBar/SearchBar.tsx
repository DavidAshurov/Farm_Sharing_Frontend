import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import type {Dispatch, SetStateAction} from "react";

interface Props {
    offersRequestParams: OffersRequest,
    setOffersRequestParams: Dispatch<SetStateAction<OffersRequest>>,
}
const SearchBar = ({offersRequestParams,setOffersRequestParams}:Props) => {
    return (
        <>
            <TextField
                id={'searchRequest'}
                placeholder={"Search products, farmers or locations..."}
                value={offersRequestParams.search}
                onChange={(event) => setOffersRequestParams(prev => ({...prev,search:event.target.value}))}
                slotProps={{
                    input:{
                        startAdornment:<InputAdornment position={"start"}>
                            <SearchIcon/>
                        </InputAdornment>
                    }
                }}
                sx={{
                    width:'22rem',
                }}
            />
        </>
    );
};

export default SearchBar;