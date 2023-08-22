import React, {FormEvent} from "react";
import MaterialIcon from 'material-icons-react'
import {InputField} from "../inputField/InputField";

import styles from './SearchField.module.css';

interface SearchFieldProps {
    handleChangeOnSearchField: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export function SearchField({handleChangeOnSearchField, handleKeyPress}: SearchFieldProps) {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <MaterialIcon icon="search" color="#CCCCCC" size={25}/>
            </div>
            <div className={styles.searchBar}>
                <InputField border="none"
                            handleChange={handleChangeOnSearchField}
                            placeholder="Search"
                            width="336px"
                            height="40px"
                            padding="0 0 0 43px"
                            type="text"
                            name="searchBar"
                            id="searchBar"
                            backgroundColor="#eee"
                            handleKeyPress={handleKeyPress}
                />
            </div>
        </div>
    );
}