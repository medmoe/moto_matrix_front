import React from "react";
import styles from "./Table.module.css";
import {TableRow} from "../../types/types";
import {capitalize} from "../../utils/functools";
import MaterialIcon from 'material-icons-react';


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
                        return column === 'image' ?
                            <td key={colIdx}>
                                {
                                    row[column] && row[column].startsWith("http") ?
                                        <img src={row[column]} alt={"Auto part"} width={35} height={35}/> :
                                        <MaterialIcon icon={"inventory_2"} size={34} color={"#d9d9d9"}/>
                                }
                            </td>
                            :
                            <td key={colIdx}>{row[column]}</td>
                    })}
                </tr>
            })}
            </tbody>
        </table>
    )
}