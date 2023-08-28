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
import {selectProviderProfile} from "../../../../features/user/activeUserSlice";
import {DASHBOARD_PAGES} from "../../../../types/dashboardTypes";

interface ProfileProps {
    firstName?: string,
    lastName?: string,
    email?: string,
    username?: string,
    phone?: string,
    address?: string,
    city?: string,
    country?: string,
    zipCode?: string,
    storeDescription?: string,
    storeName?: string,
    storeLogo?: string,
    cashedAverageRating?: number,
    numberOfSales?: number,
}

export function Profile({
                            firstName,
                            lastName,
                            email,
                            username,
                            phone,
                            address,
                            city,
                            country,
                            zipCode,
                            storeDescription,
                            storeName,
                            storeLogo,
                            cashedAverageRating,
                            numberOfSales
                        }: ProfileProps) {
    const dispatch = useAppDispatch()
    const providerProfile = useAppSelector(selectProviderProfile);
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
                            <ProfileImage src={providerProfile.userprofile.profile_pic ? providerProfile.userprofile.profile_pic : "#"}
                                          alt="Profile image"
                                          width="140px"
                                          height="140px"/>
                            <p>{firstName} {lastName}</p>
                        </div>
                        <div className={styles.ratingContainer}>
                            <p>{cashedAverageRating}</p>
                            <Rating rate={cashedAverageRating as number}/>
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
                                <p>Name</p>
                                <p>Phone</p>
                                <p>Address</p>
                                <p>City</p>
                                <p>Country</p>
                                <p>Zip code</p>
                                <p>E-mail</p>
                                <p>Description</p>
                                <p>Username</p>
                                <p>Store Logo</p>
                                <p>Number of sales</p>

                            </div>
                            <div className={styles.col}>
                                <p>{storeName}</p>
                                <p>{phone}</p>
                                <p>{address}</p>
                                <p>{city}</p>
                                <p>{country}</p>
                                <p>{zipCode}</p>
                                <p>{email}</p>
                                <p className={styles.bio}>{storeDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}