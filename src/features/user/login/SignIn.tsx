import React, {FormEvent, useState} from "react";
import {SignInForm} from "./SignInForm";
import axios from "axios";
import {API} from "../../../types/types";

interface LoginInfo {
    email: string,
    password: string,
}
export function SignIn() {
    let initialState: LoginInfo = {
        "email": "",
        "password": "",
    }
    const [loginInfo, setLoginInfo] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");


    const handleChange = (event: FormEvent) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement
        setLoginInfo({
            ...loginInfo,
            [target.name]: target.value
        })
    }
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }
        await axios.post(`${API}login/`, JSON.stringify(loginInfo), options)
            .then((res) => {
                console.log("success");
            })
            .catch((err) => {
                setErrorMessage("credentials didn't match! Please try again");
                console.log(err);
            })
    }
    return (
        <div>
            <SignInForm handleSubmit={handleSubmit} handleChange={handleChange} errorMessage={errorMessage} />
        </div>
    )
}