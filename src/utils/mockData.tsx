import {Product, TableRow} from "../types/types";


export const DASHBOARD_CARDS_DATA = [
    ["2.696", "Items in Stock"],
    ["$2.65M", "Inventory Turnover"],
    ["62", "Orders This Week"],
    ["505", "Total Orders"],
]

export const POPULAR_PRODUCTS = [
    [27, "Crankshaft"], [20, "Piston"], [36, "Camshaft"], [10, "Spark Plug"], [25, "Oil Pump"]
]

export const RECENT_ORDERS: TableRow = [
    {name: "Mohammed abdelghafour bekhouche ", quantity: 100, date: "2023-07-30", status: "Paid"},
    {name: "Noah David", quantity: 50, date: "2023-07-29", status: "Paid"},
    {name: "Joe Shmoe", quantity: 0, date: "2023-07-28", status: "Pending"},
    {name: "Joe Doe", quantity: 200, date: "2023-07-27", status: "Canceled"},
    {name: "Xiang Li", quantity: 30, date: "2023-07-26", status: "Paid"},
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
export const PRODUCTS_LIST: Product[] = [
    {
        id: 1,
        image: <img src='https://picsum.photos/35/' alt="product image"/>,
        name: 'Water Pump',
        stock: 'In Stock',
        make: 'Toyota',
        model: 'Corolla',
        supplier: 'XYZ Auto Parts',
        total: 100,
        date: '07-24-2023',
        status: 'New',
    },
    {
        id: 1,
        image: <img src='https://picsum.photos/35/' alt="product image"/>,
        name: 'Water Pump',
        stock: 'In Stock',
        make: 'Toyota',
        model: 'Corolla',
        supplier: 'XYZ Auto Parts',
        total: 100,
        date: '07-24-2023',
        status: 'Used',
    },
    {
        id: 1,
        image: <img src='https://picsum.photos/35/' alt="product image"/>,
        name: 'Water Pump',
        stock: 'In Stock',
        make: 'Toyota',
        model: 'Corolla',
        supplier: 'XYZ Auto Parts',
        total: 100,
        date: '07-24-2023',
        status: 'New',
    },
    {
        id: 1,
        image: <img src='https://picsum.photos/35/' alt="product image"/>,
        name: 'Water Pump',
        stock: 'In Stock',
        make: 'Toyota',
        model: 'Corolla',
        supplier: 'XYZ Auto Parts',
        total: 100,
        date: '07-24-2023',
        status: 'New',
    },
    {
        id: 1,
        image: <img src='https://picsum.photos/35/' alt="product image"/>,
        name: 'Water Pump',
        stock: 'In Stock',
        make: 'Toyota',
        model: 'Corolla',
        supplier: 'XYZ Auto Parts',
        total: 100,
        date: '07-24-2023',
        status: 'New',
    },
    {
        id: 1,
        image: <img src='https://picsum.photos/35/' alt="product image"/>,
        name: 'Water Pump',
        stock: 'In Stock',
        make: 'Toyota',
        model: 'Corolla',
        supplier: 'XYZ Auto Parts',
        total: 100,
        date: '07-24-2023',
        status: 'Refurbished',
    },
    {
        id: 1,
        image: <img src='https://picsum.photos/35/' alt="product image"/>,
        name: 'Water Pump',
        stock: 'In Stock',
        make: 'Toyota',
        model: 'Corolla',
        supplier: 'XYZ Auto Parts',
        total: 100,
        date: '07-24-2023',
        status: 'Used',
    },
    {
        id: 1,
        image: <img src='https://picsum.photos/35/' alt="product image"/>,
        name: 'Water Pump',
        stock: 'In Stock',
        make: 'Toyota',
        model: 'Corolla',
        supplier: 'XYZ Auto Parts',
        total: 100,
        date: '07-24-2023',
        status: 'New',
    }
]