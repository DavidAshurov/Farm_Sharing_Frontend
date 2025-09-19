import {Button, Menu} from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import {Dispatch, SetStateAction, useRef, useState} from "react";
import PriceSlider from "./PriceSlider.tsx";

interface Props {
    offersRequestParams: OffersRequest,
    setOffersRequestParams: Dispatch<SetStateAction<OffersRequest>>,
    minPrice: number,
    maxPrice: number,
}

const FiltersMenu = ({offersRequestParams, setOffersRequestParams, minPrice, maxPrice}: Props) => {
    const [open, setOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const handleToggle = () => {
        setOpen(prev => !prev)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Button
                onClick={handleToggle}
                ref={buttonRef}
                disableRipple
                endIcon={<TuneIcon/>}
                sx={{color: 'black', fontWeight: 'bold'}}
            >
                Filters
            </Button>
            <Menu
                open={open}
                onClose={handleClose}
                anchorEl={buttonRef.current}
                sx={{
                    "& .MuiMenu-list": {
                        p: 0,
                    },
                }}
            >
                <PriceSlider offersRequestParams={offersRequestParams}
                             setOffersRequestParams={setOffersRequestParams}
                             minPrice={minPrice} maxPrice={maxPrice}/>
            </Menu>
        </>
    );
};

export default FiltersMenu;