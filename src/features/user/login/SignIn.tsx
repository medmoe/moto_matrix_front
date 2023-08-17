import React, {FormEvent, useEffect, useState} from "react";
import {Alert, Banner, Login, Spinner} from "../../../components";
import styles from './SignIn.module.css';
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hooks";
import {updateUserData} from "../userSlice";
import {updatePageName} from "../../dashboard/dashboardSlice";
import {DASHBOARD_PAGES} from "../../../types/dashboardTypes";
import {API} from "../../../constants";
import {User} from "../../../types/userTypes";

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
        axios.get(`${API}accounts/check-auth/`, options)
            .then(() => {
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch(() => {
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
                dispatch(updateUserData(res.data));
                dispatch(updatePageName(DASHBOARD_PAGES.DASHBOARD));
            })
            .catch((err) => {
                err.response ? setErrorMessage(err.response.data.detail) : setErrorMessage(err.message);
            })
    }
    if (isLoading) {
        return (
            <Spinner height={"120px"} width={"120px"}/>
        )
    }
    return (
        isAuthenticated ? <Navigate to="/dashboard"/> :
            <div className={styles.container}>
                {errorMessage ? <Alert message={errorMessage} onClose={() => setErrorMessage("")}/> : null}
                <Banner/>
                <Login handleChange={handleChange} handleSubmit={handleSubmit}/>
            </div>
    )
}