import React from "react";
import MaterialIcon from 'material-icons-react';
import styles from './MenuItem.module.css';

interface MenuItemProps {
    icon: string,
    title: string,
    backgroundColor: string,
    handleClick: () => void,
}

export function MenuItem({icon, title, handleClick, backgroundColor}: MenuItemProps) {
    return (
        <div className={styles.container} style={{backgroundColor: backgroundColor}} onClick={handleClick}>
            <div className={styles.icon}>
                <MaterialIcon icon={icon} size={30} color="#FFF"/>
            </div>
            <div className={styles.title}>
                <p>{title}</p>
            </div>
        </div>
    )
}