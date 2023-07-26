import React from "react";
import logo from "../../assets/Parts Plaza-logos_transparent.png"
import styles from './Logo.module.css'
export function Logo () {
    return (
        <div className={styles.container}>
            <img src={logo} alt="logo" />
        </div>
    )
}