import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

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
                    <IconButton color={"secondary"}>
                        <ShoppingCartOutlinedIcon/>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;