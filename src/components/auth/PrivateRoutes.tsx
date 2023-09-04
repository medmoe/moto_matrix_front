import {Outlet, Navigate} from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";
import {Spinner} from "../../components";
import {API, SPINNER_SIZE} from "../../constants";
import styles from './PrivateRoutes.module.css';

export function PrivateRoutes ()  {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    if (isLoading) {
        // you could return a loading spinner here
        return <div className={styles.spinner}><Spinner width={SPINNER_SIZE.width} height={SPINNER_SIZE.height}/></div>;
    }
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/" />
    )
}