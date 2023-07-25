import React, {FormEvent} from "react";
import {Button} from '../button/Button'
import {InputField} from "../inputField/InputField";
import {Text} from "../text/Text";
import styles from './Login.module.css';
import MaterialIcon from 'material-icons-react';
import {useNavigate} from "react-router-dom";

interface LoginProps {
    handleChange: (event: FormEvent) => void,
    handleSubmit: (event: FormEvent) => void,
}

export function Login({handleChange, handleSubmit}: LoginProps) {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.first}>
                    <Text text="Welcome Back"
                          fontSize="32px"
                          fontWeight="600"
                          color="#000"

                    />
                </div>
                <div className={styles.second}>
                    <Text text="Enter your credentials to access your account"
                          color="#9e9d9d"
                          fontSize="14px"
                          fontWeight="400"/>
                </div>
            </div>
            <div>
                <form className={styles.body}>
                    <div className={styles.input_field}>
                        <div className={styles.icon}>
                            <MaterialIcon icon="person" color='#007BFF' size={25}/>
                        </div>
                        <div>
                            <InputField border="1px solid #9e9d9d"
                                        height="53px"
                                        width="307px"
                                        padding="0 47px"
                                        placeholder="USERNAME"
                                        id="username"
                                        name="username"
                                        type="text"
                                        handleChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.input_field}>
                        <div className={styles.icon}>
                            <MaterialIcon icon="lock" color='#007BFF' size={25}/>
                        </div>
                        <div>
                            <InputField border="1px solid #9e9d9d"
                                        height="53px"
                                        width="307px"
                                        padding="0 47px"
                                        placeholder="PASSWORD"
                                        id="password"
                                        name="password"
                                        type="password"
                                        handleChange={handleChange}
                            />
                        </div>
                    </div>
                    <Button label="CONTINUE"
                            height="53px"
                            width="401px"
                            backgroundColor="#007BFF"
                            border="none"
                            textColor="#FFF"
                            handleClick={handleSubmit}
                    />
                </form>
            </div>
            <div className={styles.footer}>
                <div className={styles.reset_password}>
                    <p className={styles.text}>Forgot your password? <span
                        className={styles.reset}>Reset Password</span>
                    </p>
                </div>
                <div className={styles.register}>
                    <Text text="Don't have an account" color="#000" fontSize="14px" fontWeight="400"/>
                    <Button label="JOIN NOW"
                            height="53px"
                            width="191px"
                            border="1px solid #007BFF"
                            textColor="#007BFF"
                            backgroundColor="#FFF"
                            handleClick={() => navigate("/signup")}
                    />
                </div>
            </div>

        </div>

    );
}