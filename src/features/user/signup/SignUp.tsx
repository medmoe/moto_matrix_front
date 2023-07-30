import React, {FormEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {Banner, Signup, ErrorBox, Spinner} from "../../../components";
import styles from './SignUp.module.css'
import {API, UserProfile} from "../../../types/types";
import {useNavigate, Navigate} from "react-router-dom";

export function SignUp() {
    let initState: UserProfile = {
        "user": {
            "username": "",
            "password": "",
        },
    }
    const [userInfo, setUserInfo] = useState(initState);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        const properties = ['username', 'password', 'password2', 'first_name', 'last_name', 'email'];
        if (properties.includes(target.name)) {
            setUserInfo({
                ...userInfo,
                user: {
                    ...userInfo.user,
                    [target.name]: target.value
                }
            })
            return;
        }
        setUserInfo({
            ...userInfo,
            [target.name]: target.name === "is_provider" ? target.value === "YES" : target.value
        })
    }
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        /* Validating data before submitting*/
        if (userInfo.user.password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long");
            return
        }
        if (userInfo.user.username === "") {
            setErrorMessage("Username is required");
            return
        }
        if (userInfo.user.password !== userInfo.user.password2) {
            setErrorMessage("Password didn't match!");
            return;
        }
        if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userInfo.user.email as string))) {
            setErrorMessage("Enter a valid email address")
            return
        }

        /* Sending the form */
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        delete userInfo.user.password2;
        await axios.post(`${API}accounts/signup/`, JSON.stringify(userInfo), options)
            .then((res) => {
                navigate("/dashboard");
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err.response.data[0]);
            })
    }
    if (isLoading) {
        return <Spinner />
    }
    return (
        isAuthenticated? <Navigate to="/dashboard" />:
        <div className={styles.container}>
            {errorMessage ? <ErrorBox message={errorMessage}/> : null}
            <Banner/>
            <Signup handleChange={handleChange} handleSubmit={handleSubmit}/>
        </div>
    )
}