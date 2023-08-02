import React from "react";
import styles from "./UpdateProfile.module.css";
import {UpperBar} from "../../../upperBar/UpperBar";
import {Button} from "../../../button/Button";
import {InputField} from "../../../inputField/InputField";
import {ProfileImage} from "../../../profileImage/ProfileImage";
import {Divider} from "../../../divider/Divider";
import MaterialIcon from "material-icons-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";

export function UpdateProfile() {
    return (
        <div className={styles.container}>
            <div className={styles.upperBarContainer}>
                <UpperBar left="795px"
                          title="Update Profile"
                          subtitle="Update Profile to Reflect the New You"
                          components={
                              [
                                  <Button label="Cancel"
                                          width="100px"
                                          height="40px"
                                          border="1px solid #007BFF"
                                          backgroundColor="#FFF"
                                          textColor="#007BFF"/>,
                                  <Button label="Submit"
                                          width="100px"
                                          height="40px"
                                          backgroundColor="#007BFF"
                                          textColor="#fff"
                                          border="none" icon={<MaterialIcon icon="send" size={24} color="#fff"/>}/>
                              ]
                          }
                />
            </div>
            <div className={styles.lowerContainer}>
                <div className={`${styles.largeCardContainer} ${styles.text}`}>
                    <div className={styles.header}>
                        <div className={styles.profileImageContainer}>
                            <div className={styles.uploadContainer}>
                                <ProfileImage src="#" alt="profile image"/>
                                <label htmlFor="file-upload" className={styles.customFileUpload}>
                                    <div className={styles.cameraContainer}>
                                        <MaterialIcon icon="photo_camera" size={40} color="#fff"/>
                                    </div>
                                </label>
                                <input id="file-upload"
                                       type="file"
                                       onChange={() => {
                                           console.log("foto uploaded")
                                       }}
                                       style={{display: 'none'}}
                                />
                            </div>
                            <p className={styles.title}>Account Information</p>
                        </div>
                        <div className={styles.accountInformationContainer}>
                            <div className={styles.row}>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="firstName">First Name</label>
                                    <InputField border="1px solid #9e9d9d"
                                                handleChange={() => {
                                                    console.log("first name")
                                                }}
                                                height="30px"
                                                width="200px"
                                                backgroundColor="#fff"
                                                placeholder="Enter first name"
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <InputField border="1px solid #9e9d9d"
                                                handleChange={() => {
                                                    console.log("last name")
                                                }}
                                                height="30px"
                                                width="200px"
                                                backgroundColor="#fff"
                                                placeholder="Enter last name"
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="password">Password</label>
                                    <InputField border="1px solid #9e9d9d"
                                                handleChange={() => {
                                                    console.log("password")
                                                }}
                                                height="30px"
                                                width="200px"
                                                backgroundColor="#fff"
                                                placeholder="Enter password"
                                                type="password"
                                                name="password"
                                                id="password"
                                    />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="username">Username</label>
                                    <InputField border="1px solid #9e9d9d"
                                                handleChange={() => {
                                                    console.log("username")
                                                }}
                                                height="30px"
                                                width="200px"
                                                backgroundColor="#fff"
                                                placeholder="Enter username"
                                                type="text"
                                                name="username"
                                                id="username"
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="email">Email</label>
                                    <InputField border="1px solid #9e9d9d"
                                                handleChange={() => {
                                                    console.log("email")
                                                }}
                                                height="30px"
                                                width="200px"
                                                backgroundColor="#fff"
                                                placeholder="Enter email"
                                                type="email"
                                                name="email"
                                                id="email"
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="password2">Confirm Password</label>
                                    <InputField border="1px solid #9e9d9d"
                                                handleChange={() => {
                                                    console.log("confirm password")
                                                }}
                                                height="30px"
                                                width="200px"
                                                backgroundColor="#fff"
                                                placeholder="Re-enter password"
                                                type="password"
                                                name="password2"
                                                id="password2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.divider}>
                        <Divider width="943px"/>
                    </div>
                    <div className={`${styles.body}`}>
                        <div className={styles.left}>
                            <p className={styles.title}>Contact Information</p>
                            <div className={styles.fieldContainer}>
                                <label htmlFor="phone">Phone</label>
                                <InputField border="1px solid #9e9d9d"
                                            handleChange={() => {
                                                console.log("phone")
                                            }}
                                            height="30px"
                                            width="200px"
                                            backgroundColor="#fff"
                                            placeholder="Enter phone number"
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                />
                            </div>
                            <div className={styles.fieldContainer}>
                                <label htmlFor="address">Address</label>
                                <InputField border="1px solid #9e9d9d"
                                            handleChange={() => {
                                                console.log("address")
                                            }}
                                            height="30px"
                                            width="200px"
                                            backgroundColor="#fff"
                                            placeholder="Enter street address"
                                            type="text"
                                            name="address"
                                            id="address"
                                />
                            </div>
                            <div className={styles.fieldContainer}>
                                <label htmlFor="city">City</label>
                                <InputField border="1px solid #9e9d9d"
                                            handleChange={() => {
                                                console.log("city")
                                            }}
                                            height="30px"
                                            width="200px"
                                            backgroundColor="#fff"
                                            placeholder="Enter city"
                                            type="text"
                                            name="city"
                                            id="city"
                                />
                            </div>
                            <div className={styles.fieldContainer}>
                                <label htmlFor="country">Country</label>
                                <InputField border="1px solid #9e9d9d"
                                            handleChange={() => {
                                                console.log("country")
                                            }}
                                            height="30px"
                                            width="200px"
                                            backgroundColor="#fff"
                                            placeholder="Enter country"
                                            type="text"
                                            name="country"
                                            id="country"
                                />
                            </div>
                        </div>
                        <div className={styles.bioContainer}>
                            <div className={styles.fieldContainer}>
                                <label htmlFor="bio">Bio</label>
                                <textarea placeholder="Describe what you do here"
                                          onChange={() => {
                                              console.log("bio")
                                          }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}