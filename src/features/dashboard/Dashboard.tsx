import react, {useState} from 'react';
import axios from "axios";
import {API} from '../../types/types';
import {useNavigate} from "react-router-dom";
import {SideMenu} from "../../components/menu/SideMenu";
import {SearchField} from "../../components/searchField/SearchField";
import {Card} from "../../components/card/Card";
import styles from './Dashboard.module.css';
import {GeneralInfo} from "../../types/types";

export function Dashboard() {
    const navigate = useNavigate();
    const mockData: [string, string][] = [
        ["2.696", "Items in Stock"],
        ["$2.65M", "Inventory Turnover"],
        ["62", "Orders This Week"],
        ["505", "Total Orders"],
    ]
    const handleLogout = async () => {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }
        await axios.post(`${API}accounts/logout/`, {}, options)
            .then((res) => {
                navigate("/");
                console.log("success");
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className={styles.container}>
            <div className={styles.sideMenu}>
                <SideMenu/>
            </div>
            <div className={styles.contentWindow}>
                <div className={styles.upperBar}>
                    <div className={styles.searchBar}>
                        <SearchField />
                    </div>
                </div>
                <div className={styles.lowerContainer}>
                    <div className={styles.cardsContainer}>
                        {mockData.map(([amount, description], index) => {
                            return <Card amount={amount} description={description} backgroundColor="#FFFFFF" />
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}