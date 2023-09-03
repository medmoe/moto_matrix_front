import React, {FormEvent, JSX, useState} from "react";
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
import {propertyLocations, Provider, ProviderType, UserProfile} from "../../../../types/userTypes";
import {API} from "../../../../constants";
import {DASHBOARD_PAGES} from "../../../../types/dashboardTypes";
import {Select} from "../../../select/Select";
import {getUniqueKey} from "../../../../utils/functools";

interface inputFieldType {
    label: string,
    placeholder: string,
    name: string,
    type: string,
    value?: string
}

interface inputFieldValueTypes {
    accountInformation: inputFieldType[];
    contactInformation: inputFieldType[];
}

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
        let updatedData: {
            provider_type?: ProviderType;
            store_logo?: string;
            userprofile: UserProfile;
            store_name?: string;
            number_of_sales?: number;
            cached_average_rating?: number;
            store_description?: string
        };
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

    const inputFieldCommonValues = {
        border: "1px solid #9e9d9d",
        height: "30px",
        backgroundColor: "#fff",
        handleChange: handleChange,
    }

    const inputFieldValues: inputFieldValueTypes = {
        accountInformation: [
            {label: "First name", placeholder: 'Enter first name', name: 'first_name', type: 'text', value: profileData.userprofile.user.first_name},
            {label: "Last name", placeholder: 'Enter last name', name: 'last_name', type: 'text', value: profileData.userprofile.user.last_name},
            {label: "Password", placeholder: "Enter password", name: 'password', type: "password"},
            {label: "Username", placeholder: "Enter username", name: "username", type: "text", value: profileData.userprofile.user.username},
            {label: "Email", placeholder: "Enter email", name: "email", type: "email", value: profileData.userprofile.user.email},
            {label: "Confirm password", placeholder: "Re-enter password", name: 'password2', type: "password"},
        ],
        contactInformation: [
            {label: "Phone", placeholder: 'Enter phone number', name: "phone", type: 'text', value: profileData.userprofile.phone},
            {label: "Address", placeholder: 'Enter street address', name: 'address', type: 'text', value: profileData.userprofile.address},
            {label: "City", placeholder: 'Enter city', name: 'city', type: 'text', value: profileData.userprofile.city},
            {label: "State", placeholder: 'Enter state', name: 'state', type: 'text', value: profileData.userprofile.state},
            {label: "Zip code", placeholder: 'Enter zip code', name: 'zip_code', type: 'text', value: profileData.userprofile.zip_code},
            {label: "country", placeholder: 'Enter country', name: 'country', type: 'text', value: profileData.userprofile.country},
            {label: "Business name", placeholder: 'Enter name', name: 'store_name', type: 'text', value: profileData.store_name}
        ]
    }
    const accountInformationInputFields = inputFieldValues.accountInformation.reduce((acc: JSX.Element[][], {label, ...rest}, idx) => {
        if (idx % 3 === 0) { // Start a new row every 3 elements
            acc.push([]);
        }
        const field = (
            <div className={styles.headerFieldContainer} key={getUniqueKey()}>
                <label htmlFor={rest.name}>{label}</label>
                <InputField {...inputFieldCommonValues} {...rest} />
            </div>
        );
        acc[acc.length - 1].push(field); // Add the field to the last row
        return acc;
    }, []).map(row => <div className={styles.row} key={getUniqueKey()}>{row}</div>)

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


    const [firstContactCol, secondContactCol] = inputFieldValues.contactInformation.reduce((acc: JSX.Element[][], {label, ...rest}, idx: number) => {
        if (idx === 4) { // start new column
            acc.push([]);
        }
        const field = (
            <div className={styles.bodyFieldContainer} key={getUniqueKey()}>
                <label htmlFor={rest.name}>{label}</label>
                <InputField {...inputFieldCommonValues} {...rest} />
            </div>
        );
        acc[acc.length - 1].push(field); // push the field to the current column
        return acc
    }, [[]])

    return (
        <form className={styles.container}>
            {errorMessage && <Alert message={errorMessage} onClose={() => setErrorMessage("")}/>}
            <div className={styles.upperContainer}>
                <UpperBar
                    title="Update Profile"
                    subtitle="Update Profile to Reflect the New You"
                    components={[<Button
                        label="Cancel"
                        width={"20%"}
                        border="1px solid #007BFF"
                        backgroundColor="#FFF"
                        key={getUniqueKey()}
                        handleClick={() => {
                            dispatch(updatePageName(DASHBOARD_PAGES.ACCOUNT))
                        }}
                        color="#007BFF"
                    />,
                        <Button label="Submit"
                                width={"20%"}
                                backgroundColor="#007BFF"
                                color="#fff"
                                key={getUniqueKey()}
                                handleClick={submitForm}
                                border="none" icon={<MaterialIcon icon="send" size={24} color="#fff"/>}/>

                    ]
                    }
                />
            </div>
            <div className={styles.lowerContainer}>
                <div className={`${styles.largeCardContainer} ${styles.text}`}>
                    <div className={styles.wrapper}>
                        <div className={styles.header}>
                            <div className={styles.profileImageContainer}>
                                <div className={styles.uploadContainer}>
                                    <ProfileImage src={providerProfile.userprofile.profile_pic ? providerProfile.userprofile.profile_pic : "#"}
                                                  alt="profile image"
                                                  width="140px" height="140px"/>
                                </div>
                                <div className={styles.fileUpload}>
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
                                {accountInformationInputFields}
                            </div>
                        </div>
                        <div className={styles.divider}>
                            <Divider width="90%"/>
                        </div>
                        <div className={`${styles.body}`}>
                            <div className={styles.col}>
                                <div>
                                    <p className={styles.title}>Contact Information</p>
                                </div>
                                {firstContactCol}
                            </div>
                            <div className={styles.col}>
                                <div className={styles.titleHidden}>
                                    <p className={styles.title}>Contact Information</p>
                                </div>
                                {secondContactCol}
                                <div className={styles.bodyFieldContainer}>
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
                                <div className={styles.bodyFieldContainer}>
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
            </div>
        </form>
    )
}