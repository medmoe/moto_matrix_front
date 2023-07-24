import React from "react";
import styles from './Button.module.css'

interface args {
    label: string,
    width?: string,
    height?: string,
    backgroundColor?: string,
    textColor?: string,
    border?: string,

}

export function Button({label, width, height, backgroundColor, textColor, border}: args) {
    return (
        <button className={styles.storybook_button}
                style={{
                    width: `${width}`,
                    height: `${height}`,
                    backgroundColor: `${backgroundColor}`,
                    color: `${textColor}`,
                    border: `${border}`,
                }}
        >
            {label}
        </button>
    )
}