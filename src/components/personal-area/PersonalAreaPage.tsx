import {Box} from "@mui/material";
import PersonalInfo from "./PersonalInfo.tsx";
import Header from "../Header.tsx";

const PersonalAreaPage = () => {
    return (
        <>
            <Header/>
            <Box>
                <PersonalInfo/>
            </Box>
        </>
    );
};

export default PersonalAreaPage;