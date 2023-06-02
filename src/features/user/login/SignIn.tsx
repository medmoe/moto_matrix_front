import React, {FormEvent, useState} from "react";
import {SignInForm} from "./SignInForm";

export function SignIn() {
    const handleChange = (event: FormEvent) => {

    }
    const handleSubmit = (event: FormEvent) => {

    }
    return (
        <div>
            <SignInForm handleSubmit={handleSubmit} handleChange={handleChange} />
        </div>
    )
}