import { useState } from 'react';
import ProductImage from './ProductImage';
import FarmerInfo from './FarmerInfo';
import ProductRating from './ProductRating';
import QuantitySelector from './QuantitySelector';
import { Offer } from '../../utils/types';

interface ProductCardProps {
    product: Offer;
    onClose?: () => void;
    isModal?: boolean;
}

const ProductCard = ({ product, onClose, isModal = false }: ProductCardProps) => {
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const totalPrice = product.price * quantity;

    const handleAddToCart = () => {
        // Здесь будет логика добавления в корзину
        console.log(`Added ${quantity} of ${product.title} to cart`);
        if (isModal && onClose) {
            onClose();
        }
    };

    return (
        <div className={`bg-white rounded-2xl shadow-card overflow-hidden 
                    ${isModal ? 'max-w-3xl mx-auto p-4' : 'cursor-pointer'}`}>

            {/* Закрывающая кнопка для модального окна */}
            {isModal && (
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1"
                    >
                        ✕
                    </button>
                </div>
            )}

            <div className={`${isModal ? 'flex flex-col md:flex-row gap-6' : ''}`}>
                {/* Изображение товара */}
                <div className={isModal ? 'md:w-1/2' : ''}>
                    <ProductImage
                        src={product.image}
                        title={product.title}
                        isFavorite={isFavorite}
                        onFavoriteToggle={() => setIsFavorite(!isFavorite)}
                    />
                </div>

                <div className={isModal ? 'md:w-1/2' : 'p-4'}>
                    {/* Заголовок */}
                    <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>

                    {/* Информация о фермере и местоположении */}
                    <FarmerInfo farm={product.farm} />

                    {/* Рейтинг и отзывы */}
                    <ProductRating rating={product.farm.rating} />

                    {/* Описание продукта - только в модальном окне */}
                    {isModal && (
                        <div className="mt-4">
                            <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                            <p className="text-gray-600">{product.description}</p>
                        </div>
                    )}

                    {/* Цена и единицы измерения */}
                    <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-primary">
              ₪{product.price.toFixed(2)}
            </span>
                        <span className="text-gray-500">per {product.units}</span>
                    </div>

                    {/* Селектор количества и общая стоимость - только в модальном окне */}
                    {isModal && (
                        <>
                            <div className="mt-4">
                                <QuantitySelector
                                    quantity={quantity}
                                    onIncrease={() => setQuantity(prev => prev + 1)}
                                    onDecrease={() => setQuantity(prev => Math.max(1, prev - 1))}
                                />
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-medium">Total:</span>
                                    <span className="text-xl font-bold text-primary">₪{totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Кнопки действий */}
                    {isModal ? (
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 py-3 px-4 rounded-xl text-white font-bold
                         bg-gradient-to-r from-secondary to-primary
                         hover:shadow-button transition-all duration-300"
                            >
                                Add to cart
                            </button>
                            <button
                                className="py-3 px-4 rounded-xl border border-primary text-primary font-bold
                         hover:bg-primary/5 transition-all duration-300"
                            >
                                Contact farmer
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="w-full mt-4 py-2 px-4 rounded-xl text-white font-bold
                       bg-primary hover:bg-primary/90 hover:shadow-button
                       transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Add to cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;