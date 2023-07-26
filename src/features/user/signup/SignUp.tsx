import React, {FormEvent, useState} from 'react';
import axios from 'axios';
import {Banner} from "../../../components/banner/Banner";
import {Signup} from "../../../components/signup/Signup";
import styles from './SignUp.module.css'
import {ErrorBox} from "../../../components/errorbox/ErrorBox";
import {API, UserProfile} from "../../../types/types";
import {useNavigate} from "react-router-dom";

export function SignUp() {
    let initState: UserProfile = {
        "user": {
            "username": "",
            "password": "",
        },
    }
    const [userInfo, setUserInfo] = useState(initState);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
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
        if (userInfo.user.password !== userInfo.user.password2) {
            setErrorMessage("Password didn't match!");

            return;
        }
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }
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
    return (
        <div className={styles.container}>
            {errorMessage ? <ErrorBox message={errorMessage}/> : null}
            <Banner/>
            <Signup handleChange={handleChange} handleSubmit={handleSubmit}/>
        </div>
    )
}