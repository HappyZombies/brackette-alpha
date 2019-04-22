import { TournamentActionTypes } from "../actions/actionTypes";
import { Actions } from "../actions/tournamentActions";

export enum Hosters {
  CHALLONGE = "CHALLONGE",
  SMASHGG = "SMASHGG"
}

export interface Tournaments {
  id: number;
  nickname: string;
  hosters: Hosters;
}

export interface TournamentStates {
  availableTournaments: Tournaments[] | any;
  pending: boolean;
  error: any;
}

const defaultState: TournamentStates = {
  availableTournaments: [],
  pending: true,
  error: null
};

const tournamentReducers = (state = defaultState, action: Actions) => {
  switch (action.type) {
    case TournamentActionTypes.RETRIEVE_TOURNAMENTS_PENDING: {
      return { ...state, pending: true };
    }
    case TournamentActionTypes.RETRIEVE_TOURNAMENTS_FULFILLED: {
      return { ...state, availableTournaments: action.payload, pending: false };
    }
    case TournamentActionTypes.RETRIEVE_TOURNAMENTS_REJECTED: {
      return {
        ...state,
        pending: false,
        error: "Error getting users tournaments."
      };
    }
    default:
      return state;
  }
};

export default tournamentReducers;
