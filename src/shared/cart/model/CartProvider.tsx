// Description: This file defines the CartProvider component, which
// uses the CartContext to provide cart state and methods to its children components
// этот файл определяет компонент CartProvider,
// который использует CartContext для предоставления состояния корзины и методов дочерним компонентам

import type {ReactNode} from 'react';
import { useCart as useCartHook } from '../../../hooks/useCart';
import { CartContext } from './CartContext';

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    // Используем хук для создания состояния и методов
    const cartState = useCartHook();

    return (
        <CartContext.Provider value={cartState}>
            {children}
        </CartContext.Provider>
    );
};