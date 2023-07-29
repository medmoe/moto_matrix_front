import React, {PureComponent} from "react";
import axios from "axios";
import {API, BAR_COLORS} from '../../types/types';
import styles from './Dashboard.module.css';
import {Card, Description, Divider, DonutChart, GraphDescriptors, SearchField, SideMenu, Table} from "../../components";
import {useNavigate} from "react-router-dom";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import {zip} from "../../utils/functools";

export function Dashboard() {
    const navigate = useNavigate();
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const mockData: [string, string][] = [
        ["2.696", "Items in Stock"],
        ["$2.65M", "Inventory Turnover"],
        ["62", "Orders This Week"],
        ["505", "Total Orders"],
    ]
    let popularProducts: [number, string][] = [
        [27, "Crankshaft"], [20, "Piston"], [36, "Camshaft"], [10, "Spark Plug"], [25, "Oil Pump"]
    ]
    const ret = zip(popularProducts, BAR_COLORS);

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
                        <SearchField/>
                    </div>
                </div>
                <div className={styles.lowerContainer}>
                    <div className={styles.cardsContainer}>
                        {mockData.map(([amount, description], index) => {
                            return <Card key={index}
                                         amount={amount}
                                         description={description}
                                         backgroundColor="#FFFFFF"/>
                        })}
                    </div>
                    <div className={styles.largeCardsContainer}>
                        <div className={styles.row}>
                            <div className={styles.largeCard}>
                                <div className={styles.title}>
                                    <p>Inventory Levels</p>
                                </div>
                                <div className={styles.inventoryLevelDetails}>
                                    <Description title="$20.600" description="Stock Value"/>
                                    <Description title="75%" description="Stock Sold"/>
                                </div>
                                <div className={styles.inventoryLevelChart}>
                                    <AreaChart
                                        width={430}
                                        height={120}
                                        data={data}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <Tooltip/>
                                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8"/>
                                    </AreaChart>
                                </div>
                            </div>
                            <div className={styles.largeCard}>
                                <div className={styles.title}>
                                    <p>Payments</p>
                                </div>
                                <div className={styles.paymentsDetails}>
                                    <Description title="$15.400" description="Recieved"/>
                                    <Divider width="152px"/>
                                    <Description title="$5.200" description="Pending"/>
                                </div>
                                <div className={styles.graphDescriptors}>
                                    <GraphDescriptors description="Recieved" color="#007BFF"/>
                                    <GraphDescriptors description="Pending" color="#54A6Fe"/>
                                </div>
                                <div className={styles.donutChart}>
                                    <DonutChart percentage={60}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.largeCard}>
                                <div className={styles.title}>
                                    <p>Popular Products</p>
                                </div>
                                <div className={styles.popularProductsDetails}>
                                    <div className={styles.bars}>
                                        {ret.map(([[amount, name], color], index) => {
                                            return (
                                                <div key={index}
                                                     className={styles.bar}
                                                     style={{height: 4 * amount, backgroundColor: color}}>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className={styles.popularProductsGraphDescriptors}>
                                        {ret.map(([[amount, name], color], index) => {
                                            return (
                                                <div key={index} style={{height: "20px"}}>
                                                    <GraphDescriptors description={name} color={color}/>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.largeCard}>
                                <div className={styles.title}>
                                    <p>Recent Orders</p>
                                </div>
                                <div className={styles.recentOrdersDetails}>
                                    <Table data={recentOrders["data"]} columns={recentOrders["columns"]}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}