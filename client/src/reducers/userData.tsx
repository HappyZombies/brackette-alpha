import * as ActionTypes from "../actions/actionTypes";
import { AddTodo } from "../actions/userActions";

const defaultState = {
    numbers: 0
};

const playerData = (state = defaultState, action: AddTodo) => {
    switch (action.type) {
        case ActionTypes.ADD_NUMBER: {
            return { ...state, numbers: action.payload + state.numbers };
        }
        default:
            return state;
    }
};

export default playerData;
