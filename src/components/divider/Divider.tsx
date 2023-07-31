import React from 'react';
import styles from './Divider.module.css';

interface DividerProps {
    width?: string,
}

export function Divider ({width}: DividerProps) {
    return (
        <div className={styles.container} style={{width: width}}></div>
    )
}