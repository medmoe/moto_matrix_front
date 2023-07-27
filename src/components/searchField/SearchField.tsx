import React from "react";
import MaterialIcon from 'material-icons-react'
import {InputField} from "../inputField/InputField";

import styles from './SearchField.module.css';

export function SearchField() {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <MaterialIcon icon="search" color="#CCCCCC" size={25}/>
            </div>
            <div className={styles.searchBar}>
                <InputField border="none"
                            handleChange={() => console.log("changed")}
                            placeholder="Search"
                            width="336px"
                            height="40px"
                            padding="0 0 0 43px"
                            type="text"
                            name="searchBar"
                            id="searchBar"
                            backgroundColor="#eeeeee"
                />
            </div>
        </div>
    );
}