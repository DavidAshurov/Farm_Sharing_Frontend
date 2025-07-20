import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import GradeIcon from '@mui/icons-material/Grade';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

interface Props {
    offer: Offer
}

const OfferCard = ({offer}: Props) => {
    return (
        <Grid size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4}}>
            <Card
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
                    image={offer.image}
                    sx={{
                        height: '160px'
                    }}
                />
                <CardContent>
                    <Typography variant={'h6'} textAlign={'start'} fontWeight={'bold'}>
                        {offer.title}
                    </Typography>
                    <Typography variant={'body2'} textAlign={'start'} color={'grey'}>
                        by {offer.farm.name} • {offer.farm.city}
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
                    <Button
                        sx={{
                            backgroundColor: `#4b9b4b`,
                            borderRadius:'8px',
                            px:'20px',
                            py:'10px',
                            width:'100%',
                            fontWeight:'bold',
                            '&:hover': {
                                backgroundColor:'secondary.dark'
                            }
                        }}>
                        <ShoppingCartOutlinedIcon fontSize={"small"}/>Add to cart
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default OfferCard;