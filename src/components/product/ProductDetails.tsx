// Description: A detailed view of a product with options to add to a cart and contact the farm.

import { useState } from 'react';
import { Dialog, DialogContent, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { type Offer } from '../../types/offer';
import { useCart } from '../../shared/cart/model/CartContext';


interface ProductDetailsProps {
    product: Offer | null;
    open: boolean;
    onClose: () => void;
}

const ProductDetails = ({ product, open, onClose }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                className: "rounded-2xl overflow-hidden"
            }}
        >
            <DialogContent className="p-0">
                <div className="relative">
                    {/* Кнопка закрытия */}
                    <button
                        className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </button>

                    <div className="md:flex">
                        {/* Левая часть - изображение */}
                        <div className="md:w-1/2">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-64 md:h-full object-cover"
                            />
                        </div>

                        {/* Правая часть - информация */}
                        <div className="p-6 md:w-1/2">
                            <Typography variant="h5" className="font-bold mb-1">
                                {product.title}
                            </Typography>

                            {/* Информация о ферме и местоположении */}
                            <div className="flex items-center text-gray-600 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <Typography variant="body2" className="font-medium">
                                    {product.farm.name}
                                </Typography>
                                <span className="mx-1">•</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <Typography variant="body2">
                                    {product.farm.city}
                                </Typography>
                            </div>

                            {/* Рейтинг */}
                            <div className="flex items-center mt-2">
                                <div className="flex items-center">
                                    <span className="text-yellow-400 mr-1">★</span>
                                    <Typography variant="body2" className="font-medium text-gray-700">
                                        {product.farm.rating}
                                    </Typography>
                                    <Typography variant="body2" className="ml-2 text-gray-500">
                                        (24 reviews)
                                    </Typography>
                                </div>
                            </div>

                            {/* Описание */}
                            <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                                <Typography variant="subtitle2" className="font-semibold mb-1">
                                    Description
                                </Typography>
                                <Typography variant="body2" className="text-gray-600">
                                    {product.description}
                                </Typography>
                            </div>

                            {/* Цена */}
                            <div className="flex justify-between items-center mt-4">
                                <Typography variant="h6" className="font-bold text-primary">
                                    ₪{product.price}
                                </Typography>
                                <Typography variant="body2" className="text-gray-500">
                                    per {product.units}
                                </Typography>
                            </div>

                            {/* Селектор количества */}
                            <div className="mt-4">
                                <Typography variant="subtitle2" className="font-medium mb-2">
                                    Quantity
                                </Typography>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-8 flex items-center justify-center rounded-full
                             bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </button>
                                    <span className="mx-4 font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full
                             bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    >
                                        <AddIcon fontSize="small" />
                                    </button>
                                </div>
                            </div>

                            {/* Общая стоимость */}
                            <div className="flex justify-between items-center mt-4">
                                <Typography variant="subtitle1" className="font-medium">
                                    Total:
                                </Typography>
                                <Typography variant="h6" className="font-bold text-primary">
                                    ₪{(product.price * quantity).toFixed(2)}
                                </Typography>
                            </div>

                            {/* Кнопки действий */}
                            <div className="flex gap-3 mt-6">
                                <Button
                                    onClick={handleAddToCart}
                                    className="flex-1 py-2.5 bg-gradient-to-r from-yellow-400 to-green-500
                          text-white font-bold rounded-xl hover:shadow-lg transition-all"
                                    variant="contained"
                                >
                                    Add to cart
                                </Button>
                                <Button
                                    className="py-2.5 px-4 border border-primary text-primary font-bold
                          rounded-xl hover:bg-green-50 transition-all"
                                    variant="outlined"
                                >
                                    Contact farm
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetails;