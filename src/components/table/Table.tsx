import React from "react";
import styles from "./Table.module.css";
import {STATUS_COLORS, TableRow} from "../../types/types";
import {capitalize} from "../../utils/functools";


interface TableProps {
    data: TableRow,
    columns: string[],
}

export function Table({data, columns}: TableProps) {
    return (
        <table className={styles.table}>
            <thead>
            <tr>
                {columns.map((column, index) => {
                    return <th key={index}>{capitalize(column)}</th>;
                })}
            </tr>
            </thead>
            <tbody>
            {data.map((row: any, index) => {
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