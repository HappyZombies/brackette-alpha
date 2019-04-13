import { UserActionTypes } from "../actions/actionTypes";
import { Actions } from "../actions/userActions";

export interface Tokens {
  token: string;
}
export interface User {
  id: number;
  username: string;
  email: string;
  displayName: string;
  facebookKey: string | null;
  challongeKey: string | null;
  smashggKey: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserState {
  user: User | any;
  pending: boolean;
  error: any;
}

const defaultState: UserState = {
  user: null,
  pending: true,
  error: null
};

const userReducers = (state = defaultState, action: Actions) => {
  switch (action.type) {
    case UserActionTypes.VALIDATE_USER_PENDING: {
      return { ...state, pending: true };
    }
    case UserActionTypes.QUICK_VALIDATE_USER_FULFILLED:
    case UserActionTypes.VALIDATE_USER_FULFILLED: {
      return { ...state, user: action.payload, pending: false };
    }
    case UserActionTypes.VALIDATE_USER_REJECTED: {
      return {
        ...state,
        pending: false,
        error: "Error validating the user's credentials."
      };
    }
    default:
      return state;
  }
};

export default userReducers;
