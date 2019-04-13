import { UserActionTypes } from "../actions/actionTypes";
import { Actions } from "../actions/userActions";
import { User } from "./userReducers";

export interface UserUpdateState {
  pending: boolean;
  error: any;
}

const defaultState: UserUpdateState = {
  pending: false,
  error: null
};

const userReducers = (state = defaultState, action: Actions) => {
  switch (action.type) {
    case UserActionTypes.UPDATE_USER_PENDING: {
      return { ...state, pending: true };
    }
    case UserActionTypes.UPDATE_USER_FULFILLED: {
      return { ...state, pending: false };
    }
    case UserActionTypes.UPDATE_USER_REJECTED: {
      return {
        ...state,
        pending: false,
        error: "Error updating user values."
      };
    }
    case UserActionTypes.UPDATE_USER_PASS_PENDING: {
      return { ...state, pending: true };
    }
    case UserActionTypes.UPDATE_USER_PASS_FULFILLED: {
      return { ...state, pending: false };
    }
    case UserActionTypes.UPDATE_USER_PASS_REJECTED: {
      return {
        ...state,
        pending: false,
        error: "Error updating user password."
      };
    }
    default:
      return state;
  }
};

export default userReducers;
