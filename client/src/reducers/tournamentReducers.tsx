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
  currentTournament: Tournaments | any;
  pending: boolean;
  newTournamentPending: boolean;
  error: any;
}

const defaultState: TournamentStates = {
  availableTournaments: [],
  pending: true,
  currentTournament: null,
  newTournamentPending: false,
  error: null
};

const tournamentReducers = (state = defaultState, action: Actions) => {
  switch (action.type) {
    case TournamentActionTypes.CREATE_TOURNAMENTS_PENDING: {
      return { ...state, newTournamentPending: true };
    }
    case TournamentActionTypes.RETRIEVE_TOURNAMENTS_PENDING: {
      return { ...state, pending: true };
    }
    case TournamentActionTypes.RETRIEVE_TOURNAMENTS_FULFILLED: {
      return { ...state, availableTournaments: action.payload, pending: false };
    }
    case TournamentActionTypes.CREATE_TOURNAMENTS_FULFILLED: {
      return {
        ...state,
        newTournamentPending: false,
        availableTournaments: action.payload.allTournaments
      };
    }
    case TournamentActionTypes.CREATE_TOURNAMENTS_REJECTED:
    case TournamentActionTypes.RETRIEVE_TOURNAMENTS_REJECTED: {
      return {
        ...state,
        pending: false,
        newTournamentPending: false,
        error: "Error getting users tournaments."
      };
    }
    default:
      return state;
  }
};

export default tournamentReducers;
