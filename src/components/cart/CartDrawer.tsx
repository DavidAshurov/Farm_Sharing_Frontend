// Description: A drawer component for displaying the shopping cart,
// including items, total price, and actions(Выдвижная панель корзины)
import { Drawer, Box, Typography, Button, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CartItem from './CartItem';
import { useCart } from '../../hooks/useCart';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { cartItems, totalPrice, clearCart } = useCart();

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={onClose}
        >
            <Box sx={{ width: 350, p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                        Your Cart
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {cartItems.length === 0 ? (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="200px"
                    >
                        <img
                            src="/src/assets/empty-cart.svg"
                            alt="Empty cart"
                            style={{ width: '80px', marginBottom: '16px', opacity: 0.5 }}
                        />
                        <Typography color="text.secondary">
                            Your cart is empty
                        </Typography>
                        <Button
                            variant="text"
                            color="secondary"
                            sx={{ mt: 2 }}
                            onClick={onClose}
                        >
                            Continue Shopping
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Box sx={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto', mb: 2 }}>
                            {cartItems.map((item) => (
                                <CartItem key={item.product.title} item={item} />
                            ))}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box>
                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Typography>Subtotal:</Typography>
                                <Typography fontWeight="bold">₪{totalPrice.toFixed(2)}</Typography>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography>Delivery:</Typography>
                                <Typography fontWeight="bold">Free</Typography>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mb={3}>
                                <Typography variant="h6">Total:</Typography>
                                <Typography variant="h6" fontWeight="bold" color="secondary">
                                    ₪{totalPrice.toFixed(2)}
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    background: 'linear-gradient(to right, #f9ca09, #4b9b4b)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    mb: 2
                                }}
                            >
                                Checkout
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                color="inherit"
                                sx={{
                                    borderRadius: 2,
                                    color: 'text.secondary',
                                    borderColor: 'divider'
                                }}
                                onClick={clearCart}
                            >
                                Clear Cart
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default CartDrawer;