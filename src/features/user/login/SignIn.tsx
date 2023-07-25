import React, {FormEvent, useState} from "react";
import {Banner} from "../../../components/banner/Banner";
import {Login} from "../../../components/login/Login";
import styles from './SignIn.module.css';
import axios from "axios";
import {API, User} from "../../../types/types";
import {useNavigate} from "react-router-dom";
import {ErrorBox} from "../../../components/errorbox/ErrorBox";

export function SignIn(){
    let initState: User = {
        "username": "",
        "password": "",
    }
    const [loginInfo, setLoginInfo] = useState(initState);
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
            })
            .catch((err) => {
                setErrorMessage(err.response.data['detail']);
            })
    }
    return (
        <div className={styles.container}>
            {errorMessage? <ErrorBox message={errorMessage} />: null}
            <Banner />
            <Login  handleChange={handleChange} handleSubmit={handleSubmit}/>
        </div>
    )
}
// import React, {FormEvent, useState} from "react";
// import {SignInForm} from "./SignInForm";
// import axios from "axios";
// import {API, User} from "../../../types/types";
// import {useNavigate} from "react-router-dom";
//
// export function SignIn() {
//     let initialState: User = {
//         "username": "",
//         "password": "",
//     }
//     const [loginInfo, setLoginInfo] = useState(initialState);
//     const [errorMessage, setErrorMessage] = useState("");
//     const navigate = useNavigate();
//
//     const handleChange = (event: FormEvent) => {
//         event.preventDefault()
//         const target = event.target as HTMLInputElement
//         setLoginInfo({
//             ...loginInfo,
//             [target.name]: target.value
//         })
//     }
//     const handleSubmit = async (event: FormEvent) => {
//         event.preventDefault();
//         const options = {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             withCredentials: true,
//         }
//         await axios.post(`${API}accounts/login/`, JSON.stringify(loginInfo), options)
//             .then((res) => {
//                 navigate("/dashboard");
//                 console.log("success");
//             })
//             .catch((err) => {
//                 setErrorMessage("credentials didn't match! Please try again");
//                 console.log(err);
//             })
//     }
//     return (
//         <div>
//             <SignInForm handleSubmit={handleSubmit} handleChange={handleChange} errorMessage={errorMessage} />
//         </div>
//     )
// }