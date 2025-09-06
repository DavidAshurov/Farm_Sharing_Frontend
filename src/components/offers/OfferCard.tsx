import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import GradeIcon from '@mui/icons-material/Grade';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {useState} from "react";
import CardExtraInfo from "./CardExtraInfo.tsx";
import {useAddItemToCartMutation} from "../../app/api/cartApi.ts";
import {useSnackBar} from "../../shared/SnackBar.tsx";
import AddToCartButton from "../../shared/AddToCartButton.tsx";

interface Props {
    offer: Offer
}

const OfferCard = ({offer}: Props) => {
    const [openExtraInfo,setOpenExtraInfo] = useState(false)
    const handleCardClick = () => setOpenExtraInfo(true)

    return (
        <Grid size={{xs: 12, sm: 6, md: 3, lg: 2.4, xl: 2}}>
            <Card
                onClick={handleCardClick}
                sx={{
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow:10
                    },
                    transition:'0.3s',
                    cursor:'pointer'
                }}
            >
                <CardMedia
                    image={'/src/assets/card image.jpg'}
                    sx={{
                        height: '160px'
                    }}
                />
                <CardContent>
                    <Typography variant={'h6'} textAlign={'start'} fontWeight={'bold'}>
                        {offer.title}
                    </Typography>
                    <Typography variant={'body2'} textAlign={'start'} color={'grey'}>
                        by {offer.farm.nickname} • {offer.farm.city}
                    </Typography>
                    <Box sx={{display: 'flex', gap: 0.5, justifyContent: 'flex-start', mt: '1rem'}}>
                        <GradeIcon sx={{color: '#f9ca09', fontSize: 18}}/>
                        <Typography variant={'body2'} color={'grey'}>{offer.farm.rating}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '1rem'}}>
                        <Typography variant={'h5'} color={'secondary'} fontWeight={'bolder'}>
                            ₪{offer.price}
                        </Typography>
                        <Typography variant={'body2'} color={'grey'}>per {offer.units}</Typography>
                    </Box>
                </CardContent>
                <CardActions>
                    <AddToCartButton offerId={offer.id} quantity={1}/>
                </CardActions>
            </Card>
            <CardExtraInfo open={openExtraInfo} setOpen={setOpenExtraInfo} offer={offer}/>
        </Grid>
    );
};

export default OfferCard;