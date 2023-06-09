import React, {FormEvent} from "react";
import logo from "../../assets/images/moto_matrix.png";
import {Link} from "react-router-dom";
import styles from '../../assets/styles/Forms.module.css'

type Props = {
    handleSubmit: (event: FormEvent) => void;
    handleChange: (event: FormEvent) => void;
    errorMessage: string;
}

export function SignInForm({handleSubmit, handleChange, errorMessage}: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img src={logo} alt="Moto Matrix Logo"/>
                <p>Find everything you need instantaneously</p>
            </div>
            <hr/>
            <div className={styles.body}>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="username" name="username" onChange={handleChange}
                           placeholder="username" required/>
                    <input type="password" id="password" name="password" onChange={handleChange}
                           placeholder="password" required/>
                    <input className={styles.submit_btn} type="submit" value="submit" id="submit_btn"/>
                </form>

            </div>
            <div className={styles.footer}>
                <p className={styles.err}>{errorMessage}</p>
                <p>Don't have an account?</p>
                <Link to={'/signup'} className={styles.signUpLink}>Sign Up</Link>
            </div>
        </div>
    );
}