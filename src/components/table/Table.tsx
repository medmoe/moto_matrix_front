import React from "react";
import styles from "./Table.module.css";
import {STATUS_COLORS} from "../../types/types";

type Row = { [key: string]: any}

interface TableProps {
    data: Row[],
    columns: string[],
}

export function Table({data, columns}: TableProps) {
    return (
        <table className={styles.table}>
            <thead>
            <tr>
                {columns.map((column, index) => {
                    return <th key={index}>{column}</th>;
                })}
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => {
                return <tr key={index}>
                    {columns.map((column, colIdx) => {
                        const key= row[column] as string;
                        return <td key={colIdx}
                                   style={{color: row[column] in STATUS_COLORS? STATUS_COLORS[key]: "#000"}}
                        >{row[column]}</td>
                    })}
                </tr>
            })}
            </tbody>
        </table>
    )
}