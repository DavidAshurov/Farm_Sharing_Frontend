import {Box, Card, CardActions, CardContent, CardMedia, Grid, Skeleton, Typography} from "@mui/material";
import GradeIcon from '@mui/icons-material/Grade';
import {useState} from "react";
import CardExtraInfo from "./CardExtraInfo.tsx";
import AddToCartButton from "../../shared/AddToCartButton.tsx";
import type {Offer} from "../../utils/types/offerTypes.ts";

interface Props {
    offer: Offer
}

const OfferCard = ({offer}: Props) => {
    const [openExtraInfo, setOpenExtraInfo] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <Grid size={{xs: 12, sm: 6, md: 3, lg: 2.4}}>
            <Card
                onClick={() => setOpenExtraInfo(true)}
                sx={{
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 10
                    },
                    transition: '0.3s',
                    cursor: 'pointer'
                }}
            >
                <Box sx={{position: 'relative', height: '170px'}}>
                    <>
                        {!imageLoaded && (
                            <Skeleton
                                height={170}
                                variant={'rectangular'}
                                animation={'wave'}
                            />
                        )}
                    </>
                    <CardMedia
                        component={'img'}
                        image={offer.image || '/src/assets/Product Image Placeholder.png'}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(true)}
                        sx={{
                            height: '170px',
                            opacity: imageLoaded ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                </Box>
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
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '0.5rem'}}>
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