export enum Hosters {
  CHALLONGE = "CHALLONGE",
  SMASHGG = "SMASHGG"
}

export interface ITournament {
  id: number;
  userId: number | null;
  hoster: Hosters;
  socketId: string;
  tournamentId: string;
  nickname: string;
  players: any;
  openMatches: any;
  devices: any;
  roomCode: string;
  subdomain: string;
  limit: number;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITournamentMinimum {
  id: number;
  hoster: Hosters;
  nickname: string;
}

export interface ITournamentCreateDTO {
  id: number;
  hoster: Hosters;
  nickname: string;
  tournamentId: string;
  subdomain: string;
}

export interface INewTournamentCreateDTOM {
  id: number;
  hoster: Hosters;
  nickname: string;
  userId: string;
  roomCode: string;
  tournamentId: string;
  subdomain: string;
}
