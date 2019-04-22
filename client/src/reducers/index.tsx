import { combineReducers } from "redux";

import userReducers from "./userReducers";
import userUpdateReducers from "./userUpdateReducers";
import tournamentReducers from "./tournamentReducers";

export default combineReducers({
  user: userReducers,
  userUpdate: userUpdateReducers,
  tournaments: tournamentReducers
});
