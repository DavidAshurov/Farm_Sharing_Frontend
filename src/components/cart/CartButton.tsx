// Description: A button that opens a cart drawer when clicked,
// displaying the number of items in the cart (Кнопка корзины для хедера)

import { useState } from 'react';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CartDrawer from './CartDrawer';
import { useCart } from '../../shared/cart/model/CartContext';

const CartButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { totalItems } = useCart();

    return (
        <>
            <IconButton
                color="secondary"
                onClick={() => setIsOpen(true)}
                className="relative"
            >
                <Badge
                    badgeContent={totalItems}
                    color="secondary"
                    className={totalItems > 0 ? "animate-pulse" : ""}
                >
                    <ShoppingCartOutlinedIcon />
                </Badge>
            </IconButton>

            <CartDrawer
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};

export default CartButton;