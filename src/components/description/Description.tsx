import React from "react";

import styles from './Description.module.css';
interface DescriptionProps {
    title?: string,
    description?: string,
}
export function Description({title, description}: DescriptionProps) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <p>{title}</p>
            </div>
            <div className={styles.description}>
                <p>{description}</p>
            </div>
        </div>
    )
}