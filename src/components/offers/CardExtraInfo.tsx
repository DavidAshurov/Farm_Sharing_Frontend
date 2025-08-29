import type {Dispatch, SetStateAction} from "react";
import {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import {Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GradeIcon from "@mui/icons-material/Grade";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {useSnackBar} from "../../shared/SnackBar.tsx";
import {useAddItemToCartMutation} from "../../app/api/cartApi.ts";
import QuantitySelector from "../../shared/QuantitySelector.tsx";

interface Props {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    offer: Offer,
}

const CardExtraInfo = ({open, setOpen, offer}: Props) => {
    const [amount, setAmount] = useState(1)
    const {showSnackBar} = useSnackBar()
    const [addItemToCart] = useAddItemToCartMutation()

    const handleButtonClick = async () => {
        try {
            await addItemToCart({offerId:offer.id,quantity:amount}).unwrap()
        } catch (err) {
            if (err.originalStatus === 400) {
                showSnackBar(err.data,'error')
            }
            if (err.originalStatus === 404) {
                showSnackBar('This product is sold out. Refresh the page.','error')
            }
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle fontWeight={"bold"}>
                {offer.title}
                <IconButton
                    onClick={() => setOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 3,
                        top: 3,
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box display={{xs:'block',sm:'flex'}} gap={2}>
                    <Box width={'50%'}>
                        <img alt={'product image'} src={'/src/assets/card image.jpg'}
                             style={{
                                 width: "100%",
                                 borderRadius: '1rem',
                             }}/>
                    </Box>
                    <Box width={'50%'}>
                        <Box pb={'1rem'}>
                            <Box display={"flex"} alignItems={"center"} color={'grey'} gap={1} mb={'1rem'}>
                                <PersonIcon fontSize={"small"}/>
                                <Typography fontWeight={"bold"}>{offer.farm.nickname}</Typography>
                            </Box>
                            <Box display={"flex"} alignItems={"center"} color={'grey'} gap={1} mb={'1rem'}>
                                <LocationOnOutlinedIcon fontSize={"small"}/>
                                <Typography>{offer.farm.city}</Typography>
                            </Box>
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                <GradeIcon fontSize={"small"} sx={{color: '#f9ca09'}}/>
                                <Typography fontWeight={"bold"}>{offer.farm.rating}</Typography>
                            </Box>
                        </Box>
                        <Divider/>
                        <Box py={'1rem'}>
                            <Typography mb={'0.5rem'} fontWeight={"bold"}>Description</Typography>
                            <Typography variant={'body2'} color={'grey'}>{offer.description}</Typography>
                        </Box>
                        <Divider/>
                        <Box>
                            <Box display={"flex"} gap={1} alignItems={"baseline"} py={'1rem'}>
                                <Typography color={"secondary"} variant={'h4'} fontWeight={"bold"}>
                                    ₪{offer.price}
                                </Typography>
                                <Typography color={'grey'}>
                                    per {offer.units}
                                </Typography>
                            </Box>
                            <Box display={"flex"} gap={2} alignItems={"center"}>
                                <Typography fontWeight={"bold"}>Quantity:</Typography>
                                <QuantitySelector amount={amount} setAmount={setAmount} maxValue={offer.amount}/>
                            </Box>
                            <Typography mt={'0.5rem'} ml={'6.5rem'} color={'grey'} fontSize={"small"}>
                                Available: {offer.amount}
                            </Typography>
                            <Typography my={'1rem'} fontWeight={"bold"}>Total: ₪{amount*offer.price}</Typography>
                            <Button
                                onClick={handleButtonClick}
                                className={'green-button'}
                                sx={{
                                    width:'100%',
                                }}>
                                <ShoppingCartOutlinedIcon fontSize={"small"}/>
                                Add {amount} to cart
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CardExtraInfo;