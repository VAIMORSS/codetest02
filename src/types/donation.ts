export interface donationType {
    id: string;
    userId: string;
    amount: number;
    tip: number;
}

export interface donationStoreType {
    donaitions: donationType[];
    isLoading: boolean;
    error: any;
}

export enum FORM_TYPE {
    UPDATE,
    ADD,
}

export interface DonationCardType {
    id: string;
    amount: number;
    tip: number;
}
