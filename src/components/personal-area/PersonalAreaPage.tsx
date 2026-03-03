import {Box} from "@mui/material";
import PersonalInfo from "./general/PersonalInfo.tsx";
import Header from "../Header.tsx";
import {useSelector} from "react-redux";
import ErrorPage from "../../shared/ErrorPage.tsx";
import OffersList from "./farm/OffersList.tsx";

const PersonalAreaPage = () => {
    const user = useSelector(state => state.auth.user)
    return (
        <>
            {user !== null ?
                <>
                    <Header/>
                    <Box>
                        <PersonalInfo/>
                        <>
                            {user.role === 'FARM' && <OffersList/>}
                        </>
                    </Box>
                </>
                :
                <ErrorPage message={"You don't have access to this page."}/>
            }
        </>
    )
};

export default PersonalAreaPage;