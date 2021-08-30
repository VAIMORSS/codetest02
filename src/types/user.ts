export interface userType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface userStoreType {
    users: userType[];
    isLoading: boolean;
    error: any;
}