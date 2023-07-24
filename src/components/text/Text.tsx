import React from "react";
import styles from './Text.module.css';

interface textProps {
    text: string,
    color: string,
    fontSize: string,
    fontWeight: string
}

export function Text({text, color="#000", fontSize="14px", fontWeight="400"}: textProps) {
    return (
        <p style={{
            color: `${color}`,
            fontSize: `${fontSize}`,
            fontWeight: `${fontWeight}`
        }} className={styles.text}>{text}</p>
    )
}