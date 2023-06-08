import react, { useState } from 'react';
import axios from "axios";
import { API } from '../../types/types';
import {useNavigate} from "react-router-dom";

export function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }
        await axios.post(`${API}accounts/logout/`, {}, options)
            .then((res) => {
                navigate("/");
                console.log("success");
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}