import {Box, Button, Typography} from "@mui/material";
import backgroundImage from '/src/assets/Main page background.jpg'
import {useNavigate} from "react-router-dom";
import Header from "./Header.tsx";

const MainPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <Header/>
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100vh',
                    width: '100vw',
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Dark overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)', // 50% black overlay
                        zIndex: 1,
                    }}
                />
                {/* Foreground content */}
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        pt: 7
                    }}
                >
                    <Typography variant="h1" color="secondary">
                        Fresh from farm
                    </Typography>
                    <Typography variant="h1" color="primary">
                        to your table
                    </Typography>
                    <Typography mt={'30px'} variant={'h5'} color={"primary"}>
                        Connect directly with local farmers. Get freshest products with cheapest price.
                    </Typography>
                    <Box mt={'30px'}>
                        <Button
                            onClick={() => navigate('/offers')}
                            className={'green-button'}
                            sx={{
                                mr: '20px',
                            }}>
                            Buy fresh products
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default MainPage;