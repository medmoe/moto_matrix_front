import React from "react";
import styles from "./Table.module.css";
import MaterialIcon from 'material-icons-react';
import {getUniqueKey} from "../../utils/functools";
import {TableRows} from "../../types/generalTypes";


interface TableProps<T extends { [key: string]: any }> {
    data: TableRows<T>,
    tableColumnsMapping: Record<string, string>,
}

function renderCellContent(key: string, value: string | null | undefined, defaultImage: JSX.Element) {
    if (key === 'image') {
        return value && value.startsWith('http') ?
            <img src={value} alt={'auto part'} width={35} height={35}/> : defaultImage;
    }
    return value
}

export function Table<T>({data, tableColumnsMapping}: TableProps<T & { [key: string]: any }>) {
    const defaultImage: JSX.Element = <MaterialIcon icon={'image'} size={35} color={"#d9d9d9"}/>

    return (
        <table className={styles.table}>
            <thead>
            <tr>
                {Object.keys(tableColumnsMapping).map((key) => {
                    return <th key={getUniqueKey()}>{key}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {data.map((row: T & { [key: string]: any }) => {
                return <tr key={getUniqueKey()}>
                    {Object.keys(tableColumnsMapping).map((key: string) => {
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