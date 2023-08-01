import React from "react";
import styles from "./Profile.module.css";
import {UpperBar} from "../../upperBar/UpperBar";
import {ProfileImage} from "../../profileImage/ProfileImage";
import {Rating} from "../../rating/Rating";
import {Button} from "../../button/Button";
import {Divider} from "../../divider/Divider";
import MaterialIcon from 'material-icons-react';

export function Profile() {
    return (
        <div className={styles.container}>
            <div className={styles.upperBar}>
                <UpperBar components={[<Button label="Edit"
                                               height="40px"
                                               width="72px"
                                               backgroundColor="#007bff"
                                               textColor="#fff"
                                               border="none"
                                               icon={<MaterialIcon icon="edit" size={24} color="#fff"/>}
                />]} left="945px" title="Profile" subtitle="Innovative Trailblazer"/>
            </div>
            <div className={styles.lowerContainer}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.imageNameContainer}>
                            <ProfileImage src="https://picsum.photos/200" alt="Profile image"/>
                            <p>Mohammed Bekhouche</p>
                        </div>
                        <div className={styles.ratingContainer}>
                            <p>4.5</p>
                            <Rating rate={4.5}/>
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
                                <p>+1 929 292 9292</p>
                                <p>929 some street apt 20</p>
                                <p>New York City</p>
                                <p>United States</p>
                                <p>test@test.com</p>
                                <p className={styles.bio}>AutoPro Garage is a reputable auto repair shop that has been providing
                                top-quality services since its establishment in 1998. With a team of highly
                                skilled mechanics and a commitment to customer satisfaction,
                                we have become a trusted name in the automotive industry.
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}