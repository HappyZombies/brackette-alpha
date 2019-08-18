import * as HttpStatus from 'http-status-codes';
import { Inject, Service } from 'typedi';

import {
  INewTournamentCreateDTOM,
  ITournament,
  ITournamentCreateDTO,
  ITournamentMinimum,
} from '../interfaces/ITournament';
import { BracketteError, generateRoomCode } from '../utils';

@Service()
class TournamentService {
  constructor(
    @Inject('logger') private logger,
    @Inject('usersModel') private usersModel,
    @Inject('tournamentsModel') private tournamentsModel,
  ) {}

  public async findTournamentsByUserId(
    userId: string,
  ): Promise<ITournamentMinimum[]> {
    let tournaments;
    try {
      tournaments = await this.tournamentsModel
        .query()
        .column('id', 'nickname', 'hoster')
        .where('userId', userId);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return tournaments;
  }

  public async findTournamentByIdAndUserId(
    tournamentId: string,
    userId: string,
  ): Promise<ITournament> {
    let tournament;
    try {
      tournament = await this.tournamentsModel
        .query()
        .findById(tournamentId)
        .eager('user')
        .modifyEager('user', (b) => {
          b.column('username');
        })
        .where('userId', userId)
        .first();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    if (!tournament) {
      throw new BracketteError(
        "Tournament not found, or you don't have access to view this tournament.",
        HttpStatus.NOT_FOUND,
      );
    }
    return tournament;
  }

  public async createNew(
    userId: string,
    tournamentCreateDTO: ITournamentCreateDTO,
  ): Promise<{
    tournament: ITournament;
    allTournaments: ITournamentMinimum[];
  }> {
    const newTournamentDTO = {
      ...tournamentCreateDTO,
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
    // * Some UI / redux issue where both have to be returned...for now.
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
