import {AutoPartDetail} from "./productTypes";

//types
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
    profile_type?: ProfileType;
    id?: number;
    profile_pic?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    zip_code?: string;
}

export interface Provider {
    userprofile: UserProfile;
    store_name?: string;
    store_description?: string;
    store_logo?: string;
    cached_average_rating?: number;
    number_of_sales?: number;
}

export interface Consumer {
    userprofile: UserProfile;
    wishlist?: AutoPartDetail;
    cart?: AutoPartDetail;
    favorite_providers?: Provider;

}

export enum ProfileType {
    Consumer = 'CONSUMER',
    Provider = 'PROVIDER',
}