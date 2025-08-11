import {Alert, Button, FormControlLabel, Radio, RadioGroup, Snackbar} from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import AuthInputLine from "./AuthInputLine.tsx";
import {useState} from "react";
import {useSignInMutation, useSignUpMutation} from "../../app/api/authApi.ts";
import {useDispatch} from "react-redux";
import {setToken, setUser} from "../../app/authSlice.ts";
import {isValidEmail} from "../../utils/functions.ts";

interface Props {
    mode: 'signUp' | 'signIn'
}

const AuthInputs = ({mode}: Props) => {
    const dispatch = useDispatch()
    const [signIn] = useSignInMutation()
    const [signUp] = useSignUpMutation()
    const [form, setForm] = useState({
        role: 'farm',
        nickname: '',
        email: '',
        password: '',
        confirmedPassword: '',
        phoneNumber: '',
    })
    const [completionErrors, setCompletionErrors] = useState({
        nickname: false,
        email: false,
        password: false,
        confirmedPassword: false,
    })
    const [snackBarOpened, setSnackBarOpened] = useState(false)
    const [snackBarMessage, setSnackBarMessage] = useState('')

    const handleSnackBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackBarOpened(false)
    }

    const isSignUp = mode === 'signUp'

    const handleInputChange = (field: keyof typeof form) =>
        (value: string) => setForm(prevState => ({...prevState, [field]: value}))

    const handleClick = async () => {
        const newErrors = {
            nickname: !form.nickname,
            email: !form.email,
            password: !form.password,
            confirmedPassword: !form.confirmedPassword,
        }
        setCompletionErrors(newErrors)
        if (!isSignUp) {
            if (!(newErrors.email || newErrors.password)) {
                try {
                    const authState = await signIn({
                        email: form.email,
                        password: form.password
                    }).unwrap()
                    dispatch(setToken(authState.accessToken))
                    dispatch(setUser(authState.user))
                } catch (error) {
                    if (error.originalStatus === 401) {
                        setSnackBarMessage("Email or password isn't correct")
                        setSnackBarOpened(true)
                    }
                }
            }
        } else {
            if (!(newErrors.nickname || newErrors.email || newErrors.password || newErrors.confirmedPassword)) {
                if (form.password !== form.confirmedPassword) {
                    setSnackBarMessage("Passwords don't match")
                    setSnackBarOpened(true)
                    return
                }
                if (!isValidEmail(form.email)) {
                    setSnackBarMessage("Email is not in correct format")
                    setSnackBarOpened(true)
                    return
                }
                try {
                    await signUp({
                        role: form.role,
                        nickname: form.nickname,
                        email: form.email,
                        password: form.password,
                        phoneNumber: form.phoneNumber || null,
                    }).unwrap()
                } catch (error) {
                    if (error.originalStatus === 400) {
                        setSnackBarMessage(error.data)
                        setSnackBarOpened(true)
                    }
                }
            }
        }
    }

    const inputFields = [
        isSignUp && {
            label: 'Nickname*',
            placeholder: 'Enter your nickname',
            icon: PersonIcon,
            value: form.nickname,
            setValue: handleInputChange('nickname'),
            error: completionErrors.nickname,
            cancelError: () => setCompletionErrors(prev => ({...prev, nickname: false})),
            isPassword: false,
        },
        {
            label: 'Email*',
            placeholder: 'farmer@example.com',
            icon: MailOutlineIcon,
            value: form.email,
            setValue: handleInputChange('email'),
            error: completionErrors.email,
            cancelError: () => setCompletionErrors(prev => ({...prev, email: false})),
            isPassword: false,
        },
        {
            label: 'Password*',
            placeholder: 'Enter your password',
            icon: LockOutlinedIcon,
            value: form.password,
            setValue: handleInputChange('password'),
            error: completionErrors.password,
            cancelError: () => setCompletionErrors(prev => ({...prev, password: false})),
            isPassword: true,
        },
        isSignUp && {
            label: 'Confirm password*',
            placeholder: 'Confirm your password',
            icon: LockOutlinedIcon,
            value: form.confirmedPassword,
            setValue: handleInputChange('confirmedPassword'),
            error: completionErrors.confirmedPassword,
            cancelError: () => setCompletionErrors(prev => ({...prev, confirmedPassword: false})),
            isPassword: true,
        },
        isSignUp && {
            label: 'Phone number',
            placeholder: 'Enter your phone number',
            icon: PhoneIcon,
            value: form.phoneNumber,
            setValue: handleInputChange('phoneNumber'),
            error: false,
            isPassword: false,
        },
    ].filter(Boolean)
    if (!isSignUp) {
        inputFields.forEach(item => item.label = item.label.slice(0, -1))
    }

    return (
        <>
            {isSignUp &&
                <RadioGroup
                    defaultValue={form.role}
                    row
                    onChange={(e) => handleInputChange('role')(e.target.value)}
                    sx={{display: 'flex', justifyContent: 'center', mb: '0.5rem'}}
                >
                    <FormControlLabel
                        value='farm'
                        control={<Radio color={'secondary'}/>}
                        label='I am farmer'
                    />
                    <FormControlLabel
                        value="client"
                        control={<Radio color={'secondary'}/>}
                        label='I am client'
                    />
                </RadioGroup>}

            {inputFields.map((field, idx) => (
                <AuthInputLine
                    key={idx}
                    label={field.label}
                    placeholder={field.placeholder}
                    icon={field.icon}
                    value={field.value}
                    setValue={field.setValue}
                    error={field.error}
                    cancelError={field.cancelError}
                    isPassword={field.isPassword}
                />
            ))}
            <Button
                onClick={handleClick}
                sx={{
                    backgroundColor: 'secondary.main',
                    width: '10rem',
                    '&:hover': {
                        backgroundColor: 'secondary.dark'
                    },
                }}
            >
                {isSignUp ? 'Sign up' : 'Sign in'}
            </Button>
            <Snackbar
                //anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                open={snackBarOpened}
                onClose={handleSnackBarClose}
                autoHideDuration={7000}
            >
                <Alert
                    onClose={handleSnackBarClose}
                    severity={"error"}
                    variant={"filled"}
                >
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AuthInputs;