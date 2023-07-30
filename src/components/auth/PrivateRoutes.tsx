import {Outlet, Navigate} from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";
import {API} from "../../types/types";
export function PrivateRoutes ()  {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        axios.get(`${API}/accounts/check-auth`)
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
        return null;
    }
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/" />
    )
}