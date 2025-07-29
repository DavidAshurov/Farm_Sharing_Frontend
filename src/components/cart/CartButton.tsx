// Description: A button that opens a cart drawer when clicked,
// displaying the number of items in the cart (Кнопка корзины для хедера)

import { useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { IconButton, Badge } from '@mui/material';
import CartDrawer from './CartDrawer';

interface CartButtonProps {
    itemCount: number;
}

const CartButton = ({ itemCount }: CartButtonProps) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    return (
        <>
            <IconButton
                color="secondary"
                onClick={openCart}
                className="relative"
            >
                <Badge badgeContent={itemCount} color="secondary">
                    <ShoppingCartOutlinedIcon />
                </Badge>
            </IconButton>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={closeCart}
            />
        </>
    );
};

export default CartButton;