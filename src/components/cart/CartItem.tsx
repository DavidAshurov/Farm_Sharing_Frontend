// Description: Component to display a single item in the shopping
// cart with options to update quantity or remove it (Элемент в корзине)

import { Box, Typography, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../../hooks/useCart';
import type {CartItem as CartItemType} from "../../types/cartItem.ts";

interface CartItemProps {
    item: CartItemType
}

export const CartItem = ({ item }: CartItemProps) => {
    const { product, quantity } = item;
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <Box className="flex py-3 border-b border-gray-100 last:border-none">
            {/* Изображение */}
            <div className="w-16 h-16 rounded-lg overflow-hidden mr-3">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Информация */}
            <Box className="flex-1">
                <div className="flex justify-between">
                    <Typography className="font-medium">{product.title}</Typography>
                    <IconButton
                        size="small"
                        onClick={() => removeFromCart(product.title)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                </div>

                <Typography variant="caption" className="text-gray-500">
                    {product.farm.name}
                </Typography>

                <div className="flex justify-between items-center mt-2">
                    <Typography className="font-bold text-primary">
                        ₪{product.price.toFixed(2)}
                    </Typography>

                    <div className="flex items-center">
                        <button
                            onClick={() => updateQuantity(product.title, quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200
                       text-gray-700 hover:bg-gray-300 transition-colors"
                        >
                            <RemoveIcon fontSize="small" />
                        </button>

                        <span className="mx-2 font-medium">{quantity}</span>

                        <button
                            onClick={() => updateQuantity(product.title, quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200
                       text-gray-700 hover:bg-gray-300 transition-colors"
                        >
                            <AddIcon fontSize="small" />
                        </button>
                    </div>
                </div>
            </Box>
        </Box>
    );
};

// export default CartItem;