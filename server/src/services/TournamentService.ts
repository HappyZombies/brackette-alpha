import { Service, Inject } from "typedi";
import * as HttpStatus from "http-status-codes";

import { ExpressError, generateRoomCode } from "../utils";
import {
  ITournamentMinimum,
  ITournamentCreateDTO,
  INewTournamentCreateDTOM,
  ITournament
} from "../interfaces/ITournament";

@Service()
class TournamentService {
  constructor(
    @Inject("logger") private logger,
    @Inject("usersModel") private usersModel,
    @Inject("tournamentsModel") private tournamentsModel
  ) {}

  public async findTournamentsByUserId(
    userId: string
  ): Promise<ITournamentMinimum[]> {
    let tournaments;
    try {
      tournaments = await this.tournamentsModel
        .query()
        .column("id", "nickname", "hoster")
        .where("userId", userId);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return tournaments;
  }

  public async findTournamentByIdAndUserId(
    tournamentId: string,
    userId: string
  ): Promise<ITournament> {
    let tournament;
    try {
      tournament = await this.tournamentsModel
        .query()
        .findById(tournamentId)
        .eager("user")
        .modifyEager("user", b => {
          b.column("username");
        })
        .where("userId", userId)
        .first();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    if (!tournament) {
      throw ExpressError(
        "Tournament not found, or you don't have access to view this tournament.",
        HttpStatus.NOT_FOUND
      );
    }
    return tournament;
  }

  public async createNew(
    userId: string,
    tournamentCreateDTO: ITournamentCreateDTO
  ): Promise<{
    tournament: ITournament;
    allTournaments: ITournamentMinimum[];
  }> {
    const newTournamentDTO = {
      ...tournamentCreateDTO
    } as INewTournamentCreateDTOM;
    newTournamentDTO.userId = userId;
    newTournamentDTO.roomCode = generateRoomCode();
    let tournament;
    try {
      tournament = await this.tournamentsModel.query().insert(newTournamentDTO);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    // because the way redux is...we have to return a list of all the users tournaments as well as the new one made
    let allTournaments: ITournamentMinimum[] = null;
    try {
      allTournaments = await this.findTournamentsByUserId(userId);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return { tournament, allTournaments };
  }
}

export default TournamentService;
