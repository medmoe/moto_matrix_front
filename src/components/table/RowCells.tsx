import React, {JSX} from 'react'
import {TableColumnMappingRecord} from "../../types/generalTypes";
import {DEFAULT_COLOR, IMAGE_KEY, IMAGE_SIZE} from "../../constants";
import MaterialIcon from 'material-icons-react';

interface RowCellsProps {
    columnMapping: TableColumnMappingRecord;
    rowData: any;
    rowNumber: number;
}


const renderImageCell = (key: string, rowNumber: number, columnNumber: number, imageUrl: string | undefined): JSX.Element => {
    const content = imageUrl?.startsWith('http')
        ? <img src={imageUrl} alt={IMAGE_KEY} width={IMAGE_SIZE} height={IMAGE_SIZE}/>
        : <MaterialIcon icon={IMAGE_KEY} size={IMAGE_SIZE} color={DEFAULT_COLOR}/>
    return <td key={`${rowNumber}-${columnNumber}`}>{content}</td>
}

function renderRowCells(columnMapping: TableColumnMappingRecord, rowData: any, rowNumber: number): JSX.Element[] {
    return Object.keys(columnMapping).reduce((acc: JSX.Element[], key: string, columnNumber: number) => {
        if (typeof columnMapping[key] === 'string') {
            if (columnMapping[key] === IMAGE_KEY) {
                const imageUrl = rowData[columnMapping[key] as keyof typeof rowData] as string
                acc.push(renderImageCell(key, rowNumber, columnNumber, imageUrl));
            } else {
                acc.push(<td key={`${rowNumber}-${columnNumber}`}>{rowData[columnMapping[key] as keyof typeof rowData]}</td>)
            }
        } else {
            acc = acc.concat(renderRowCells(columnMapping[key] as TableColumnMappingRecord, rowData[key], rowNumber + 1))
        }
        return acc
    }, [])
}


export function RowCells({columnMapping, rowData, rowNumber}: RowCellsProps) {
    return <>{renderRowCells(columnMapping, rowData, rowNumber)}</>
}