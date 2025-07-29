//Компонент ProductCard (только отображает данные)

import { useState } from 'react';
import { Card, CardContent, Typography, Button } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { type Offer } from '../../types/offer';
import { useCart } from '../../shared/cart/model/CartContext';

// 🔍 Здесь мы определяем, какие параметры может принимать наш компонент
interface ProductCardProps {
    product: Offer;
    expanded?: boolean;
    onProductClick?: () => void;
    isModal?: boolean; // Пропс для определения, показывается ли в модальном окне
    onClose?: () => void; // Функция для закрытия модального окна
}

const ProductCard = ({ product, expanded = false, onProductClick, isModal, onClose }: ProductCardProps) => {
    // 📌 Локальные состояния компонента
    const [isFavorite, setIsFavorite] = useState(false);
    const { addToCart } = useCart();

    // 👆 Обработчик клика по иконке избранного
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Предотвращаем клик по карточке
        setIsFavorite(!isFavorite);
    };

    // 🛒 Обработчик добавления в корзину
    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation(); // Предотвращаем клик по карточке
        addToCart(product, 1);
    };

    return (
        <Card
            onClick={onProductClick}
            className={`
                w-full overflow-hidden transition-all duration-300
                ${!expanded && 'hover:shadow-xl hover:scale-105 cursor-pointer'}
            `}
        >
            {/* 🔄 Кнопка закрытия - показываем только если это модальное окно */}
            {isModal && (
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Предотвращаем клик по карточке
                        onClose && onClose(); // Вызываем функцию закрытия
                    }}
                    className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            )}

            {/* 🖼️ Изображение с кнопкой избранного */}
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.title}
                    className={`w-full object-cover ${expanded ? 'h-64' : 'h-44'}`}
                />

                {/* ❤️ Кнопка избранного */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md
                   hover:bg-white transition-all duration-300"
                >
                    {isFavorite ? (
                        <FavoriteIcon className="text-red-500" fontSize="small" />
                    ) : (
                        <FavoriteBorderIcon className="text-gray-600" fontSize="small" />
                    )}
                </button>

                {/* 🏷️ Бейдж категории */}
                <div className="absolute top-2 left-2 bg-primary/90 text-white px-2 py-1
                      rounded-full text-xs font-medium backdrop-blur-sm">
                    {product.category}
                </div>
            </div>

            <CardContent className="p-4">
                {/* 📋 Заголовок и информация о ферме */}
                <Typography variant="h6" className="font-bold text-left">
                    {product.title}
                </Typography>

                <div className="flex items-center text-gray-500 mt-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>{product.farm.name}</span>
                    <span className="mx-1">•</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{product.farm.city}</span>
                </div>

                {/* ⭐ Рейтинг */}
                <div className="flex items-center mt-2">
                    <span className="text-yellow-400 mr-1">★</span>
                    <Typography variant="body2" className="text-gray-600">
                        {product.farm.rating}
                    </Typography>
                </div>

                {/* 📄 Описание - показываем только если карточка расширенная */}
                {expanded && (
                    <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                        <Typography variant="subtitle2" className="font-semibold mb-1">
                            Description
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                            {product.description}
                        </Typography>
                    </div>
                )}

                {/* 💰 Цена */}
                <div className="flex justify-between items-center mt-3">
                    <Typography variant="h5" className="font-bold text-primary">
                        ₪{product.price}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                        per {product.units}
                    </Typography>
                </div>

                {/* 🛒 Кнопка добавления в корзину */}
                <Button
                    onClick={handleAddToCart}
                    className="w-full mt-3 bg-gradient-to-r from-yellow-400 to-green-500
                  text-white font-bold py-2 rounded-xl hover:shadow-lg transition-all"
                    startIcon={<ShoppingCartOutlinedIcon />}
                >
                    Add to cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;