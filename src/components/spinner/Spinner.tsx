import React from "react";
import styles from "./Spinner.module.css"

interface SpinnerProps {
    width: string;
    height: string;
}
export function Spinner({width, height}: SpinnerProps) {
    return (
        <div className={styles.loader} style={{width:width, height: height}}>

        </div>
    )
}