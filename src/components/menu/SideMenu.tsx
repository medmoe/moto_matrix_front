import React, {useState} from "react";
import {Logo} from "../logo/Logo";
import {MenuItem} from "../menuItem/MenuItem";
import styles from './SideMenu.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {
    selectActiveIndex,
    updateActiveIndex,
    updatePageName
} from "../../features/dashboard/dashboardSlice";
import {selectUserData} from "../../features/user/userSlice";
import {ProfileImage} from "../profileImage/ProfileImage";

interface SideMenuProps {
    handleDashboard: () => void;
    handleOrders: () => void;
    handleInventory: () => void;
    handleAnalytics: () => void;
    handleLogout: () => void;
    handleNotifications: () => void;
}

export function SideMenu({
                             handleDashboard,
                             handleOrders,
                             handleInventory,
                             handleAnalytics,
                             handleLogout,
                             handleNotifications
                         }: SideMenuProps) {
    const menuItems: [string, string, () => void][] = [
        ["dashboard", "Dashboard", handleDashboard],
        ["list_alt", "Orders", handleOrders],
        ["inventory_2", "Inventory", handleInventory],
        ["analytics", "Analytics", handleAnalytics],
        ["notifications", "Notifications", handleNotifications],
        ["logout", "Logout", handleLogout],
    ]
    const [isAccountActive, setAccountActive] = useState(false);
    const dispatch = useAppDispatch();
    const activeIndex = useAppSelector(selectActiveIndex);
    const userData = useAppSelector(selectUserData);

    const handleItemClick = (index: number) => {
        dispatch(updateActiveIndex(index));
        setAccountActive(false);
    }
    const handleAccountClick = () => {
        dispatch(updateActiveIndex(6)) // 6 because the length of the menuItems is 5 and the account is the 6th.
        dispatch(updatePageName("account"))
        setAccountActive(true);
    }
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Logo/>
            </div>
            <div className={styles.items}>
                {menuItems.map(([icon, title, action], index) => {
                    return <MenuItem
                        key={index}
                        icon={icon}
                        title={title}
                        backgroundColor={index === activeIndex ? "#877B04" : "#706500"}
                        handleClick={() => {
                            handleItemClick(index);
                            dispatch(updatePageName(title.toLowerCase()));
                            action();
                        }}
                    />
                })}
            </div>
            <div className={styles.account}
                 onClick={handleAccountClick}
                 style={{backgroundColor: isAccountActive ? "#877b04" : "#706500"}}
            >
                <div>
                    <ProfileImage src={userData.profile_pic ? userData.profile_pic : "#"} alt="Profile picture"
                                  width="50px" height="50px"/>
                </div>
                <div style={{color: "#fff"}}>
                    <p>Account</p>
                </div>

            </div>

        </div>
    )
}