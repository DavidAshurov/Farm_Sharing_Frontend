import {AppBar, Box, IconButton, Toolbar, Typography, Badge} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useSelector} from "react-redux";
import {useState} from "react";
import Cart from "./cart/Cart.tsx";
import {useGetCartQuery} from "../app/api/cartApi.ts";
import PersonalAreaMenu from "./personal-area/PersonalAreaMenu.tsx";

const Header = () => {
    const [cartIsOpen, setCartIsOpen] = useState(false)
    const isClient = useSelector(state => state.auth.user?.role) === 'CLIENT'

    const {data = []} = useGetCartQuery()

    return (
        <>
            <AppBar position={"sticky"}
                    sx={{
                        backgroundColor: "rgba(255,255,255,0.8)",
                        backdropFilter: "blur(6px)",
                        height: '70px',
                        width:'100vw'
                    }}>
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography sx={{fontWeight: "bold"}}
                                variant={'h5'}
                                color={'secondary'}>
                        FarmSharing
                    </Typography>
                    <Box>
                        <PersonalAreaMenu/>
                        {isClient &&
                            <IconButton color={"secondary"}
                                        onClick={() => setCartIsOpen(prev => !prev)}>
                                <Badge
                                    color={"secondary"}
                                    badgeContent={data.length}
                                >
                                    <ShoppingCartOutlinedIcon/>
                                </Badge>
                            </IconButton>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <Cart isOpen={cartIsOpen} handleClose={() => setCartIsOpen(false)} cart={data}/>
        </>
    );
};

export default Header;