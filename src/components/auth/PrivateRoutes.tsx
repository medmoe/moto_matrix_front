import {Outlet, Navigate} from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";
import {Spinner} from "../../components";
import {API} from "../../constants";

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
        return <Spinner width={"120px"} height={"120px"}/>;
    }
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/" />
    )
}