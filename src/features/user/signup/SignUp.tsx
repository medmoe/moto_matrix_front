import React, {FormEvent, useState} from "react";
import axios from "axios";
import {SignUpForm} from "./SignUpForm";
import {useNavigate} from "react-router-dom";
import {API, UserProfile} from "../../../types/types";

export function SignUp() {
    let initialState: UserProfile = {
        "email": "",
        "password": "",
    }
    const [userInfo, setUserInfo] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (userInfo.password !== userInfo.password2) {
            setErrorMessage("Password didn't match!")
            return;
        }
        const options = {   // axios options
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }
        delete userInfo.password2;
        await axios.post(`${API}signup/`, JSON.stringify(userInfo), options)
            .then((res) => {
                navigate("/dashboard");
            })
            .catch((err) => {
                setErrorMessage("something went wrong! please contact support");
                console.log(err);
            })
    }

    const handleChange = (event: FormEvent) => {
        const target = event.target as HTMLInputElement
        setUserInfo({
            ...userInfo,
            [target.name]: target.name === "is_provider" ? target.value === "YES" : target.value
        })
    }
    return (
        <>
            <SignUpForm handleSubmit={handleSubmit} handleChange={handleChange} errorMessage={errorMessage}/>
        </>
    )
}