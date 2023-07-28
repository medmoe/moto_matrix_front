export interface User {
    user_id?: number,
    username: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    password: string,
    password2?: string,
}

export interface UserProfile {
    user: User,
    profile_pic?: string,
    phone?: string,
    address?: string,
    city?: string,
    country?: string,
    rating?: number,
    is_provider?: boolean,
}

export interface GeneralInfo {
    itemsInStock: string,
    inventoryTurnOver: string,
    ordersThisWeek: string,
    totalOrders: string,
}

export const API = "http://localhost:8000/";
export const STATUS_COLORS: {[key: string]: string} = {
    "Paid": "#4ECB71", "Pending": "#F9d100", "Canceled": "#FF0000",
}