import React from "react";
import styles from "./Profile.module.css";
import {UpperBar} from "../../../upperBar/UpperBar";
import {ProfileImage} from "../../../profileImage/ProfileImage";
import {Rating} from "../../../rating/Rating";
import {Button} from "../../../button/Button";
import {Divider} from "../../../divider/Divider";
import MaterialIcon from 'material-icons-react';
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {updatePageName} from "../../../../features/dashboard/dashboardSlice";
import {selectUserData} from "../../../../features/user/userSlice";
import {DASHBOARD_PAGES} from "../../../../types/types";

interface ProfileProps {
    firstName?: string,
    lastName?: string,
    rating?: number,
    phone?: string,
    address?: string,
    city?: string,
    country?: string,
    email?: string,
    bio?: string,
}

export function Profile({
                            firstName,
                            lastName,
                            rating,
                            phone,
                            address,
                            city,
                            country,
                            email,
                            bio,
                        }: ProfileProps) {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(selectUserData);
    return (
        <div className={styles.container}>
            <div className={styles.upperBar}>
                <UpperBar components={[<Button label="Edit"
                                               height="40px"
                                               width="72px"
                                               backgroundColor="#007bff"
                                               textColor="#fff"
                                               border="none"
                                               handleClick={() => {
                                                   dispatch(updatePageName(DASHBOARD_PAGES.UPDATE_ACCOUNT))
                                               }}
                                               icon={<MaterialIcon icon="edit" size={24} color="#fff"/>}
                />]} left="930px" title="Profile" subtitle="Innovative Trailblazer"/>
            </div>
            <div className={styles.lowerContainer}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.imageNameContainer}>
                            <ProfileImage src={userData.profile_pic ? userData.profile_pic : "#"} alt="Profile image"
                                          width="140px" height="140px"/>
                            <p>{firstName} {lastName}</p>
                        </div>
                        <div className={styles.ratingContainer}>
                            <p>{rating}</p>
                            <Rating rate={rating as number}/>
                        </div>
                    </div>
                    <div className={styles.dividerContainer}>
                        <Divider width="921px"/>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.title}>
                            <p>Contact information</p>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <p>Phone</p>
                                <p>Address</p>
                                <p>City</p>
                                <p>Country</p>
                                <p>E-mail</p>
                                <p>Bio</p>

                            </div>
                            <div className={styles.col}>
                                <p>{phone}</p>
                                <p>{address}</p>
                                <p>{city}</p>
                                <p>{country}</p>
                                <p>{email}</p>
                                <p className={styles.bio}>{bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}