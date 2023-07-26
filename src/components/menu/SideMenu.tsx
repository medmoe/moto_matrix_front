import React, {useState} from "react";
import {Logo} from "../logo/Logo";
import {MenuItem} from "../menuItem/MenuItem";
import styles from './SideMenu.module.css';

export function SideMenu() {
    const menuItems: [string, string][] = [
        ["dashboard", "Dashboard"],
        ["list_alt", "Orders"],
        ["inventory_2", "Inventory"],
        ["analytics", "Analytics"],
        ["logout", "Logout"],
    ]
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isAccountActive, setAccountActive] = useState(false);
    const handleItemClick = (index: number) => {
        setActiveIndex(index);
        setAccountActive(false);
    }
    const handleAccountClick = () => {
        setActiveIndex(null); //rest the active menu item whenever the account is active
        setAccountActive(true);
    }
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Logo/>
            </div>
            <div className={styles.items}>
                {menuItems.map(([icon, title], index) => {
                    return <MenuItem
                        icon={icon}
                        title={title}
                        backgroundColor={index === activeIndex ? "#877B04" : "#706500"}
                        handleClick={() => handleItemClick(index)}
                    />
                })}
            </div>
            <div className={styles.account}
                 onClick={handleAccountClick}
                 style={{backgroundColor: isAccountActive ? "#877b04" : "#706500"}}
            >
                <div className={styles.profile_picture}>
                    <p>MB</p>
                </div>
                <div className={styles.profile_name}>
                    <p>Account</p>
                </div>

            </div>

        </div>
    )
}