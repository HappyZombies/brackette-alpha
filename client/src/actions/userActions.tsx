import { UserActionTypes } from "./actionTypes";

import {} from "redux-promise-middleware";
import { User } from "../reducers/userReducers";
import axios from "axios";
import { authAxios } from "../utils";
import store from "store";
import { TOKEN } from "../utils/Constants";

export interface NewPasswordBody {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export class ValidateUser {
  readonly type: UserActionTypes = UserActionTypes.VALIDATE_USER;
  public payload: User | any;
  constructor(public jwt: string) {
    this.payload = authAxios
      .post("/users/validate", { jwt })
      .then(res => res.data);
  }
}
/**
 * Similar to validate user, only this one will not have pending or error states.
 */
export class QuickValidateUser {
  readonly type: UserActionTypes = UserActionTypes.QUICK_VALIDATE_USER;
  public payload: User | any;
  constructor(public jwt: string) {
    store.set(TOKEN, jwt);
    this.payload = authAxios
      .post("/users/validate", { jwt })
      .then(res => res.data);
  }
}

export class UpdateUser {
  readonly type: UserActionTypes = UserActionTypes.UPDATE_USER;
  public payload: User | any;
  constructor(public updatedUserBody: any) {
    this.payload = authAxios
      .put("/users/update", updatedUserBody)
      .then(res => res.data);
  }
}
export class UpdateUserPassword {
  readonly type: UserActionTypes = UserActionTypes.UPDATE_USER_PASS;
  public payload: User | any;
  constructor(public newPasswordBody: NewPasswordBody) {
    this.payload = authAxios
      .put("/users/update-password", newPasswordBody)
      .then(res => res.data);
  }
}

export type Actions = ValidateUser | UpdateUser | UpdateUserPassword;
