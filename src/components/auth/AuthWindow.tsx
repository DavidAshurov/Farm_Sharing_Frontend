import {Paper} from "@mui/material";
import Tab from '@mui/material/Tab';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {useState} from "react";
import AuthInputs from "./AuthInputs.tsx";

const AuthWindow = () => {
    const [tabValue, setTabValue] = useState('signIn')

    const handleChange = (event, newValue) => {
        setTabValue(newValue)
    }

    return (
        <Paper elevation={5} sx={{width: '45%', m: '1rem auto', borderRadius: '1rem'}}>
            <TabContext value={tabValue}>
                <TabList onChange={handleChange} variant={'fullWidth'}
                         sx={{
                             borderRadius: '1rem 1rem 0 0',
                             '& .MuiTabs-indicator': {
                                 display: 'none',
                             },
                         }}>
                    <Tab label={'Sign in'} value={'signIn'}/>
                    <Tab label={'Sign up'} value={'signUp'}/>
                </TabList>
                <TabPanel value={'signIn'}><AuthInputs mode={tabValue}/></TabPanel>
                <TabPanel value={'signUp'}><AuthInputs mode={tabValue}/></TabPanel>
            </TabContext>
        </Paper>
    );
};

export default AuthWindow;