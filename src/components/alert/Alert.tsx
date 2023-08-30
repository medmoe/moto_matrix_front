import React from 'react';
import styles from './Alert.module.css';
import {Button} from "../button/Button";

interface AlertProps {
    message: string;
    onClose: () => void;
}

export function Alert({message, onClose}: AlertProps) {
    return (
        <div className={styles.overlay}>
            <div className={styles.alertBox}>
                <p>{message}</p>
                <Button label={"close"}
                        handleClick={onClose}
                        color={"#fff"}
                        backgroundColor={"#ff0000"}
                        border={"none"}
                />
            </div>
        </div>
    )
}