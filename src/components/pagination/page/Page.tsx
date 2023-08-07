import React from "react";
import styles from "./Page.module.css";

interface PageProps {
    pageNumber: number,
    isActive: boolean,
}

export function Page({pageNumber, isActive}: PageProps) {
    return (
        <div className={styles.container}
             style={{
                 backgroundColor: isActive ? "#54A6FE" : "#FFF",
                 border: isActive ? "none" : "1px solid #cccccc",
                 color: isActive? "#fff": "#ccc",
             }}>
            <p>{pageNumber}</p>
        </div>
    )
}