import React from "react";
import {Page} from "./page/Page";
import MaterialIcon from "material-icons-react";
import styles from './Pagination.module.css';

interface PaginationProps {
    numberOfPages: number;
    getPage: (event: React.MouseEvent<HTMLDivElement>, pageNumber: number) => void;
    activePage: number;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
}

export function Pagination({numberOfPages, getPage, activePage, goToPreviousPage, goToNextPage}: PaginationProps) {
    return (
        <div className={styles.container}>
            <div className={styles.icons} onClick={goToPreviousPage}>
                <MaterialIcon icon="arrow_left" color="#007bff" size={35}/>
            </div>
            {new Array(numberOfPages).fill(0).map((page, index) => {
                return <Page pageNumber={index + 1} isActive={index + 1 === activePage} key={index} getPage={getPage}/>
            })}
            <div className={styles.icons} onClick={goToNextPage}>
                <MaterialIcon icon="arrow_right" color="#007bff" size={35}/>

            </div>
        </div>
    )
}