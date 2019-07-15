import Tournaments from "../../models/Tournaments";

export enum Type {
  TO = "TO",
  DEVICE = "DEVICE",
  OWNER = "OWNER"
}

interface Device {
  type: Type;
  socketId: string;
  id: string;
  name: string;
}

class RoomManager {
  allRooms: Object;
  constructor() {}

  async findRoom(roomCode: string) {
    return await Tournaments.query()
      .where("roomCode", roomCode)
      .first();
  }

  async getAllDevices(tournamentId: string) {
    return await Tournaments.query()
      .findById(tournamentId)
      .returning("devices")
      .first();
  }

  async addUser(tournament: Tournaments, newDevice: Device) {
    if (!tournament.devices) {
      // empty room, set it up
      tournament.devices = {};
    }
    tournament.devices[newDevice.socketId] = newDevice;
    return this.updateTournamentDevices(tournament);
  }

  async updateTournamentDevices(tournament) {
    return await Tournaments.query()
      .patchAndFetchById(tournament.id, { devices: tournament.devices })
      .first();
  }
}

export default RoomManager;
