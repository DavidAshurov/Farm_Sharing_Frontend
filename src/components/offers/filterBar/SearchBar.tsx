import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    searchRequest:string,
    setSearchRequest: (value: (((prevState: string) => string) | string)) => void,
}
const SearchBar = ({searchRequest,setSearchRequest}:Props) => {
    return (
        <>
            <TextField
                id={'searchRequest'}
                placeholder={"Search products, farmers or locations..."}
                value={searchRequest}
                onChange={(event) => setSearchRequest(event.target.value)}
                slotProps={{
                    input:{
                        startAdornment:<InputAdornment position={"start"}>
                            <SearchIcon/>
                        </InputAdornment>
                    }
                }}
                sx={{
                    width:'25rem',
                    '& .MuiOutlinedInput-root':{
                        borderRadius:'1rem',
                        '&:hover fieldset': {
                            borderColor:'secondary.main'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor:'secondary.main',
                            borderWidth:'2px',
                        }
                    }
                }}
            />
        </>
    );
};

export default SearchBar;