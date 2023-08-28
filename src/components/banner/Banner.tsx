import React from "react";
import styles from './Banner.module.css';
import logo from '../../assets/Parts Plaza-logos_transparent.png'

export function Banner() {
    return (
        <div className={styles.container}>
            <div className={styles.banner}></div>
            <img src={logo} alt="logo" className={styles.logo} data-cy={"PartsPlazaBanner"}/>
        </div>
    )
}