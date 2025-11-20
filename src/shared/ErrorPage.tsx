import {Typography} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

interface Props {
    message:string,
}
const ErrorPage = ({message}:Props) => {
    return (
        <>
            <Typography
                variant={'h3'}
                mt={'8rem'}
                color={"secondary"}
            >
                {message}
            </Typography>
            <SentimentVeryDissatisfiedIcon color={"secondary"} fontSize={"large"}/>
        </>
    );
};

export default ErrorPage;