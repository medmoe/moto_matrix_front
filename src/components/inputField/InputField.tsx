import React from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
    width?: string,
    height?: string,
    border: string,
    placeholder?: string,
    id?: string,
    padding?: string,
}

export function InputField ({width, height, border, placeholder, id, padding}: InputFieldProps) {
    return (
        <input type="text"
               style={{
                   width:`${width}`,
                   height:`${height}`,
                   border:`${border}`,
                   padding:`${padding}`
                }}
               className={styles.storybook_inputField}
               placeholder={placeholder}
               id={id}
               required />
    )
}