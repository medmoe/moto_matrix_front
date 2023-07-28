import react, {useState} from 'react';
import axios from "axios";
import {API} from '../../types/types';
import {useNavigate} from "react-router-dom";
import {SideMenu} from "../../components/menu/SideMenu";
import {SearchField} from "../../components/searchField/SearchField";
import {Card} from "../../components/card/Card";
import styles from './Dashboard.module.css';
import {GeneralInfo} from "../../types/types";
import {DonutChart} from "../../components/donutChart/DonutChart";
import {Description} from "../../components/description/Description";
import {Divider} from "../../components/divider/Divider";
import {GraphDescriptors} from "../../components/graphDescriptors/GraphDescriptors";
import {Table} from "../../components/table/Table";

export function Dashboard() {
    const navigate = useNavigate();
    const mockData: [string, string][] = [
        ["2.696", "Items in Stock"],
        ["$2.65M", "Inventory Turnover"],
        ["62", "Orders This Week"],
        ["505", "Total Orders"],
    ]
    const popularProducts: [number, string][] = [
        [27, "Crankshaft"], [20, "Piston"], [36, "Camshaft"], [10, "Spark Plug"], [25, "Oil Pump"]
    ]
    const recentOrders = {
        "data": [
            {Name: "Mohammed Bekhouche Abdelghafour", Quantity: 100, Date: "2023-07-30", Status: "Paid"},
            {Name: "Noah David", Quantity: 50, Date: "2023-07-29", Status: "Paid"},
            {Name: "Joe Shmoe", Quantity: 0, Date: "2023-07-28", Status: "Pending"},
            {Name: "Joe Doe", Quantity: 200, Date: "2023-07-27", Status: "Canceled"},
            {Name: "Xiang Li", Quantity: 30, Date: "2023-07-26", Status: "Paid"},
        ],
        "columns": [
            "Name", "Quantity", "Date", "Status"
        ]
    }
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
                            return <Card amount={amount} description={description} backgroundColor="#FFFFFF"/>
                        })}
                    </div>
                    <div className={styles.largeCardsContainer}>
                        <div className={styles.row}>
                            <div className={styles.largeCard}>
                                <div className={styles.title}>
                                    <p>Inventory Levels</p>
                                </div>
                                <div className={styles.inventoryLevelDetails}>
                                    <Description title="$20.600" description="Stock Value" />
                                    <Description title="75%" description="Stock Sold" />
                                </div>
                            </div>
                            <div className={styles.largeCard}>
                                <div className={styles.title}>
                                    <p>Payments</p>
                                </div>
                                <div className={styles.paymentsDetails}>
                                    <Description title="$15.400" description="Recieved" />
                                    <Divider width="152px" />
                                    <Description title="$5.200" description="Pending" />
                                </div>
                                <div className={styles.graphDescriptors}>
                                    <GraphDescriptors description="Recieved" color="#007BFF" />
                                    <GraphDescriptors description="Pending" color="#54A6Fe" />
                                </div>
                                <div className={styles.donutChart}>
                                    <DonutChart percentage={60} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.largeCard}>
                                <div className={styles.title}>
                                    <p>Popular Products</p>
                                </div>
                            </div>
                            <div className={styles.largeCard}>
                                <div className={styles.title}>
                                    <p>Recent Orders</p>
                                </div>
                                <div className={styles.recentOrdersDetails}>
                                    <Table data={recentOrders["data"]} columns={recentOrders["columns"]} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}