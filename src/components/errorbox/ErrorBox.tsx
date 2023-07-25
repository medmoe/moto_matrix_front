import React from "react";
import styles from './ErrorBox.module.css';
import MaterialIcon from 'material-icons-react';

interface ErrorBoxProps {
    message: string
}

export function ErrorBox({message}: ErrorBoxProps) {
    return (
        <div className={styles.container}>
            <MaterialIcon icon="error" color="#FF0000" size={50} />
            <p className={styles.message}>{message}</p>
        </div>
    )
}