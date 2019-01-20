import * as ActionTypes from "./actionTypes";

export class AddTodo {
    readonly type = ActionTypes.ADD_NUMBER;
    constructor(public payload: number) { }
}

