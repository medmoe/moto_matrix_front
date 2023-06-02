export interface UserProfile {
    user_id?: number,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    profile_pic: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    rating: number,
}

export interface Provider extends UserProfile {
    provider_type: string,
    description: string,
}

export const API = "http://localhost:8000/";