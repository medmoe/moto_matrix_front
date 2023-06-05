import React, {FormEvent} from "react";
import {Link} from "react-router-dom";
import styles from './SignUp.module.css';
import all from '../../assets/styles/Forms.module.css'
import auto from '../../assets/images/auto.jpg';


type Props = {
    handleSubmit: (event: FormEvent) => void;
    handleChange: (event: FormEvent) => void;
    errorMessage: string;
}

export function SignUpForm({handleSubmit, handleChange, errorMessage}: Props) {
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <img src={auto} alt="auto"/>
                </div>
                <div className={styles.right}>
                    <div className={styles.header}>
                        <h2>Register</h2>
                        <h4>Manage your store efficiently</h4>
                        <p>Let's get you all set up so you can verify you personal account and begin setting up your
                            profile</p>
                    </div>
                    <hr id={styles['divider']}/>
                    <div className={styles.body}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.row}>
                                <div className={styles.col}>
                                    <label htmlFor="first_name">First name</label>
                                    <input type="text" id="first_name" name="first_name" onChange={handleChange}
                                           required/>
                                </div>
                                <div className={styles.col}>
                                    <label htmlFor="last_name">Last name</label>
                                    <input type="text" id="last_name" name="last_name" onChange={handleChange}
                                           required/>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col}>
                                    <label htmlFor="phone">Phone</label>
                                    <input type="tel" id="phone" name="phone" onChange={handleChange} required/>
                                </div>
                                <div className={styles.col}>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col}>
                                    <label htmlFor="pass1">Password</label>
                                    <input type="password" id="password" name="password" onChange={handleChange}
                                           required/>
                                </div>
                                <div className={styles.col}>
                                    <label htmlFor="pass2">Renter password</label>
                                    <input type="password" id="pass2" name="pass2" onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col}>
                                    <label htmlFor="consumer">
                                        <input type="radio" id="consumer" name="is_provider" value="NO" onChange={handleChange} required/>
                                        Consumer
                                    </label>
                                    <label htmlFor="seller">
                                        <input type="radio" id="seller" name="is_provider" value="YES" onChange={handleChange} required/>
                                        Seller
                                    </label>
                                </div>
                                <div className={styles.col}>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col}>
                                    <input type="submit" value="submit" id="submit_btn" className={styles.submit_btn}/>
                                </div>
                                <div className={styles.col}>
                                    <p className={all.err}>{errorMessage}</p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={styles.footer}>
                        <p>Already have an account?</p>
                        <Link to={'/'} className={styles.sign_in_link}>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}