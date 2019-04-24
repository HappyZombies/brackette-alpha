import { TournamentActionTypes } from "./actionTypes";
import { User } from "../reducers/userReducers";
import { authAxios } from "../utils";
import { TOKEN } from "../utils/Constants";
import store from "store";
import { Tournaments } from "../reducers/tournamentReducers";

export class RetrieveTournaments {
  readonly type: TournamentActionTypes =
    TournamentActionTypes.RETRIEVE_TOURNAMENTS;
  public payload: Tournaments[] | any;
  constructor() {
    this.payload = authAxios.get("/tournaments").then(res => res.data);
  }
}

export class CreateTournament {
  readonly type: TournamentActionTypes =
    TournamentActionTypes.CREATE_TOURNAMENTS;
  public payload: Tournaments[] | any;
  constructor(body: any) {
    this.payload = authAxios.post("/tournaments", body).then(res => res.data);
  }
}

export class SelectTournament {
  readonly type: TournamentActionTypes =
    TournamentActionTypes.SELECT_TOURNAMENT;
  public payload: Tournaments[] | any;
  constructor(id: string) {
    this.payload = authAxios.get(`/tournaments/${id}`).then(res => res.data);
  }
}

export type Actions = RetrieveTournaments;
