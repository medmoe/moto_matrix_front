import React from "react";
import styles from "./Table.module.css";
import {TableColumnMappingRecord, TableRows} from "../../types/generalTypes";
import {RowCells} from "./RowCells";


interface TableProps<T extends { [key: string]: any }> {
    data: TableRows<T>,
    tableColumnsMapping: TableColumnMappingRecord,
    handleRowDetail?: (event: React.MouseEvent<HTMLTableRowElement>, row: T, rowNumber: number) => void
}

function getColumnsNames(obj: TableColumnMappingRecord): string[] {
    return Object.keys(obj).reduce((acc: string[], key) => {
        if (typeof obj[key] === 'string') {
            acc.push(key)
        } else {
            acc = acc.concat(getColumnsNames(obj[key] as TableColumnMappingRecord))
        }
        return acc
    }, [])
}

export function Table<T>({data, tableColumnsMapping, handleRowDetail}: TableProps<T & { [key: string]: any }>) {
    return (
        <table className={styles.table}>
            <thead>
            <tr>
                {getColumnsNames(tableColumnsMapping).map((name, idx) => {
                    return <th key={idx}>{name}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowNumber) => <tr key={rowNumber}
                                              onClick={(event) => {
                                                  if (handleRowDetail) {
                                                      handleRowDetail(event, row, rowNumber)
                                                  }
                                              }}>
                <RowCells columnMapping={tableColumnsMapping} rowData={row} rowNumber={rowNumber}/>
            </tr>)}
            </tbody>
        </table>
    )
}