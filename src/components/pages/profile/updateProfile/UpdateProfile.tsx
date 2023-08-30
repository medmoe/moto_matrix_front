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
import {selectProviderProfile, updateProviderProfile} from "../../../../features/user/activeUserSlice";
import {useNavigate} from "react-router-dom";
import {Alert} from "../../../alert/Alert";
import axios from "axios";
import {propertyLocations, Provider, ProviderType} from "../../../../types/userTypes";
import {API} from "../../../../constants";
import {DASHBOARD_PAGES} from "../../../../types/dashboardTypes";
import {Select} from "../../../select/Select";

export function UpdateProfile() {
    const providerProfile = useAppSelector(selectProviderProfile);
    let initState: Provider = providerProfile
    const [profileData, setProfileData] = useState(initState);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const UNAUTHORIZED: number = 401;
    const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const providerTypes: [string, string][] = Object.entries(ProviderType)

    const handleChange = (event: FormEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement
        const location = propertyLocations[target.name]
        let updatedData = {...profileData};
        switch (location) {
            case 'user':
                updatedData = {
                    ...profileData,
                    userprofile: {
                        ...profileData.userprofile,
                        user: {
                            ...profileData.userprofile.user,
                            [target.name]: target.value
                        }
                    }
                };
                break
            case 'userprofile':
                updatedData = {
                    ...profileData,
                    userprofile: {
                        ...profileData.userprofile,
                        [target.name]: target.value,
                    }
                };
                break
            default:
                updatedData = {
                    ...profileData,
                    [target.name]: target.value,
                };
                break
        }
        setProfileData(updatedData);
    }
    const isValidPassword = (password: string): boolean =>
        !(password && 1 <= password.length && password.length < 8);

    const doPasswordsMatch = (password: string, password2: string): boolean =>
        !(password && password !== password2);

    const isValidEmail = (email: string): boolean =>
        !(email && !EMAIL_REGEX.test(email));

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();

        const {
            userprofile: {
                user: {password, password2, email, username, ...restOfUserInfo},
                profile_pic,
                ...restOfUserProfileInfo
            },
            ...restOfDataToSend
        } = profileData;

        if (password && !isValidPassword(password)) {
            setErrorMessage("Password must be at least 8 characters long");
            return;
        }

        if ((password && !password2) || (!password && password2) || (password && password2 && !doPasswordsMatch(password, password2))) {
            setErrorMessage("Password didn't match!");
            return;
        }

        if (!email || !isValidEmail(email)) {
            setErrorMessage("Enter a valid email address");
            return;
        }

        if (!username) {
            setErrorMessage("Username cannot be blank");
            return;
        }

        const newDataToSend = {
            ...restOfDataToSend,
            userprofile: {
                ...restOfUserProfileInfo,
                user: {
                    username: username,
                    email: email,
                    password: password ? password : undefined,
                    ...restOfUserInfo
                }
            }
        }

        const options = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        };
        await axios.put(
            `${API}accounts/${providerProfile.userprofile.user.username}/`,
            JSON.stringify(newDataToSend),
            options
        )
            .then((res) => {
                dispatch(updatePageName(DASHBOARD_PAGES.ACCOUNT));
                dispatch(updateProviderProfile({...res.data, ...res.data.user}));
            })
            .catch((err) => {
                if (err.response.status === UNAUTHORIZED) {
                    navigate("/");
                    dispatch(updateActiveIndex(0));
                } else {
                    console.log(err);
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
        await axios.put(`${API}accounts/files/${providerProfile.userprofile.user.username}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
            .then((res) => {
                dispatch(updateProviderProfile({
                    ...providerProfile,
                    userprofile: {
                        ...providerProfile.userprofile,
                        profile_pic: res.data.file
                    }
                }))
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
        <div className={styles.container}>
            <form>

                <div>
                    <UpperBar
                        title="Update Profile"
                        subtitle="Update Profile to Reflect the New You"
                        components={
                            [
                                <Button label="Cancel"
                                        border="1px solid #007BFF"
                                        backgroundColor="#FFF"
                                        handleClick={() => {
                                            dispatch(updatePageName(DASHBOARD_PAGES.ACCOUNT));
                                        }}
                                        color="#007BFF"/>,
                                <Button label="Submit"
                                        backgroundColor="#007BFF"
                                        color="#fff"
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
                                    <ProfileImage src={providerProfile.userprofile.profile_pic ? providerProfile.userprofile.profile_pic : "#"}
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
                                                    value={profileData.userprofile.user.first_name}
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
                                                    value={profileData.userprofile.user.last_name}
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
                                                    value={profileData.userprofile.user.username}
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
                                                    value={profileData.userprofile.user.email}
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
                            <div className={styles.col}>
                                <div>
                                    <p className={styles.title}>Contact Information</p>
                                </div>
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
                                                value={profileData.userprofile.phone}
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
                                                value={profileData.userprofile.address}
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
                                                value={profileData.userprofile.city}
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="state">State</label>
                                    <InputField border="1px solid #9e9d9d"
                                                handleChange={handleChange}
                                                height="30px"
                                                width="200px"
                                                backgroundColor="#fff"
                                                placeholder="Enter state"
                                                type="text"
                                                name="state"
                                                id="state"
                                                value={profileData.userprofile.state}
                                    />
                                </div>
                            </div>
                            <div className={styles.col}>
                                <div className={styles.titleHidden}>
                                    <p className={styles.title}>Contact Information</p>
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="zipcode">Zip code</label>
                                    <InputField border="1px solid #9e9d9d"
                                                handleChange={handleChange}
                                                height="30px"
                                                width="200px"
                                                backgroundColor="#fff"
                                                placeholder="Enter zip code"
                                                type="text"
                                                name="zip_code"
                                                id="zipcode"
                                                value={profileData.userprofile.zip_code}
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
                                                value={profileData.userprofile.country}
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="store_name">Business Name</label>
                                    <InputField border="1px solid #9e9d9d"
                                                handleChange={handleChange}
                                                height="30px"
                                                width="200px"
                                                backgroundColor="#fff"
                                                placeholder="Enter name"
                                                type="text"
                                                name="store_name"
                                                id="store_name"
                                                value={profileData.store_name}
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor={"provider_type"}>Select business type</label>
                                    <Select options={providerTypes}
                                            handleChange={handleChange}
                                            currentValue={profileData.provider_type}
                                            name={"provider_type"}/>
                                </div>
                            </div>
                            <div className={styles.col}>
                                <div className={styles.titleHidden}>
                                    <p className={styles.title}>Contact Information</p>
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor="store_description">Bio</label>
                                    <textarea placeholder="Describe what you do here"
                                              value={profileData.store_description}
                                              name="store_description"
                                              onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}