import React, {JSX} from "react";
import axios from "axios";
import {API} from '../../types/types';
import styles from './Dashboard.module.css';
import {Dashboard, Profile, SideMenu, UpdateProfile} from "../../components";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {selectActiveIndex} from "./dashboardSlice";
import {selectUserData} from "../user/userSlice";
import {useAppDispatch} from "../../hooks";
import {updateActiveIndex} from "./dashboardSlice";

export function DashboardWindow() {
    const navigate = useNavigate();
    const activeIndex = useAppSelector(selectActiveIndex);
    const user = useAppSelector(selectUserData);
    const dispatch = useAppDispatch();
    // the pages list should be always sorted as the items appear in the sidebar menu.
    const pages: JSX.Element[] = [<Dashboard/>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>,
        <Profile firstName={user.first_name}
                 lastName={user.last_name}
                 rating={user.rating}
                 phone={user.phone}
                 address={user.address}
                 city={user.city}
                 country={user.country}
                 email={user.email}
                 bio={user.description}
                 img="https://picsum.photos/200"/>,
    <UpdateProfile />
    ];
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
                dispatch(updateActiveIndex(0));
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
            <div className={styles.dashboard}>
                {pages[activeIndex]}
            </div>
        </div>
    );
}