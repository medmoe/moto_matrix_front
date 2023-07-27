import React from 'react';
import styles from "./Card.module.css";

interface CardProps {
    amount?: string,
    description?: string,
    backgroundColor?: string,
}

export function Card({amount, description, backgroundColor}: CardProps) {
    return (
        <div className={styles.container} style={{backgroundColor: backgroundColor}}>
            <div className={styles.amount}>
                <p>{amount}</p>
            </div>
            <div className={styles.description}>
                {description}
            </div>
        </div>
    )
}