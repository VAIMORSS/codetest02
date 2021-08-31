export const GET_DONATIONS_BY_ID = "GET_DONATIONS_BY_ID";
export const GET_USERS = "GET_USERS";
export const REMOVE_DONATION = "RENOVE_DONATIONS";
export const UPDATE_DONATION = "UPDATE_DONATION";
export const CREATE_DONATION = "CREATE_DONATION";

export function getDonationByUserId() {
    return ({ type: GET_DONATIONS_BY_ID });
}

export function getUsers(payload: any) {
    return ({ type: GET_USERS, payload: payload });
}

export function removeDonation() {
    return ({ type: REMOVE_DONATION });
}

export function updateDonation() {
    return ({ type: UPDATE_DONATION });
}

export function createDonation() {
    return ({ type: CREATE_DONATION });
}