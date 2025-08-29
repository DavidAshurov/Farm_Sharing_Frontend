import {Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import QuantitySelector from "../../shared/QuantitySelector.tsx";
import {useEffect, useRef, useState} from "react";
import {useChangeItemQuantityMutation, useRemoveItemFromCartMutation} from "../../app/api/cartApi.ts";
import {useDebounce} from "../../utils/functions.ts";

interface Props {
    item: CartItem,
}

const CartItem = ({item}: Props) => {
    const [quantity, setQuantity] = useState(item.quantity)
    const debouncedQuantity = useDebounce(quantity,500)

    const [removeItem] = useRemoveItemFromCartMutation()
    const [changeQuantity] = useChangeItemQuantityMutation()

    const handleDeleteClick = async () => {
        try {
            await removeItem(item.id).unwrap()
        } catch (err) {
            console.log(err)
        }
    }

    const hasUserChangedQuantity = useRef(false)
    const handleQuantityChange = (newQty:number) => {
        if (!hasUserChangedQuantity.current) hasUserChangedQuantity.current = true
        setQuantity(newQty)
    }
    useEffect(() => {
        if (!hasUserChangedQuantity.current) return
        try {
            (async (id,quantity) => {
                await changeQuantity({id,quantity}).unwrap()
            })(item.id,debouncedQuantity)
        } catch (err) {
            console.log(err)
        }
    }, [debouncedQuantity]);

    return (
        <>
            <ListItem
                secondaryAction={
                    <IconButton edge={"end"} sx={{color: 'red'}}
                                onClick={handleDeleteClick}>
                        <HighlightOffIcon/>
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar src={'/src/assets/card image.jpg'} alt={item.offer.title} sx={{width:'50px',height:'50px',mr:'1rem'}}/>
                </ListItemAvatar>
                <ListItemText
                    primary={item.offer.title}
                    secondary={'₪' + item.offer.price}
                />
                <QuantitySelector amount={quantity} setAmount={handleQuantityChange} maxValue={item.offer.amount}/>
            </ListItem>
            <Divider/>
        </>
    );
};

export default CartItem;