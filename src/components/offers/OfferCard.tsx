// src/components/offers/OfferCard.tsx
import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import GradeIcon from '@mui/icons-material/Grade';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductDetails from '../product/ProductDetails';
import { useCart } from '../../shared/cart/model/CartContext';
import type {Offer} from "../../types/offer.ts";

interface Props {
    offer: Offer
}

const OfferCard = ({ offer }: Props) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const { addToCart } = useCart();

    const handleCardClick = () => {
        setDetailsOpen(true);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(offer, 1);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    return (
        <>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}>
                <Card
                    onClick={handleCardClick}
                    className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                >
                    <div className="relative">
                        <CardMedia
                            image={offer.image}
                            className="h-40 object-cover"
                        />

                        {/* Кнопка избранного */}
                        <button
                            onClick={handleFavoriteClick}
                            className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full shadow-md hover:bg-white"
                        >
                            {isFavorite ? (
                                <FavoriteIcon className="text-red-500" fontSize="small" />
                            ) : (
                                <FavoriteBorderIcon className="text-gray-600" fontSize="small" />
                            )}
                        </button>

                        {/* Бейдж категории */}
                        <div className="absolute top-2 left-2 bg-primary/80 text-white px-2 py-0.5 rounded-full text-xs">
                            {offer.category}
                        </div>
                    </div>

                    <CardContent>
                        <Typography variant={'h6'} textAlign={'start'} fontWeight={'bold'}>
                            {offer.title}
                        </Typography>
                        <Typography variant={'body2'} textAlign={'start'} color={'grey'}>
                            by {offer.farm.name} • {offer.farm.city}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-start', mt: '1rem' }}>
                            <GradeIcon sx={{ color: '#f9ca09', fontSize: 18 }}/>
                            <Typography variant={'body2'} color={'grey'}>{offer.farm.rating}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '1rem' }}>
                            <Typography variant={'h5'} color={'secondary'} fontWeight={'bolder'}>
                                ₪{offer.price}
                            </Typography>
                            <Typography variant={'body2'} color={'grey'}>per {offer.units}</Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={handleAddToCart}
                            className="w-full bg-gradient-to-r from-yellow-400 to-green-500 text-white font-bold py-2 rounded-lg"
                            sx={{
                                borderRadius: '8px',
                                px: '20px',
                                py: '10px',
                                width: '100%',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'secondary.dark'
                                }
                            }}>
                            <ShoppingCartOutlinedIcon fontSize={"small"} className="mr-2" />
                            Add to cart
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

            {/* Модальное окно для детального просмотра */}
            <ProductDetails
                product={offer}
                open={detailsOpen}
                onClose={() => setDetailsOpen(false)}
            />
        </>
    );
};

export default OfferCard;