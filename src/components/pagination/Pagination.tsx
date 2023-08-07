import React from "react";
import {Page} from "./page/Page";
import MaterialIcon from "material-icons-react";
import styles from './Pagination.module.css';

interface PaginationProps {
    numberOfPages: number
}

export function Pagination({numberOfPages}: PaginationProps) {
    return (
        <div className={styles.container}>
            <MaterialIcon icon="arrow_left" color="#007bff" size={35}/>
                {new Array(numberOfPages).fill(0).map((page, index) => {
                    return <Page pageNumber={index + 1} isActive={false} key={index}/>
                })}
            <MaterialIcon icon="arrow_right" color="#007bff" size={35}/>
        </div>
    )
}