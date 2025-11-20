import {AppBar, Badge, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useSelector} from "react-redux";
import {useState} from "react";
import Cart from "./cart/Cart.tsx";
import {useGetCartQuery} from "../app/api/cartApi.ts";
import PersonalAreaMenu from "./personal-area/PersonalAreaMenu.tsx";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    const [cartIsOpen, setCartIsOpen] = useState(false)
    const user = useSelector(state => state.auth.user)

    const {data = []} = useGetCartQuery()

    return (
        <>
            <AppBar position={"sticky"}
                    sx={{
                        backgroundColor: "rgba(255,255,255,0.8)",
                        backdropFilter: "blur(6px)",
                        height: '70px',
                        width: '100vw'
                    }}>
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography sx={{fontWeight: "bold", cursor: 'pointer'}}
                                variant={'h5'}
                                color={'secondary'}
                                onClick={() => navigate('/')}>
                        FarmSharing
                    </Typography>
                    <>
                        {user !== null ?
                            <Box>
                                <PersonalAreaMenu/>
                                <>
                                    {user?.role === 'CLIENT' &&
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
                                </>
                            </Box>
                            :
                            <Button className={'green-button'}
                                    onClick={() => navigate('/auth')}>
                                Sign in
                            </Button>
                        }
                    </>
                </Toolbar>
            </AppBar>
            <Cart isOpen={cartIsOpen} handleClose={() => setCartIsOpen(false)} cart={data}/>
        </>
    );
};

export default Header;