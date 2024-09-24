/**
 * Interface for the 'Users' data
 */
export interface UsersEntity {
    id: string | number; // Primary ID
    name: string;
    email: string;
    address: UserAddress;
    isFavorite: boolean;
    phone: string;
}

export interface UserFilters {
    search?: string;
    idParity?: 'even' | 'odd'
}

export interface UserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}
