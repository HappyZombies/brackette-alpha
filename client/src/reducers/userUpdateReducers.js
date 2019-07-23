import { UserActionTypes } from "../actions/actionTypes";

const defaultState = {
  pending: false,
  error: null
};

const userReducers = (state = defaultState, action) => {
  switch (action.type) {
    case UserActionTypes.UPDATE_USER_PASS_PENDING:
    case UserActionTypes.UPDATE_USER_PENDING: {
      return { ...state, pending: true, error: null };
    }
    case UserActionTypes.UPDATE_USER_PASS_FULFILLED:
    case UserActionTypes.UPDATE_USER_FULFILLED: {
      return { ...state, pending: false };
    }
    case UserActionTypes.UPDATE_USER_PASS_REJECTED:
    case UserActionTypes.UPDATE_USER_REJECTED: {
      return {
        ...state,
        pending: false,
        error: action.payload.response.data.message
      };
    }
    default:
      return state;
  }
};

export default userReducers;
