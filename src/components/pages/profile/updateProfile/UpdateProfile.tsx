import React, {FormEvent, useState} from "react";
import styles from "./UpdateProfile.module.css";
import {UpperBar} from "../../../upperBar/UpperBar";
import {Button} from "../../../button/Button";
import {InputField} from "../../../inputField/InputField";
import {ProfileImage} from "../../../profileImage/ProfileImage";
import {Divider} from "../../../divider/Divider";
import MaterialIcon from "material-icons-react";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {updateActiveIndex, updatePageName} from "../../../../features/dashboard/dashboardSlice";
import {selectUserData, updateUserData} from "../../../../features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {Alert} from "../../../alert/Alert";
import axios from "axios";
import {UserProfile} from "../../../../types/userTypes";
import {API} from "../../../../constants";
import {DASHBOARD_PAGES} from "../../../../types/dashboardTypes";

export function UpdateProfile() {
    const userData = useAppSelector(selectUserData);
    let initState: UserProfile = userData
    const [profileData, setProfileData] = useState(initState);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const UNAUTHORIZED: number = 401;
    const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const handleChange = (event: FormEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement
        const properties = ['username', 'password', 'password2', 'first_name', 'last_name', 'email'];
        if (properties.includes(target.name)) {
            setProfileData({
                ...profileData,
                user: {
                    ...profileData.user,
                    [target.name]: target.value
                }
            })
            return;
        }
        setProfileData({
            ...profileData,
            [target.name]: target.value
        })
    }

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();
        const password = profileData.user.password as string;
        const email = profileData.user.email;
        const options = {headers: {'Content-Type': 'application/json'}, withCredentials: true};
        const {user: {password2, ...restOfUserInfo}, profile_pic, ...restOfDataToSend} = profileData;
        const newDataToSend = {
            ...restOfDataToSend,
            user: restOfUserInfo
        }
        if (password && 1 <= password.length && password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long");
            return;
        }
        if (password && password !== profileData.user.password2) {
            setErrorMessage("Password didn't match!");
            return;
        }
        if (email && !(EMAIL_REGEX.test(profileData.user.email as string))) {
            setErrorMessage("Enter a valid email address")
            return
        }
        if (!profileData.user.username) {
            setErrorMessage("Username cannot be blank");
            return
        }
        await axios.put(`${API}accounts/${userData.user.username}/`, JSON.stringify(newDataToSend), options)
            .then((res) => {
                dispatch(updatePageName(DASHBOARD_PAGES.ACCOUNT));
                dispatch(updateUserData({...res.data, ...res.data.user}))
            })
            .catch((err) => {
                if (err.response.status === UNAUTHORIZED) {
                    navigate("/");
                    dispatch(updateActiveIndex(0));
                } else {
                    setErrorMessage(err.response.data.detail);
                }
            })
    }

    const fileSelectedHandler = async (event: FormEvent) => {
        const target = event.target as HTMLInputElement
        const files = target.files as FileList
        const file = files[0] as File
        const formData = new FormData();
        formData.append('profile_pic', file);
        await axios.put(`${API}accounts/files/${userData.user.username}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
            .then((res) => {
                dispatch(updateUserData({...userData, profile_pic: res.data.file}))
            })
            .catch((err) => {
                if (err.data && err.data.detail) {
                    setErrorMessage(err.data.detail);
                } else {
                    console.log(err);
                }
            })
    }

    return (
        <form>
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
                                              handleClick={() => {
                                                  dispatch(updatePageName(DASHBOARD_PAGES.ACCOUNT));
                                              }}
                                              textColor="#007BFF"/>,
                                      <Button label="Submit"
                                              width="100px"
                                              height="40px"
                                              backgroundColor="#007BFF"
                                              textColor="#fff"
                                              handleClick={submitForm}
                                              border="none" icon={<MaterialIcon icon="send" size={24} color="#fff"/>}/>
                                  ]
                              }
                    />
                </div>
                <div className={styles.lowerContainer}>
                    <div className={`${styles.largeCardContainer} ${styles.text}`}>
                        <div className={styles.header}>
                            <div className={styles.errorBoxContainer}>
                                {errorMessage ?
                                    <Alert message={errorMessage} onClose={() => setErrorMessage("")}/> : null}
                            </div>
                            <div className={styles.profileImageContainer}>
                                <div className={styles.uploadContainer}>
                                    <ProfileImage src={userData.profile_pic ? userData.profile_pic : "#"}
                                                  alt="profile image"
                                                  width="140px" height="140px"/>
                                    <label htmlFor="file-upload" className={styles.customFileUpload}>
                                        <div className={styles.cameraContainer}>
                                            <MaterialIcon icon="photo_camera" size={40} color="#fff"/>
                                        </div>
                                    </label>
                                    <input id="file-upload"
                                           type="file"
                                           onChange={fileSelectedHandler}
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
                                                    handleChange={handleChange}
                                                    height="30px"
                                                    width="200px"
                                                    backgroundColor="#fff"
                                                    placeholder="Enter first name"
                                                    type="text"
                                                    name="first_name"
                                                    id="firstName"
                                                    value={profileData.user.first_name}
                                        />
                                    </div>
                                    <div className={styles.fieldContainer}>
                                        <label htmlFor="lastName">Last Name</label>
                                        <InputField border="1px solid #9e9d9d"
                                                    handleChange={handleChange}
                                                    height="30px"
                                                    width="200px"
                                                    backgroundColor="#fff"
                                                    placeholder="Enter last name"
                                                    type="text"
                                                    name="last_name"
                                                    id="lastName"
                                                    value={profileData.user.last_name}
                                        />
                                    </div>
                                    <div className={styles.fieldContainer}>
                                        <label htmlFor="password">Password</label>
                                        <InputField border="1px solid #9e9d9d"
                                                    handleChange={handleChange}
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
                                                    handleChange={handleChange}
                                                    height="30px"
                                                    width="200px"
                                                    backgroundColor="#fff"
                                                    placeholder="Enter username"
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    value={profileData.user.username}
                                        />
                                    </div>
                                    <div className={styles.fieldContainer}>
                                        <label htmlFor="email">Email</label>
                                        <InputField border="1px solid #9e9d9d"
                                                    handleChange={handleChange}
                                                    height="30px"
                                                    width="200px"
                                                    backgroundColor="#fff"
                                                    placeholder="Enter email"
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={profileData.user.email}
                                        />
                                    </div>
                                    <div className={styles.fieldContainer}>
                                        <label htmlFor="password2">Confirm Password</label>
                                        <InputField border="1px solid #9e9d9d"
                                                    handleChange={handleChange}
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
                                                handleChange={handleChange}
                                                height="30px"
                                                width="200px"
                                                backgroundColor="#fff"
                                                placeholder="Enter phone number"
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                value={profileData.phone}
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="address">Address</label>
                                    <InputField border="1px solid #9e9d9d"
                                                handleChange={handleChange}
                                                height="30px"
                                                width="200px"
                                                backgroundColor="#fff"
                                                placeholder="Enter street address"
                                                type="text"
                                                name="address"
                                                id="address"
                                                value={profileData.address}
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="city">City</label>
                                    <InputField border="1px solid #9e9d9d"
                                                handleChange={handleChange}
                                                height="30px"
                                                width="200px"
                                                backgroundColor="#fff"
                                                placeholder="Enter city"
                                                type="text"
                                                name="city"
                                                id="city"
                                                value={profileData.city}
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="country">Country</label>
                                    <InputField border="1px solid #9e9d9d"
                                                handleChange={handleChange}
                                                height="30px"
                                                width="200px"
                                                backgroundColor="#fff"
                                                placeholder="Enter country"
                                                type="text"
                                                name="country"
                                                id="country"
                                                value={profileData.country}
                                    />
                                </div>
                            </div>
                            <div className={styles.bioContainer}>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="description">Bio</label>
                                    <textarea placeholder="Describe what you do here"
                                              value={profileData.description}
                                              name="description"
                                              onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </form>
    )
}