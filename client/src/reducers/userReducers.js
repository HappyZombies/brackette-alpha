import { UserActionTypes } from "../actions/actionTypes";
import { Actions } from "../actions/userActions";

const defaultState = {
  user: null,
  pending: true,
  error: null
};

const userReducers = (state = defaultState, action) => {
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
