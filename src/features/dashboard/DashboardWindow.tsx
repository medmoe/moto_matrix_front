import React from "react";
import axios from "axios";
import {API} from '../../types/types';
import styles from './Dashboard.module.css';
import {SideMenu, Dashboard} from "../../components";
import {useNavigate} from "react-router-dom";

export function DashboardWindow() {
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
                if (err.response.status === 401) {
                    navigate("/");
                } else {
                    console.log(err.data.detail)
                }
            })
    }
    const handleDashboard = () => {
        console.log("dashboard");
    }
    const handleInventory = () => {
        console.log("inventory");
    }
    const handleOrders = () => {
        console.log("orders");
    }
    const handleAnalytics = () => {
        console.log("analytics");
    }
    const handleNotifications = () => {
        console.log("notifications");
    }
    return (
        <div className={styles.container}>
            <div className={styles.sideMenu}>
                <SideMenu handleLogout={handleLogout}
                          handleDashboard={handleDashboard}
                          handleAnalytics={handleAnalytics}
                          handleInventory={handleInventory}
                          handleOrders={handleOrders}
                          handleNotifications={handleNotifications}/>
            </div>
            <Dashboard />
        </div>
    );
}