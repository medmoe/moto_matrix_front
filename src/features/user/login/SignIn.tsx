import React, {FormEvent, useEffect, useState} from "react";
import {Banner, ErrorBox, Login, Spinner} from "../../../components";
import styles from './SignIn.module.css';
import axios from "axios";
import {API, User} from "../../../types/types";
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hooks";
import {updateUserData} from "../userSlice";

export function SignIn() {
    let initState: User = {
        "username": "",
        "password": "",
    }
    const [loginInfo, setLoginInfo] = useState(initState);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    }
    useEffect(() => {
        axios.get(`${API}/accounts/check-auth`, options)
            .then((res) => {
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            })
    }, [])

    const handleChange = (event: FormEvent) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement
        setLoginInfo({
            ...loginInfo,
            [target.name]: target.value
        })
    }
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }
        await axios.post(`${API}accounts/login/`, JSON.stringify(loginInfo), options)
            .then((res) => {
                navigate("/dashboard");
                console.log(res.data)
                dispatch(updateUserData(res.data.user));
            })
            .catch((err) => {
                setErrorMessage(err.response.data['detail']);
            })
    }
    if (isLoading) {
        return (
            <Spinner/>
        )
    }
    return (
        isAuthenticated ? <Navigate to="/dashboard"/> :
            <div className={styles.container}>
                {errorMessage ? <ErrorBox message={errorMessage}/> : null}
                <Banner/>
                <Login handleChange={handleChange} handleSubmit={handleSubmit}/>
            </div>
    )
}