// Description: Component to display a single item in the shopping
// cart with options to update quantity or remove it (Элемент в корзине)
import { Box, Typography, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartItemType, useCart } from '../../contexts/CartContext';

interface CartItemProps {
    item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
    const { updateQuantity, removeFromCart } = useCart();
    const { product, quantity } = item;

    return (
        <Box
            sx={{
                display: 'flex',
                mb: 2,
                pb: 2,
                borderBottom: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Box
                sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 2,
                    overflow: 'hidden',
                    mr: 2
                }}
            >
                <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1" fontWeight="medium">
                        {product.title}
                    </Typography>
                    <IconButton
                        size="small"
                        color="inherit"
                        onClick={() => removeFromCart(product.title)}
                    >
                        <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" mb={1}>
                    {product.farm.name}
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography color="secondary" fontWeight="bold">
                        ₪{product.price.toFixed(2)}
                    </Typography>

                    <Box display="flex" alignItems="center">
                        <IconButton
                            size="small"
                            onClick={() => updateQuantity(product.title, Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                            sx={{
                                bgcolor: 'action.hover',
                                width: 24,
                                height: 24,
                                '&:hover': { bgcolor: 'action.selected' }
                            }}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography mx={1.5} fontWeight="medium">
                            {quantity}
                        </Typography>

                        <IconButton
                            size="small"
                            onClick={() => updateQuantity(product.title, quantity + 1)}
                            sx={{
                                bgcolor: 'action.hover',
                                width: 24,
                                height: 24,
                                '&:hover': { bgcolor: 'action.selected' }
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CartItem;