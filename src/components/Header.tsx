// src/components/Header.tsx
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import CartButton from './cart/CartButton'; // Используем новую кнопку корзины

const Header = () => {
    return (
        <AppBar position={"fixed"}
                sx={{
                    backgroundColor: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(6px)",
                    height:'70px',
                }}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography sx={{fontWeight: "bold"}}
                            variant={'h5'}
                            color={'secondary'}>
                    FarmSharing
                </Typography>
                <Box>
                    <IconButton color={"secondary"}>
                        <PersonIcon/>
                    </IconButton>
                    <CartButton /> {/* Используем обновлённую кнопку */}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;