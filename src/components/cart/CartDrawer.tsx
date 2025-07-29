// Description: A drawer component for displaying the shopping cart,
// including items, total price, and actions(Выдвижная панель корзины)

import { Drawer, Box, Typography, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '../../shared/cart/model/CartContext';
// Импортируем компонент CartItem для отображения товаров в корзине
import { CartItem } from '../cart/CartItem';

// Типы для пропсов, т.е. для параметров, которые принимает компонент CartDrawer
interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
    const { items, totalPrice, clearCart } = useCart();

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                className: "w-[320px] sm:w-[380px]"
            }}
        >
            <Box className="p-4 h-full flex flex-col">
                {/* Заголовок */}
                <Box className="flex justify-between items-center mb-4">
                    <Typography variant="h6" className="font-bold">
                        Your Cart
                    </Typography>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-500 hover:text-gray-700"
                    >
                        <CloseIcon />
                    </button>
                </Box>

                <Divider className="mb-4" />

                {/* Содержимое корзины */}
                {items.length === 0 ? (
                    <Box className="flex flex-col items-center justify-center flex-grow py-10">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <ShoppingCartOutlinedIcon fontSize="large" className="text-gray-400" />
                        </div>
                        <Typography className="text-gray-500 mb-2">
                            Your cart is empty
                        </Typography>
                        <Button
                            onClick={onClose}
                            className="text-primary"
                        >
                            Continue shopping
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Box className="flex-grow overflow-auto mb-4">
                            {items.map((item) => (
                                <CartItem key={item.product.title} item={item} />
                            ))}
                        </Box>

                        <Box>
                            <div className="flex justify-between mb-2">
                                <Typography>Subtotal:</Typography>
                                <Typography className="font-bold">
                                    ₪{totalPrice.toFixed(2)}
                                </Typography>
                            </div>

                            <div className="flex justify-between mb-3">
                                <Typography>Delivery:</Typography>
                                <Typography className="font-bold text-green-600">
                                    Free
                                </Typography>
                            </div>

                            <Divider className="mb-3" />

                            <div className="flex justify-between mb-4">
                                <Typography variant="h6">Total:</Typography>
                                <Typography variant="h6" className="font-bold text-primary">
                                    ₪{totalPrice.toFixed(2)}
                                </Typography>
                            </div>

                            <Button
                                variant="contained"
                                className="w-full mb-2 py-3 bg-gradient-to-r from-yellow-400 to-green-600
                         text-white font-bold rounded-xl shadow-md"
                            >
                                Checkout
                            </Button>

                            <Button
                                variant="text"
                                onClick={clearCart}
                                className="w-full text-gray-500"
                            >
                                Clear cart
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default CartDrawer;