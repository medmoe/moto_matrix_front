import React, {FormEvent} from "react";
import styles from './Button.module.css'

interface args {
    label: string,
    width?: string,
    height?: string,
    backgroundColor?: string,
    textColor?: string,
    border?: string,
    handleClick?: (event: FormEvent) => void,
    icon?: JSX.Element,

}

export function Button({
                           icon,
                           handleClick,
                           label,
                           width,
                           height,
                           backgroundColor,
                           textColor,
                           border,
                       }: args) {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                {icon}
            </div>
            {icon ? <div style={{
                backgroundColor: backgroundColor,
                width: "24px",
                height: height,
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px"
            }}></div> : <div></div>}
            <div>
                {icon ? <button className={styles.storybook_button}
                                style={{
                                    width: `${width}`,
                                    height: `${height}`,
                                    backgroundColor: `${backgroundColor}`,
                                    color: `${textColor}`,
                                    border: `${border}`,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                }}
                                onClick={handleClick}>
                    {label}
                </button> : <button className={styles.storybook_button}
                                    style={{
                                        width: `${width}`,
                                        height: `${height}`,
                                        backgroundColor: `${backgroundColor}`,
                                        color: `${textColor}`,
                                        border: `${border}`,
                                    }}
                                    onClick={handleClick}>
                    {label}
                </button>}

            </div>
        </div>
    )
}
