import React from "react";
import {Page} from "./page/Page";
import MaterialIcon from "material-icons-react";
import styles from './Pagination.module.css';
import {PAGES_TO_DISPLAY} from "../../constants";

interface PaginationProps {
    numberOfPages: number;
    getPage: (event: React.MouseEvent<HTMLDivElement>, pageNumber: number) => void;
    activePage: number;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
}

export function Pagination({
                               numberOfPages,
                               getPage,
                               activePage,
                               goToPreviousPage,
                               goToNextPage,
                           }: PaginationProps) {
    const generatePages = (numberOfPages: number): JSX.Element[] => {
        const startingIndex = activePage > PAGES_TO_DISPLAY ? activePage - PAGES_TO_DISPLAY : 1
        return Array.from({length: numberOfPages === PAGES_TO_DISPLAY ? numberOfPages + 1 : numberOfPages}, (_, idx) => {
            const pageNumber = startingIndex + idx;
            return <Page pageNumber={pageNumber} isActive={activePage === pageNumber} getPage={getPage}
                         key={pageNumber}/>
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.iconButtonContainer}>
                <button className={styles.icons} onClick={goToPreviousPage} aria-label="Go to previous page"
                        style={{cursor: activePage === 1 ? "not-allowed" : "pointer"}}>
                    <MaterialIcon icon="arrow_left" color="#007bff" size={35}/>
                </button>
            </div>

            {generatePages(Math.min(numberOfPages, PAGES_TO_DISPLAY))}

            <button className={styles.icons}
                    onClick={goToNextPage}
                    aria-label="Go to next page"
                    style={{cursor: activePage === numberOfPages ? "not-allowed" : "pointer"}}>
                <MaterialIcon icon="arrow_right" color="#007bff" size={35}/>
            </button>
        </div>
    )
}
