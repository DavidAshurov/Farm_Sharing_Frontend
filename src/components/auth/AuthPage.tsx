import {Container, Typography} from "@mui/material";
import BackToHomeButton from "./BackToHomeButton.tsx";
import AuthWindow from "./AuthWindow.tsx";

const AuthPage = () => {
    return (
        <Container sx={{pt: '1rem'}}>
            <BackToHomeButton/>
            <Typography variant={'h4'} color={'secondary'} fontWeight={'bold'} mb={'0.25rem'}>
                Farm Marketplace
            </Typography>
            <Typography color={"#7b8084"} mb={'1.5rem'}>
                Join our community of farmers and fresh food lovers
            </Typography>
            <AuthWindow/>
        </Container>
    );
};

export default AuthPage;