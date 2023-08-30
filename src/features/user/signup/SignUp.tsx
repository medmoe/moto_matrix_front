import React, {FormEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {Alert, Banner, Signup, Spinner} from "../../../components";
import styles from './SignUp.module.css'
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hooks";
import {updateConsumerProfile, updateProviderProfile} from "../activeUserSlice";
import {API} from "../../../constants";
import {Consumer, ProfileType, Provider} from "../../../types/userTypes";

export function SignUp() {
    let initState: Provider | Consumer = {
        "userprofile": {
            "user": {
                "username": "",
                "password": "",
            },
        },
    }
    const [userInfo, setUserInfo] = useState<Provider | Consumer>(initState);
    console.log(userInfo);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${API}/accounts/check-auth`, options)
            .then(() => {
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            })
    }, [])

    const handleChange = (event: FormEvent) => {
        const target = event.target as HTMLInputElement
        console.log(target.name);
        const properties = ['username', 'password', 'password2', 'first_name', 'last_name', 'email'];
        if (properties.includes(target.name)) {
            setUserInfo({
                ...userInfo,
                userprofile: {
                    ...userInfo.userprofile,
                    user: {
                        ...userInfo.userprofile.user,
                        [target.name]: target.value
                    },
                },
            })
            return;
        }
        setUserInfo({
            ...userInfo,
            userprofile: {
                ...userInfo.userprofile,
                [target.name]: target.value
            }
        })
    }
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        /* Validating data before submitting*/
        const password = userInfo.userprofile.user.password as string;
        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long");
            return
        }
        if (userInfo.userprofile.user.username === "") {
            setErrorMessage("Username is required");
            return
        }
        if (userInfo.userprofile.user.password !== userInfo.userprofile.user.password2) {
            setErrorMessage("Password didn't match!");
            return;
        }
        if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userInfo.userprofile.user.email as string))) {
            setErrorMessage("Enter a valid email address")
            return
        }
        if (!userInfo.userprofile.profile_type) {
            setErrorMessage("Please select either Consumer or Seller!")
            return
        }

        delete userInfo.userprofile.user.password2;
        await axios.post(`${API}accounts/signup/`, JSON.stringify(userInfo), options)
            .then((res) => {
                navigate("/dashboard");
                if (userInfo.userprofile.profile_type === ProfileType.Provider) {
                    dispatch(updateProviderProfile(res.data))
                } else {
                    dispatch(updateConsumerProfile(res.data))
                }
            })
            .catch((err) => {
                if (err.response.data && err.response.data.user && err.response.data.user.email) {
                    setErrorMessage(err.response.data.user.email[0])
                    return
                }
                if (err.response.data && err.response.data.user && err.response.data.user.username) {
                    setErrorMessage(err.response.data.user.username[0])
                    return
                }
                console.log(err)
            })
    }
    if (isLoading) {
        return <Spinner height={"120px"} width={"120px"}/>
    }
    return (
        isAuthenticated ? <Navigate to="/dashboard"/> :
            <div className={styles.container}>
                {errorMessage ? <Alert message={errorMessage} onClose={() => setErrorMessage("")}/> : null}
                <div className={styles.bannerContainer}>
                    <Banner/>
                </div>
                <div className={styles.signupContainer}>
                    <Signup handleChange={handleChange} handleSubmit={handleSubmit}/>
                </div>
            </div>
    )
}