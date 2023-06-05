import React, {FormEvent, useState} from "react";
import axios from "axios";
import {SignUpForm} from "./SignUpForm";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hooks";
import {API} from "../../../types/types";

interface UserInfo {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    password: string,
    pass2?: string,
}

export function SignUp() {
    let initialState: UserInfo = {
        "first_name": "",
        "last_name": "",
        "email": "",
        "phone": "",
        "password": "",
        "pass2": "",
    }
    const [userInfo, setUserInfo] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (userInfo.password !== userInfo.pass2) {
            setErrorMessage("Password didn't match!")
            return;
        }
        const options = {   // axios options
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }
        delete userInfo.pass2;
        await axios.post(`${API}signup/`, JSON.stringify(userInfo), options)
            .then((res) => {
                console.log("success");
            })
            .catch((err) => {
                setErrorMessage("something went wrong! please contact support");
                console.log(err);
            })
    }

    const handleChange = (event: FormEvent) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement
        setUserInfo({
            ...userInfo,
            [target.name]: target.value
        })
    }
    return (
        <>
            <SignUpForm handleSubmit={handleSubmit} handleChange={handleChange} errorMessage={errorMessage}/>
        </>
    )
}