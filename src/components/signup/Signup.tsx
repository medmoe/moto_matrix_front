import React, {FormEvent} from "react";
import {Text} from "../text/Text";
import {InputField} from "../inputField/InputField";
import {Radio} from "../radio/Radio";
import {Button} from "../button/Button"
import styles from './Signup.module.css';
import {Link} from "react-router-dom";
import {ProfileType} from "../../types/userTypes";

interface SignupProps {
    handleChange: (event: FormEvent) => void
    handleSubmit: (event: FormEvent) => void
}

export function Signup({handleChange, handleSubmit}: SignupProps) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Text text="Register" fontSize="32px" fontWeight="600" color="#000"/>
                </div>
                <div className={styles.subtitle}>
                    <Text text="Start exploring our extensive catalog" fontSize="18px" fontWeight="500" color="#000"/>
                </div>
                <div className={styles.text}>
                    <p style={{

                        fontSize: "12px", color: "#9e9d9d"
                    }}>Let's get you all set up so you can verify your personal account and begin<br/>setting up your
                        profile.</p>
                </div>
            </div>
            <form className={styles.body}>
                <div className={styles.row}>
                    <InputField border="1px solid #9e9d9d"
                                id="first_name"
                                name="first_name"
                                height="53px"
                                width="222px"
                                placeholder="First Name"
                                padding="0 14px"
                                handleChange={handleChange}
                    />
                    <InputField border="1px solid #9e9d9d"
                                id="last_name"
                                name="last_name"
                                height="53px"
                                width="222px"
                                placeholder="Last Name"
                                padding="0 14px"
                                handleChange={handleChange}
                    />
                </div>
                <div className={styles.row}>
                    <InputField border="1px solid #9e9d9d"
                                id="phone"
                                name="phone"
                                height="53px"
                                width="222px"
                                placeholder="Phone"
                                type="tel"
                                padding="0 14px"
                                handleChange={handleChange}
                    />
                    <InputField border="1px solid #9e9d9d"
                                id="email"
                                name="email"
                                height="53px"
                                width="222px"
                                placeholder="Email"
                                type="email"
                                padding="0 14px"
                                handleChange={handleChange}
                    />
                </div>
                <div className={styles.row}>
                    <InputField border="1px solid #9e9d9d"
                                id="password"
                                name="password"
                                height="53px"
                                width="222px"
                                placeholder="Password"
                                type="password"
                                padding="0 14px"
                                handleChange={handleChange}
                    />
                    <InputField border="1px solid #9e9d9d"
                                id="password2"
                                name="password2"
                                height="53px"
                                width="222px"
                                placeholder="Confirm Password"
                                type="password"
                                padding="0 14px"
                                handleChange={handleChange}
                    />
                </div>
                <div className={styles.row}>
                    <InputField border="1px solid #9e9d9d"
                                id="username"
                                name="username"
                                height="53px"
                                width="222px"
                                placeholder="Username"
                                padding="0 14px"
                                handleChange={handleChange}
                    />
                    <div className={styles.radios}>
                        <Radio id="consumer" name="profile_type" value={ProfileType.Consumer} handleChange={handleChange}/>
                        <Radio id="seller" name="profile_type" value={ProfileType.Provider} handleChange={handleChange}/>
                    </div>
                </div>
                <div className={styles.row}>
                    <Button label="CONTINUE"
                            height="53px"
                            width="250px"
                            border="none"
                            backgroundColor="#007BFF"
                            textColor="#FFF"
                            handleClick={handleSubmit}
                    />
                    <p className={styles.helper_text}>Already have an account?
                        <span
                            style={{color: "#007BFF"}}>
                            <Link to="/">Log in</Link>
                        </span>
                    </p>
                </div>
            </form>
        </div>
    )
}