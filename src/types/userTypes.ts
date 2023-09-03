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
    state?: string;
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
    provider_type?: ProviderType;

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

export enum ProviderType {
    Store = 'STORE',
    Individual = 'INDIVIDUAL',
    Junkyard = 'JUNKYARD',
    Wholesaler = 'WHOLESALER',
    Manufacturer = 'MANUFACTURER',
}

// Define a mapping for where each property belongs
export const propertyLocations: { [key: string]: string } = {
    'username': 'user',
    'password': 'user',
    'password2': 'user',
    'first_name': 'user',
    'last_name': 'user',
    'email': 'user',
    'phone': 'userprofile',
    'address': 'userprofile',
    'city': 'userprofile',
    'state': 'userprofile',
    'country': 'userprofile',
    'zip_code': 'userprofile'
};