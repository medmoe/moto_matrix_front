import React from 'react';
import styles from "./Card.module.css";
import {Description} from "../description/Description";

interface CardProps {
    amount?: string,
    description?: string,
    backgroundColor?: string,
}

export function Card({amount, description, backgroundColor}: CardProps) {
    return (
        <div className={styles.container} style={{backgroundColor: backgroundColor}}>
            <div className={styles.description}>
                <Description title={amount} description={description} />
            </div>
        </div>
    )
}