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
    backgroundColor?: string,
    value?: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
}

export function InputField({
                               width,
                               height,
                               value,
                               border,
                               placeholder,
                               id,
                               padding,
                               name,
                               handleChange,
                               backgroundColor,
                               type = "text",
                               handleKeyPress
                           }: InputFieldProps) {
    return (
        <input type={type}
               style={{width, height, border, padding, backgroundColor}}
               className={styles.storybook_inputField}
               placeholder={placeholder}
               id={id}
               name={name}
               value={value}
               onChange={handleChange}
               onKeyDown={handleKeyPress}
               required/>
    )
}