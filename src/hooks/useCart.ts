import {useContext} from "react";
import { CartContext } from '../shared/cart/model/CartContext';

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};

//         setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));