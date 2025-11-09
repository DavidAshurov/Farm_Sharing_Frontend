import {Button, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import AuthInputLine from "./AuthInputLine.tsx";
import {useState} from "react";
import {useSignInMutation, useSignUpMutation} from "../../app/api/authApi.ts";
import {useDispatch} from "react-redux";
import {setToken, setUser} from "../../app/authSlice.ts";
import {isEmailValid} from "../../utils/functions.ts";
import {useSnackBar} from "../../shared/SnackBar.tsx";
import {useNavigate} from "react-router-dom";

interface Props {
    mode: 'signUp' | 'signIn'
}

const AuthInputs = ({mode}: Props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    const {showSnackBar} = useSnackBar()

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
                    navigate('/offers')
                } catch (error) {
                    if (error.originalStatus === 401) {
                        showSnackBar("Email or password isn't correct",'error')
                    }
                }
            }
        } else {
            if (!(newErrors.nickname || newErrors.email || newErrors.password || newErrors.confirmedPassword)) {
                if (form.password !== form.confirmedPassword) {
                    showSnackBar("Passwords don't match",'error')
                    return
                }
                if (!isEmailValid(form.email)) {
                    showSnackBar("Email is not in correct format",'error')
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
                    navigate('/offers')
                } catch (error) {
                    if (error.originalStatus === 400) {
                        showSnackBar(error.data,'error')
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
        </>
    );
};

export default AuthInputs;