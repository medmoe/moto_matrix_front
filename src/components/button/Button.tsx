import React, {FormEvent} from "react";
import styles from './Button.module.css'

interface args {
    label: string,
    backgroundColor?: string,
    color?: string,
    border?: string,
    handleClick?: (event: FormEvent) => void,
    icon?: JSX.Element,
    width?: string,

}

export function Button({icon, handleClick, label, backgroundColor, color, border, width}: args) {
    return (
        <div className={`${styles.container}`} onClick={handleClick} style={{width}}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <button className={`${styles.storybook_button} ${icon? styles.iconPadding: ""}`} style={{backgroundColor, color, border}}>
                {label}
            </button>
        </div>
    );
}

