import React from 'react';
import {Banner} from "../../../components/banner/Banner";
import {Signup} from "../../../components/signup/Signup";
import styles from './SignUp.module.css'

export function SignUp () {
    return (
        <div className={styles.container}>
            <Banner />
            <Signup />
        </div>
    )
}
// import React, {FormEvent, useState} from "react";
// import axios from "axios";
// import {SignUpForm} from "./SignUpForm";
// import {useNavigate} from "react-router-dom";
// import {API, UserProfile} from "../../../types/types";
//
// export function SignUp() {
//     let initialState: UserProfile = {
//         "user": {
//             "username": "",
//             "password": "",
//         },
//     }
//     const [userInfo, setUserInfo] = useState(initialState);
//     const [errorMessage, setErrorMessage] = useState("");
//     const navigate = useNavigate();
//     const handleSubmit = async (event: FormEvent) => {
//         event.preventDefault();
//         if (userInfo.user.password !== userInfo.user.password2) {
//             setErrorMessage("Password didn't match!")
//             return;
//         }
//         const options = {   // axios options
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             withCredentials: true,
//         }
//         delete userInfo.user.password2;
//         await axios.post(`${API}accounts/signup/`, JSON.stringify(userInfo), options)
//             .then((res) => {
//                 navigate("/dashboard");
//                 console.log(res);
//             })
//             .catch((err) => {
//                 setErrorMessage("something went wrong! please contact support");
//                 console.log(err);
//             })
//     }
//
//     const handleChange = (event: FormEvent) => {
//         const target = event.target as HTMLInputElement
//         const properties = ["username", "password", "password2", "first_name", "last_name", "email"]
//         if (properties.includes(target.name)) {
//             setUserInfo({
//                 ...userInfo,
//                 user: {
//                     ...userInfo.user,
//                     [target.name]: target.value
//                 }
//             })
//             return;
//         }
//         setUserInfo({
//             ...userInfo,
//             [target.name]: target.name === "is_provider" ? target.value === "YES" : target.value
//         })
//     }
//     return (
//         <>
//             <SignUpForm handleSubmit={handleSubmit} handleChange={handleChange} errorMessage={errorMessage}/>
//         </>
//     )
// }