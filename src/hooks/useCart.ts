// Хук useCart (занимается только логикой корзины)
// src/hooks/useCart.ts
import { useState } from 'react';
import { type Product } from '../types/product.ts';
import type {CartItem} from "../types/cartItem.ts";


export const useCart = () => {
    // Состояние корзины
    const [items, setItems] = useState<CartItem[]>([]);

    // Добавление товара в корзину
    const addToCart = (product: Product, quantity: number = 1) => {
        setItems(prev => {
            // Ищем товар в корзине
            const existingItem = prev.find(item => item.product.title === product.title);

            if (existingItem) {
                // Если есть - увеличиваем количество
                return prev.map(item =>
                    item.product.title === product.title
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Если нет - добавляем новый
                return [...prev, { product, quantity }];
            }
        });
    };

    // Удаление товара из корзины
    const removeFromCart = (productTitle: string) => {
        setItems(prev => prev.filter(item => item.product.title !== productTitle));
    };

    // Изменение количества товара
    const updateQuantity = (productTitle: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productTitle);
            return;
        }

        setItems(prev =>
            prev.map(item =>
                item.product.title === productTitle
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    // Очистка корзины
    const clearCart = () => {
        setItems([]);
    };

    // Общее количество товаров
    const totalItems = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // Общая стоимость
    const totalPrice = items.reduce(
        (sum, item) => sum + (item.product.price * item.quantity),
        0
    );

    return {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
    };
};