import { createContext, useState, type ReactNode } from 'react';
import type {Offer} from '../../../types/offer';
import {useCart} from "../../../hooks/useCart.ts";

export interface CartItemType {
    product: Offer;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItemType[];
    addToCart: (product: Offer, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    totalItems: 0,
    totalPrice: 0
});



interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);

    // Добавить товар в корзину
    const addToCart = (product: Offer, quantity: number) => {
        setCartItems(prevItems => {
            // Проверяем, есть ли товар уже в корзине
            const existingItem = prevItems.find(item => item.product.title === product.title);

            if (existingItem) {
                // Если товар уже в корзине, увеличиваем количество
                return prevItems.map(item =>
                    item.product.title === product.title
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Если товара нет в корзине, добавляем его
                return [...prevItems, { product, quantity }];
            }
        });
    };

    // Удалить товар из корзины
    const removeFromCart = (productId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.product.title !== productId));
    };

    // Обновить количество товара
    const updateQuantity = (productId: string, quantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product.title === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    // Очистить корзину
    const clearCart = () => {
        setCartItems([]);
    };

    // Вычисляем общее количество товаров и общую стоимость
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};