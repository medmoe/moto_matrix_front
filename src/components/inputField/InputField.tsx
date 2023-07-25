import React from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
    width?: string,
    height?: string,
    border: string,
    placeholder?: string,
    id?: string,
    padding?: string,
    name?: string,
    type?: string,
}

export function InputField ({width, height, border, placeholder, id, padding, name, type="text"}: InputFieldProps) {
    return (
        <input type={type}
               style={{
                   width:`${width}`,
                   height:`${height}`,
                   border:`${border}`,
                   padding:`${padding}`
                }}
               className={styles.storybook_inputField}
               placeholder={placeholder}
               id={id}
               name={name}
               required />
    )
}