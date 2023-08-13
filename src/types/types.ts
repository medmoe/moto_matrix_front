// types
export interface Product {
    id: number,
    image: JSX.Element,
    name: string,
    stock: 'In Stock' | 'Out Of Stock'
    make: string,
    model: string,
    supplier: string,
    total: number,
    date: string,
    status: 'New' | 'Used' | 'Refurbished',
}

export interface RecentOrder {
    name: string,
    quantity: number,
    date: string,
    status: 'Paid' | 'Pending' | 'Canceled',
}
export interface User {
    id?: number,
    username?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string,
    password2?: string,
}

export interface UserProfile {
    user: User;
    id?: number;
    profile_pic?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    rating?: number;
    is_provider?: boolean;
    description?: string;
}


export interface Dashboard {
    items?: number;
}

export type TableRow = Product[] | RecentOrder[];

export interface GeneralInfo {
    itemsInStock: string,
    inventoryTurnOver: string,
    ordersThisWeek: string,
    totalOrders: string,
}




// constants
export const API = "http://localhost:8000/";
export const STATUS_COLORS: {[key: string]: string} = {
    "Paid": "#4ECB71",
    "Pending": "#F9d100",
    "Canceled": "#FF0000",
    "New" : "#4Ecb71",
    "Used": "#f9d100",
    "Refurbished": "#FF0000",
}

export const BAR_COLORS: string[] = ["#F94144", "#F3722C","#F8961E", "#F9C74F", "#90BE6D"]