import React, {JSX} from "react";
import axios from "axios";
import styles from './Dashboard.module.css';
import {DASHBOARD_PAGES} from "../../../types/dashboardTypes";
import {API} from "../../../constants";
import {AddProduct, Dashboard, ProductDetails, ProductsList, Profile, SideMenu, UpdateProfile} from "../../../components";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {selectAutoPartDetail, selectPageName, updateActiveIndex, updatePageName} from '../dashboardSlice'
import {selectProviderProfile} from "../../user/activeUserSlice";
import {Provider} from "../../../types/userTypes";

export function DashboardWindow() {
    const navigate = useNavigate();
    const providerProfile = useAppSelector(selectProviderProfile) as Provider;
    const autoPartDetail = useAppSelector(selectAutoPartDetail);
    const pageName = useAppSelector(selectPageName);

    const dispatch = useAppDispatch();
    const {DASHBOARD, ...rest} = DASHBOARD_PAGES
    const pages: { [key: string]: JSX.Element } = {
        "DASHBOARD": <Dashboard/>,
        'INVENTORY': <ProductsList/>,
        'ACCOUNT': <Profile firstName={providerProfile.userprofile.user.first_name}
                            lastName={providerProfile.userprofile.user.last_name}
                            email={providerProfile.userprofile.user.email}
                            username={providerProfile.userprofile.user.username}
                            phone={providerProfile.userprofile.phone}
                            address={providerProfile.userprofile.address}
                            city={providerProfile.userprofile.city}
                            country={providerProfile.userprofile.country}
                            zipCode={providerProfile.userprofile.zip_code}
                            storeDescription={providerProfile.store_description}
                            storeName={providerProfile.store_name}
                            storeLogo={providerProfile.store_logo}
                            cashedAverageRating={providerProfile.cached_average_rating}
                            numberOfSales={providerProfile.number_of_sales}
        />,
        'UPDATE_ACCOUNT': <UpdateProfile/>,
        'ADD_PRODUCT': <AddProduct/>,
        'PRODUCT_DETAILS': <ProductDetails autoPartDetail={autoPartDetail} />
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