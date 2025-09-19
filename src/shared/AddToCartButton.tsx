import {useState} from "react";
import {useSnackBar} from "./SnackBar.tsx";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {Button} from "@mui/material";
import {useAddItemToCartMutation} from "../app/api/cartApi.ts";

interface Props {
    offerId:number,
    quantity:number,
}
const AddToCartButton = ({offerId, quantity}:Props) => {
    const [isAdding,setIsAdding] = useState(false)
    const {showSnackBar} = useSnackBar()
    const [addItemToCart] = useAddItemToCartMutation()

    const handleButtonClick = async (event) => {
        event.stopPropagation()
        if (isAdding) {
            showSnackBar('You may add several units of product through product window. Click on card to open it.')
            return
        }
        try {
            setIsAdding(true)
            await addItemToCart({offerId,quantity}).unwrap()
        } catch (err) {
            if (err.originalStatus === 400) {
                showSnackBar(err.data,'error')
            }
            if (err.originalStatus === 404) {
                showSnackBar('This product is sold out. Refresh the page.','error')
            }
        }
        setIsAdding(false)
    }
    return (
        <Button
            onClick={handleButtonClick}
            className={'green-button'}
            sx={{
                width:'100%',
            }}>
            <ShoppingCartOutlinedIcon fontSize={"small"}/>
            Add {quantity} to cart
        </Button>
    );
};

export default AddToCartButton;