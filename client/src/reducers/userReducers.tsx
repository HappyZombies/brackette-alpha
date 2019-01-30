import { UserActionTypes } from "../actions/actionTypes"
import { Actions } from "../actions/userActions";

export interface Tokens {
    token: string;
}
export interface User {
    username: string;
    email: string;
    displayName: string;
    tokens: Tokens;
}

export interface UserState {
    user: User | null;
    jwt: string | null;
    pending: boolean;
    error: any;
}

const defaultState: UserState = {
    jwt: null,
    user: null,
    pending: true,
    error: null
};

const userReducers = (state = defaultState, action: Actions) => {
    switch (action.type) {
        case UserActionTypes.VALIDATE_USER_PENDING: {
            console.log("pending :^(")
            return { ...state, pending: true }
        }
        case UserActionTypes.VALIDATE_USER_FULFILLED: {
            console.log("yay :^)")
            return { ...state, user: action.payload, pending: false }
        }
        case UserActionTypes.VALIDATE_USER_REJECTED: {
            console.log("Rejected :^(")
            return { ...state, pending: false, error: "Error validating the user's credentials." }
        }
        default:
            return state;
    }
};

export default userReducers;
