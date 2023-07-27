import React from 'react';
import styles from "./GraphDescriptors.module.css";

interface GraphDescriptorsProps {
    color?: string,
    description?: string,
}
export function GraphDescriptors({color, description}: GraphDescriptorsProps) {
    return (
        <div className={styles.container}>
            <div className={styles.square} style={{backgroundColor: color}}></div>
            <div className={styles.description}>
                <p>{description}</p>
            </div>
        </div>
    );
}