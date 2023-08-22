import React from "react";
import styles from "./Page.module.css";

interface PageProps {
    pageNumber: number,
    isActive: boolean,
    getPage: (event: React.MouseEvent<HTMLDivElement>, pageNumber: number) => void,
}

export function Page({pageNumber, isActive, getPage}: PageProps) {
    return (
        <div className={styles.container} onClick={(event) => getPage(event, pageNumber)}
             style={{
                 backgroundColor: isActive ? "#54A6FE" : "#FFF",
                 border: isActive ? "none" : "1px solid #cccccc",
                 color: isActive? "#fff": "#ccc",
             }}>
            <p>{pageNumber}</p>
        </div>
    )
}