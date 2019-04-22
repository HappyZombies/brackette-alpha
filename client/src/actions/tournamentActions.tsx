import { TournamentActionTypes } from "./actionTypes";
import { User } from "../reducers/userReducers";
import { authAxios } from "../utils";
import { TOKEN } from "../utils/Constants";
import store from "store";
import { Tournaments } from "../reducers/tournamentReducers";

export interface NewPasswordBody {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export class RetrieveTournaments {
  readonly type: TournamentActionTypes =
    TournamentActionTypes.RETRIEVE_TOURNAMENTS;
  public payload: Tournaments[] | any;
  constructor() {
    this.payload = authAxios.get("/tournaments").then(res => res.data);
  }
}

export type Actions = RetrieveTournaments;
