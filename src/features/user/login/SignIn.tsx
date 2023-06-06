import React, {FormEvent, useState} from "react";
import {SignInForm} from "./SignInForm";
import axios from "axios";
import {API, UserProfile, User} from "../../../types/types";
import {useNavigate} from "react-router-dom";

export function SignIn() {
    let initialState: User = {
        "username": "",
        "password": "",
    }
    const [loginInfo, setLoginInfo] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

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
        await axios.post(`${API}accounts/login/`, JSON.stringify(loginInfo), options)
            .then((res) => {
                navigate("/dashboard");
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