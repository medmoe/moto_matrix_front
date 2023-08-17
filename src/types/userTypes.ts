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