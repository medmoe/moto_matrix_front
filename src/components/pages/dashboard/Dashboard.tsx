import React from "react";
import styles from "./Dashboard.module.css";
import {UpperBar} from "../../upperBar/UpperBar";
import {SearchField} from "../../searchField/SearchField";
import {Card} from "../../card/Card";
import {Description} from "../../description/Description";
import {Area, AreaChart, CartesianGrid, Tooltip} from "recharts";
import {Divider} from "../../divider/Divider";
import {GraphDescriptors} from "../../graphDescriptors/GraphDescriptors";
import {DonutChart} from "../../donutChart/DonutChart";
import {Table} from "../../table/Table";
import {zip} from "../../../utils/functools";
import {BAR_COLORS, TableRow, recentOrdersTableMapping} from "../../../types/types";
import {INVENTORY_LEVELS_DATA, POPULAR_PRODUCTS, DASHBOARD_CARDS_DATA, RECENT_ORDERS} from "../../../utils/mockData";

export function Dashboard() {

    const ret = zip(POPULAR_PRODUCTS, BAR_COLORS);
    return (
        <div className={styles.container}>
            <div className={styles.upperBarContainer}>
                <UpperBar components={[<SearchField/>]} left="635px"/>
            </div>
            <div className={styles.body}>
                <div className={styles.cardsContainer}>
                    {DASHBOARD_CARDS_DATA.map(([amount, description], index) => {
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
                                    data={INVENTORY_LEVELS_DATA}
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
                                                 style={{height: amount, backgroundColor: color}}>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className={styles.popularProductsGraphDescriptors}>
                                    {ret.map(([[amount, name], color], index) => {
                                        return (
                                            <div key={index} style={{height: "20px"}}>
                                                <GraphDescriptors description={name as string} color={color}/>
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
                                <Table data={RECENT_ORDERS} tableColumnsMapping={recentOrdersTableMapping}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}