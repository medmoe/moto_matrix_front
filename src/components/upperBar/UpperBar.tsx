import React from "react";
import styles from "./UpperBar.module.css"

interface UpperBarProps {
    title?: string,
    subtitle?: string | JSX.Element,
    components?: JSX.Element[],
}

export function UpperBar ({title, subtitle, components}: UpperBarProps) {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.title}>
                    <p>{title}</p>
                </div>
                <div className={styles.subtitle}>
                    <p>{subtitle}</p>
                </div>
            </div>
            <div className={styles.right}>
                {components}
            </div>
        </div>
    )
}