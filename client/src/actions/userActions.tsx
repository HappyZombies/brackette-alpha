import { UserActionTypes } from "./actionTypes";

import {} from "redux-promise-middleware";
import { User } from "../reducers/userReducers";
import axios from "axios";

export class ValidateUser {
  readonly type: UserActionTypes = UserActionTypes.VALIDATE_USER;
  public payload: User | any;
  constructor(public jwt: string) {
    this.payload = axios
      .post(
        "/users/validate",
        { jwt },
        { headers: { Authorization: `Bearer: ${jwt}` } }
      )
      .then(res => res.data);
  }
}

export type Actions = ValidateUser;
