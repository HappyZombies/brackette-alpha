import { TournamentActionTypes } from "./actionTypes";
import { User } from "../reducers/userReducers";
import { authAxios } from "../utils";
import { TOKEN } from "../utils/constants";
import store from "store";
import { Tournaments } from "../reducers/tournamentReducers";

export class RetrieveTournaments {
  type = TournamentActionTypes.RETRIEVE_TOURNAMENTS;
  payload;
  constructor() {
    this.payload = authAxios.get("/tournaments").then(res => res.data);
  }
}

export class CreateTournament {
  type = TournamentActionTypes.CREATE_TOURNAMENTS;
  payload;
  constructor(body) {
    this.payload = authAxios.post("/tournaments", body).then(res => res.data);
  }
}

export class SelectTournament {
  type = TournamentActionTypes.SELECT_TOURNAMENT;
  payload;
  constructor(id) {
    this.payload = authAxios.get(`/tournaments/${id}`).then(res => res.data);
  }
}
