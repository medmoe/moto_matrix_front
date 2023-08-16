import React from "react";
import styles from "./Table.module.css";
import {AutoPartDetail, TableRow} from "../../types/types";
import MaterialIcon from 'material-icons-react';
import {getUniqueKey} from "../../utils/functools";


interface TableProps {
    data: TableRow,
    tableColumnsMapping: Record<string, string>,
}

function renderCellContent(key: string, value: string | null | undefined, defaultImage: JSX.Element) {
    if (key === 'image') {
        return value && true && value.startsWith('http') ?
            <img src={value} alt={'auto part'} width={35} height={35}/> : defaultImage;
    }
    return value
}

export function Table({data, tableColumnsMapping}: TableProps) {
    const defaultImage: JSX.Element = <MaterialIcon icon={'image'} size={35} color={"#d9d9d9"}/>

    return (
        <table className={styles.table}>
            <thead>
            <tr>
                {Object.keys(tableColumnsMapping).map((key, idx) => {
                    return <th key={getUniqueKey()}>{key}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {data.map((row: any, index) => {
                return <tr key={getUniqueKey()}>
                    {Object.keys(tableColumnsMapping).map((key: string, i: number) => {
                        return <td key={getUniqueKey()}>
                            {renderCellContent(tableColumnsMapping[key], row[tableColumnsMapping[key]], defaultImage)}
                        </td>
                    })}
                </tr>
            })}
            </tbody>
        </table>
    )
}