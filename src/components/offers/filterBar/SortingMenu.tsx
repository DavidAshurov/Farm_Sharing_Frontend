import {Button, Menu, MenuItem} from "@mui/material";
import {Dispatch, SetStateAction, useRef, useState} from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const sortOptions = [
    {value: 'title_asc', label: 'Title: A-Z'},
    {value: 'title_desc', label: 'Title: Z-A'},
    {value: 'price_asc', label: 'Price: Low to High'},
    {value: 'price_desc', label: 'Price: High to Low'},
]

interface Props {
    offersRequestParams: OffersRequest,
    setOffersRequestParams: Dispatch<SetStateAction<OffersRequest>>,
}

const SortingMenu = ({offersRequestParams, setOffersRequestParams}: Props) => {
    const [open, setOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const handleToggle = () => {
        setOpen(prev => !prev)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleSelect = (value: string) => {
        const sortField = value.split('_')[0] as 'price' | 'title'
        const sortDir = value.split('_')[1] as 'asc' | 'desc'
        setOffersRequestParams(prev => ({...prev, sortField: sortField, sortDirection: sortDir}))
    }

    return (
        <>
            <Button
                disableRipple
                onClick={handleToggle}
                ref={buttonRef}
                endIcon={<KeyboardArrowDownIcon/>}
                sx={{
                    color: 'black',
                    fontWeight: 'bold',
                }}
            >
                Sort by
            </Button>
            <Menu
                open={open}
                anchorEl={buttonRef.current}
                onClose={handleClose}
                sx={{
                    "& .MuiMenu-list": {
                        p: 0,
                    },
                }}
            >
                <>
                    {sortOptions.map(opt =>
                        <MenuItem key={opt.value}
                                  onClick={() => handleSelect(opt.value)}
                        >
                            <>
                                {opt.label}
                                {opt.value === `${offersRequestParams.sortField}_${offersRequestParams.sortDirection}`
                                    && <CheckCircleIcon color={"secondary"} sx={{ml:'0.5rem'}}/>}
                            </>
                        </MenuItem>)}
                </>
            </Menu>
        </>
    );
};

export default SortingMenu;