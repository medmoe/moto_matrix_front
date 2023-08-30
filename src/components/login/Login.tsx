import React, {FormEvent} from "react";
import {Button} from '../button/Button'
import {Text} from "../text/Text";
import styles from './Login.module.css';
import {useNavigate} from "react-router-dom";
import {INPUT_FIELD_STYLE} from "../../constants/constants";
import {InputField} from "../inputField/InputField";
import MaterialIcon from 'material-icons-react';

interface LoginProps {
    handleChange: (event: FormEvent) => void,
    handleSubmit: (event: FormEvent) => void,
}

export function Login({handleChange, handleSubmit}: LoginProps) {
    const navigate = useNavigate();
    const inputFieldWidth: string = "100%";
    const loginInputValues: [string, string, string, string][] = [['person', 'USERNAME', 'username', 'text'], ['lock', 'PASSWORD', 'password', 'password']]
    const headerTextValues: [string, string, string, string][] = [['Welcome Back', '32px', '600', '#000'], ['Enter your credentials to access your account', '14px', '400', '#9e9d9d']]
    return (
        <div className={`${styles.container} ${styles.commonProperties}`}>
            <div className={`${styles.header} ${styles.commonProperties}`}>
                {headerTextValues.map(([text, fontSize, fontWeight, color], idx) => {
                    return <Text text={text} color={color} fontSize={fontSize} fontWeight={fontWeight} key={idx}/>
                })}
            </div>
            <div className={`${styles.body} ${styles.commonProperties}`}>
                <form className={`${styles.formContainer} ${styles.commonProperties}`}>
                    {loginInputValues.map(([icon, placeholder, name, type], idx) => {
                        return (
                            <div className={styles.input_field}>
                                <div className={styles.icon}>
                                    <MaterialIcon icon={icon} size={24} color={"#007bff"}/>
                                </div>
                                <InputField handleChange={handleChange}
                                            padding={"0 0 0 40px"}
                                            key={idx}
                                            id={name}
                                            name={name}
                                            placeholder={placeholder}
                                            type={type}
                                            width={inputFieldWidth}
                                            {...INPUT_FIELD_STYLE}
                                />
                            </div>
                        )
                    })}
                    <div className={styles.loginButtonContainer}>
                        <Button label="CONTINUE"
                                backgroundColor="#007BFF"
                                border="none"
                                color="#FFF"
                                handleClick={handleSubmit}
                        />
                    </div>
                </form>
            </div>
            <div className={`${styles.footer} ${styles.commonProperties}`}>
                <div className={styles.reset_password}>
                    <p className={styles.text}>Forgot your password? <span
                        className={styles.reset}>Reset Password</span>
                    </p>
                </div>
                <div className={styles.register}>
                    <Text text="Don't have an account" color="#000" fontSize="14px" fontWeight="400"/>
                    <div className={styles.signupButtonContainer}>
                        <Button label="JOIN NOW"
                                border="1px solid #007BFF"
                                color="#007BFF"
                                backgroundColor="#FFF"
                                handleClick={() => navigate("/signup")}
                        />
                    </div>
                </div>
            </div>

        </div>

    );
}