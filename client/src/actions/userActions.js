import { UserActionTypes } from "./actionTypes";
import { User } from "../reducers/userReducers";
import { authAxios } from "../utils";
import { TOKEN } from "../utils/constants";
import store from "store";

export class ValidateUser {
  type = UserActionTypes.VALIDATE_USER;
  payload;
  constructor(jwt) {
    this.payload = authAxios
      .post("/users/validate", { jwt })
      .then(res => res.data);
  }
}
/**
 * Similar to validate user, only this one will not have pending or error states.
 */
export class QuickValidateUser {
  type = UserActionTypes.QUICK_VALIDATE_USER;
  payload;
  constructor(jwt) {
    store.set(TOKEN, jwt);
    this.payload = authAxios
      .post("/users/validate", { jwt })
      .then(res => res.data);
  }
}

export class UpdateUser {
  type = UserActionTypes.UPDATE_USER;
  payload;
  constructor(updatedUserBody) {
    this.payload = authAxios
      .put("/users", updatedUserBody)
      .then(res => res.data);
  }
}
export class UpdateUserPassword {
  type = UserActionTypes.UPDATE_USER_PASS;
  payload;
  constructor(newPasswordBody) {
    this.payload = authAxios
      .put("/users/pass", newPasswordBody)
      .then(res => res.data);
  }
}
