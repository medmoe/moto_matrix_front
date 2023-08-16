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

export interface AutoPartDetail {
    name: string,
    image?: string,
    description: string,
    manufacturer: string,
    price: number,
    stock: number,
    weight: number,
    dimensions: string,
    location: string,
    category: string,
    vehicle_make: string,
    vehicle_model: string,
    vehicle_year: string,
    condition: string,
    OEM_number: string,
    OPC_number: string
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

export type TableRow = AutoPartDetail[] | RecentOrder[];
export type DashboardPageKeys = 'DASHBOARD' | 'INVENTORY' | 'ACCOUNT' | 'UPDATE_ACCOUNT' | 'ADD_PRODUCT';

// Enumerators
export enum Condition {
    New = "NEW",
    Used = "USED",
    Refurbished = "REFURBISHED",
}

export enum AutoPartCategory {
    Engine = "ENGINE",
    Transmission = "TRANSMISSION",
    Suspension = "SUSPENSION",
    Brakes = "BRAKES",
    Electrical = "ELECTRICAL",
    Body = "BODY",
    Interior = "INTERIOR",
    Tires = "TIRES",
    Wheels = "WHEELS",
    Accessories = "ACCESSORIES",
}

export enum ResponseStatusCodes {
    Unauthorized = 401,
    Forbidden = 403,
    BadRequest= 400,
    NotFound = 404
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

export const DASHBOARD_PAGES: Record<DashboardPageKeys, string> = {
    DASHBOARD: 'DASHBOARD',
    INVENTORY: 'INVENTORY',
    ACCOUNT: 'ACCOUNT',
    UPDATE_ACCOUNT: 'UPDATE_ACCOUNT',
    ADD_PRODUCT: 'ADD_PRODUCT',
}

export const PRODUCT_LIST_PAGE_SIZE: number = 8;
