import {Outlet, Navigate} from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";
import {API} from "../../types/types";
import {Spinner} from "../../components";

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
        axios.get(`${API}/accounts/check-auth`, options)
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
        return <Spinner />;
    }
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/" />
    )
}