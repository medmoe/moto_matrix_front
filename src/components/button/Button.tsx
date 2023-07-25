import React, {FormEvent} from "react";
import styles from './Button.module.css'

interface args {
    label: string,
    width?: string,
    height?: string,
    backgroundColor?: string,
    textColor?: string,
    border?: string,
    handleClick: (event: FormEvent) => void,

}

export function Button({handleClick, label, width, height, backgroundColor, textColor, border}: args) {
    return (
        <button className={styles.storybook_button}
                style={{
                    width: `${width}`,
                    height: `${height}`,
                    backgroundColor: `${backgroundColor}`,
                    color: `${textColor}`,
                    border: `${border}`,
                }}
                onClick={handleClick}
        >
            {label}
        </button>
    )
}