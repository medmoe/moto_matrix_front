import React, {FormEvent} from "react";
import {Text} from "../text/Text";
import {InputField} from "../inputField/InputField";
import {Button} from "../button/Button"
import {Link} from "react-router-dom";
import {ProfileType} from "../../types/userTypes";
import {Radio} from "../radio/Radio";
import styles from './Signup.module.css'

interface SignupProps {
    handleChange: (event: FormEvent) => void
    handleSubmit: (event: FormEvent) => void
}

export function Signup({handleChange, handleSubmit}: SignupProps) {
    const inputFieldHeight: string = "50px"
    const inputFieldWidth: string = "40%"
    const inputFieldValues: [string, string, string][] = [
        ["First Name", "first_name", "text"],
        ["Last Name", 'last_name', "text"],
        ['Phone', 'phone', "tel"],
        ['Email', 'email', "email"],
        ['Password', 'password', "password"],
        ['Confirm Password', 'password2', 'password'],
        ['Username', 'username', 'text']
    ]
    const inputTuples: any[] = [];
    inputFieldValues.forEach(([placeholder, name, type], idx) => {
        const inputField = (
            <InputField border={"1px solid #9e9d9d"}
                        handleChange={handleChange}
                        id={name}
                        name={name}
                        height={inputFieldHeight}
                        width={inputFieldWidth}
                        placeholder={placeholder}
                        type={type}
                        padding={"0 14px"}
            />
        )
        if (idx % 2 !== 0) {
            inputTuples.push([inputTuples.pop()[0], inputField]);
        } else {
            inputTuples.push([inputField])
        }
    })

    const radioOptions = (
        <div>
            <Radio id="consumer" name="profile_type" value={ProfileType.Consumer} handleChange={handleChange}/>
            <Radio id="seller" name="profile_type" value={ProfileType.Provider} handleChange={handleChange}/>
        </div>
    );
    inputTuples.push([inputTuples.pop()[0], radioOptions])

    return (
        <div className={styles.parentContainer}>
            <div className={styles.container}>
                <div>
                    <Text text="Register" fontSize="32px" fontWeight="600" color="#000"/>
                    <Text text="Start exploring our extensive catalog" fontSize="18px" fontWeight="500" color="#000"/>
                    <p style={{
                        fontSize: "12px", color: "#9e9d9d"
                    }}>Let's get you all set up so you can verify your personal account and begin<br/>setting up your
                        profile.</p>
                </div>
                <div>
                    <form className={styles.formContainer}>
                        {inputTuples.map(([first, second], idx) => {
                            return <div className={styles.row} key={idx}>{first}{second}</div>
                        })}
                        <div className={styles.buttonsContainer}>
                            <div className={styles.continueButton}>
                                <Button label="CONTINUE"
                                        border="none"
                                        backgroundColor="#007BFF"
                                        color="#FFF"
                                        handleClick={handleSubmit}
                                />
                            </div>
                            <div className={styles.signupLink}>
                                <p>Already have an account?
                                    <span
                                        style={{color: "#007BFF"}}>
                            <Link to="/">Log in</Link>
                        </span>
                                </p>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}