import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const BackToHomeButton = () => {
    const navigate = useNavigate()
    return (
        <Button
            onClick={() => navigate('/')}
            sx={{
                textTransform: 'none',
                color: "#7b8084",
                ":hover": {
                    color: 'secondary.main'
                },
                mb:'0.5rem',
            }}>
            <ArrowBackIcon/>
            <Typography>Back to Home</Typography>
        </Button>
    );
};

export default BackToHomeButton;