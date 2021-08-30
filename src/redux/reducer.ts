import { GET_DONATIONS_BY_ID, GET_USERS, REMOVE_DONATION, UPDATE_DONATION, CREATE_DONATION } from "./actions";
import { initialState } from "./store";

export function reducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_USERS:
            return state;
        case GET_DONATIONS_BY_ID:
            return state;
        case REMOVE_DONATION:
            return state;
        case UPDATE_DONATION:
            return state;
        case CREATE_DONATION:
            return state;
        default:
            throw new Error();
    }
}