import React from "react";
import MaterialIcon from 'material-icons-react'
import styles from './CheckCircle.module.css'

interface CheckCircleProps {
    icon: string
}

export function CheckCircle ({icon}: CheckCircleProps) {
    return (
        <div className={styles.fade_away}>
            <MaterialIcon icon={icon} size={25} color="#4ecb71" />
        </div>
    )
}