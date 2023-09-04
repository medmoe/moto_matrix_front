import React from "react";
import styles from "./Profile.module.css";
import {UpperBar} from "../../../../../../components/upperBar/UpperBar";
import {ProfileImage} from "../../../../../../components/profileImage/ProfileImage";
import {Rating} from "../../../../../../components/rating/Rating";
import {Button} from "../../../../../../components/button/Button";
import {Divider} from "../../../../../../components/divider/Divider";
import MaterialIcon from 'material-icons-react';
import {useAppDispatch, useAppSelector} from "../../../../../../hooks";
import {updatePageName} from "../../../../dashboardSlice";
import {selectProviderProfile} from "../../../../../user/activeUserSlice";
import {DASHBOARD_PAGES} from "../../../../../../types/dashboardTypes";

interface ProfileProps {
    firstName?: string,
    lastName?: string,
    email?: string,
    username?: string,
    phone?: string,
    address?: string,
    city?: string,
    state?: string,
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
                            state,
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

    const formatStoreDescription = (description: string): string[] => {
        const sentences: string[] = description.split(". ");
        const paragraphs: string[] = [];
        for (let i: number = 0; i < sentences.length; i += 2) {
            paragraphs.push(sentences.slice(i, i + 2).join('. '));
        }
        return paragraphs;
    }
    return (
        <div className={styles.container}>
            <div className={styles.upperContainer}>
                <UpperBar components={[<Button label="Edit"
                                               backgroundColor="#007bff"
                                               color="#fff"
                                               border="none"
                                               width={"20%"}
                                               key={0}
                                               handleClick={() => {
                                                   dispatch(updatePageName(DASHBOARD_PAGES.UPDATE_ACCOUNT))
                                               }}
                                               icon={<MaterialIcon icon="edit" size={24} color="#fff"
                                               />}
                />]} title="Profile" subtitle="Innovative Trailblazer"/>
            </div>
            <div className={styles.lowerContainer}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.headerLeft}>
                            <div className={styles.profileImageContainer}>
                                <div className={styles.imageNameContainer}>
                                    <ProfileImage src={providerProfile.userprofile.profile_pic ? providerProfile.userprofile.profile_pic : "#"}
                                                  alt="Profile image"
                                                  width="140px"
                                                  height="140px"/>
                                </div>
                                <div className={styles.ratingContainer}>
                                    <p>{cashedAverageRating}</p>
                                    <Rating rate={cashedAverageRating as number}/>
                                </div>
                            </div>
                            <div className={styles.verticalDivider}></div>
                        </div>
                        <div className={styles.headerRight}>
                            <div className={styles.row}>
                                <MaterialIcon icon={"call"} size={35} color={"#ccc"}/>
                                <p>{phone}</p>
                            </div>
                            <div className={styles.row}>
                                <MaterialIcon icon={"location_on"} size={35} color={"#ccc"}/>
                                <p>{address}, {city}, {state}, {zipCode}, {country}.</p>
                            </div>
                            <div className={styles.row}>
                                <MaterialIcon icon={"mail"} size={35} color={"#ccc"}/>
                                <p>{email}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <Divider width="90%"/>
                        <div className={styles.title}>
                            <p>{storeName}</p>
                        </div>
                        <div className={styles.descriptionContainer}>
                            <div className={styles.description}>
                                {providerProfile.store_description && formatStoreDescription(providerProfile.store_description).map((paragraph, idx) => {
                                    return <p key={idx}>{paragraph}</p>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}