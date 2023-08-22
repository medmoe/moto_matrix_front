import React, {JSX} from "react";
import axios from "axios";
import styles from './Dashboard.module.css';
import {DASHBOARD_PAGES} from "../../../types/dashboardTypes";
import {API} from "../../../constants";
import {AddProduct, Dashboard, ProductsList, Profile, SideMenu, UpdateProfile} from "../../../components";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {selectPageName, updateActiveIndex, updatePageName} from '../dashboardSlice'
import {selectUserData} from "../../user/userSlice";

export function DashboardWindow() {
    const navigate = useNavigate();
    const userData = useAppSelector(selectUserData);
    const pageName = useAppSelector(selectPageName);
    const dispatch = useAppDispatch();
    const {DASHBOARD, ...restOfPages} = DASHBOARD_PAGES
    const pages: { [key: string]: JSX.Element } = {
        'DASHBOARD': <Dashboard/>,
        'INVENTORY': <ProductsList/>,
        'ACCOUNT': <Profile firstName={userData.user.first_name}
                            lastName={userData.user.last_name}
                            rating={userData.rating}
                            phone={userData.phone}
                            address={userData.address}
                            city={userData.city}
                            country={userData.country}
                            email={userData.user.email}
                            bio={userData.description}
        />,
        'UPDATE_ACCOUNT': <UpdateProfile/>,
        'ADD_PRODUCT': <AddProduct/>
    }
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
                dispatch(updatePageName(DASHBOARD));
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
        // console.log("dashboard");
    }
    const handleInventory = () => {
        // console.log("inventory");
    }

    const handleOrders = () => {
        // console.log("orders");
    }
    const handleAnalytics = () => {
        // console.log("analytics");
    }
    const handleNotifications = () => {
        // console.log("notifications");
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
                {pages[pageName]}
            </div>
        </div>
    );
}