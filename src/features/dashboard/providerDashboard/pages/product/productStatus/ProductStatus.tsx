import React from "react";
import styles from "./ProductStatus.module.css";

interface ProductStatusProps {
    title: string,
    isActive: boolean,
    handleClick: () => void,
}

export function ProductStatus({title, isActive, handleClick}: ProductStatusProps) {
    return (
        <div className={styles.container} style={{
            borderBottom: isActive ? "1px solid #54A6FE" : "1px solid #ccc",
            color: isActive ? "#54A6FE" : "#ccc"
        }} onClick={handleClick}>
            <p>{title}</p>
        </div>
    )
}