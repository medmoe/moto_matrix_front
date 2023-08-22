import React, {FormEvent} from 'react';
import style from './Select.module.css';

interface SelectProps<T> {
    options: [string, T][];
    handleChange?: (event: FormEvent) => void;
    currentValue?: string
    name?: string
}

export function Select({options, handleChange, currentValue, name}: SelectProps<string>) {
    return (
        <select onChange={handleChange} className={style.container} value={currentValue} name={name}>
            {
                options.map(([name, value], index) => {
                    return <option value={value} key={index}>{name}</option>
                })
            }
        </select>
    )
}