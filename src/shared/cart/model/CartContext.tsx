// Контекст корзины  (обеспечивает доступ к корзине по всему приложению)
// src/shared/cart/model/CartContext.tsx
import { createContext, useContext } from 'react';
import {type  CartItem } from '../../../types/cartItem';
import {type  Product } from '../../../types/product.ts';

// Интерфейс контекста корзины
interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productTitle: string) => void;
    updateQuantity: (productTitle: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

// Создаём контекст
export const CartContext = createContext<CartContextType | null>(null);

// Хук для использования контекста
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};