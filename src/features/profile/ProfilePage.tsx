import React from "react";
import {SideMenu, Divider, Rating, Profile, Button} from "../../components";
import styles from "./ProfilePage.module.css";

export function ProfilePage() {
    const handleDashboard = () => {
        console.log("dashboard");
    }
    const handleOrders = () => {
        console.log("orders");
    }
    const handleInventory = () => {
        console.log("inventory");
    }
    const handleAnalytics = () => {
        console.log("analytics");
    }
    const handleNotifications = () => {
        console.log("notifications");
    }
    const handleLogout = () => {
        console.log("logout");
    }
    return (
        <div className={styles.container}>
            <div>
                <SideMenu handleDashboard={handleDashboard}
                          handleOrders={handleOrders}
                          handleInventory={handleInventory}
                          handleAnalytics={handleAnalytics}
                          handleLogout={handleLogout}
                          handleNotifications={handleNotifications}/>
            </div>
            <div className={styles.contentWindow}>
                <div className={styles.upperBar}>

                </div>
                <div className={styles.profileContainer}>
                    <div className={styles.upperCard}>
                        <div className={styles.row}>
                            <Profile src="https://picsum.photos/200" alt="photo"/>
                            <p>Bekhouche Mohammed</p>
                        </div>
                        <div className={styles.row}>
                            <p>4.5</p>
                            <Rating rate={4.5}/>
                        </div>
                    </div>
                    <Divider width="943px"/>
                    <div className={styles.lowerCard}>

                    </div>
                </div>

            </div>
        </div>
    )
}