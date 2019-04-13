import { combineReducers } from "redux";

import userReducers from "./userReducers";
import userUpdateReducers from "./userUpdateReducers";

export default combineReducers({
  user: userReducers,
  userUpdate: userUpdateReducers
});
