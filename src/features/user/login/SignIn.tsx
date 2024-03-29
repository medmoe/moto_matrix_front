import React, {FormEvent, useEffect, useState} from "react";
import {Alert, Banner, Login, Spinner} from "../../../components";
import styles from './SignIn.module.css';
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hooks";
import {updatePageName} from "../../dashboard/dashboardSlice";
import {DASHBOARD_PAGES} from "../../../types/dashboardTypes";
import {API, SPINNER_SIZE} from "../../../constants";
import {ProfileType, User} from "../../../types/userTypes";
import {updateConsumerProfile, updateProviderProfile} from "../activeUserSlice";

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
        setIsLoading(true);
        await axios.post(`${API}accounts/login/`, JSON.stringify(loginInfo), options)
            .then((res) => {
                setIsLoading(false);
                navigate("/dashboard");
                if (res.data.userprofile.profile_type === ProfileType.Provider) {
                    dispatch(updateProviderProfile(res.data))
                } else if (res.data.userprofile.profile_type == ProfileType.Consumer) {
                    dispatch(updateConsumerProfile(res.data))
                } else {
                    // Add other profiles if needed
                }
                dispatch(updatePageName(DASHBOARD_PAGES.DASHBOARD));
            })
            .catch((err) => {
                setIsLoading(false);
                err.response ? setErrorMessage(err.response.data.detail) : setErrorMessage(err.message);
            })
    }
    if (isLoading) {
        return (
            <div className={styles.spinner}>
                <Spinner height={SPINNER_SIZE.height} width={SPINNER_SIZE.width}/>
            </div>
        )
    }
    return (
        isAuthenticated ? <Navigate to="/dashboard"/> :
            <div className={styles.container}>
                {errorMessage ? <Alert message={errorMessage} onClose={() => setErrorMessage("")}/> : null}
                <div className={styles.bannerContainer}>
                    <Banner/>
                </div>
                <div className={styles.loginContainer}>
                    <Login handleChange={handleChange} handleSubmit={handleSubmit}/>
                </div>
            </div>
    )
}