import {TableRows} from "../types/generalTypes";
import {RecentOrder} from "../types/orderTypes";

export const DASHBOARD_CARDS_DATA = [
    ["2.696", "Items in Stock"],
    ["$2.65M", "Inventory Turnover"],
    ["62", "Orders This Week"],
    ["505", "Total Orders"],
]

export const POPULAR_PRODUCTS = [
    [27, "Crankshaft"], [20, "Piston"], [36, "Camshaft"], [10, "Spark Plug"], [25, "Oil Pump"]
]

export const RECENT_ORDERS: TableRows<RecentOrder> = [
    {id: 0, name: "Mohammed abdelghafour bekhouche ", quantity: 100, date: "2023-07-30", status: "Paid"},
    {id: 1, name: "Noah David", quantity: 50, date: "2023-07-29", status: "Paid"},
    {id: 2, name: "Joe Shmoe", quantity: 0, date: "2023-07-28", status: "Pending"},
    {id: 3, name: "Joe Doe", quantity: 200, date: "2023-07-27", status: "Canceled"},
    {id: 4, name: "Xiang Li", quantity: 30, date: "2023-07-26", status: "Paid"},
]
export const INVENTORY_LEVELS_DATA = [
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
