import type {Dispatch, SetStateAction} from "react";
import {
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography,
    Zoom
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CartItem from "./CartItem.tsx";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useClearCartMutation} from "../../app/api/cartApi.ts";

interface Props {
    isOpen: boolean,
    handleClose: Dispatch<SetStateAction<boolean>>,
    cart: CartItem[],
}

const Cart = ({isOpen, handleClose, cart}: Props) => {
    const [clearCart] = useClearCartMutation()
    const total = cart.reduce((acc, item) => acc + item.quantity * item.offer.price, 0)

    const handleClearCart = async () => {
        try {
            await clearCart().unwrap()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Drawer
            anchor={"right"}
            open={isOpen}
            onClose={handleClose}
            transitionDuration={450}
        >
            <List sx={{width: '400px'}}>
                <ListItem sx={{borderBottom: '2px solid', borderColor: 'secondary.main'}}>
                    <ListItemIcon>
                        <ShoppingCartOutlinedIcon color={"secondary"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography color={"secondary"} variant={'h6'} fontWeight={"bold"}>Shopping cart</Typography>
                    </ListItemText>
                    <Tooltip title={'Clear cart'}
                             placement={'left'}
                             arrow
                             disableInteractive
                             slots={{
                                 transition: Zoom,
                             }}
                    >
                        <IconButton onClick={handleClearCart}
                                    sx={{color: 'red'}}
                                    disabled={cart.length === 0}>
                            <DeleteOutlineIcon/>
                        </IconButton>
                    </Tooltip>
                    <IconButton onClick={handleClose} color={"secondary"}>
                        <CloseIcon/>
                    </IconButton>
                </ListItem>
                <>
                    {cart.length !== 0 ?
                        <>
                            {cart.map(item => <CartItem key={item.id} item={item}/>)}
                            <ListItem>
                                <Box display={"flex"} justifyContent={"space-between"} width={'100%'}>
                                    <Typography fontWeight={"bold"}>Total</Typography>
                                    <Typography fontWeight={"bold"}>₪{total}</Typography>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Button
                                    sx={{m: 'auto'}}
                                    className={'green-button'}
                                >
                                    Proceed to checkout
                                </Button>
                            </ListItem>
                        </>
                        :
                        <Typography
                        variant={"h5"}
                        color={"secondary"}
                        textAlign={"center"}
                        mt={'3rem'}
                        >
                            Your cart is empty
                        </Typography>
                    }
                </>
            </List>
        </Drawer>
    );
};

export default Cart;