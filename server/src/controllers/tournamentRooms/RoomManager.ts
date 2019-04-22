import Tournaments from "../../models/Tournaments";

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

  async addUser(tournament: Tournaments, newDevice: any) {
    if (!tournament.devices) {
      // empty room, set it up
      tournament.devices = {};
    }
    tournament.devices[newDevice.id] = newDevice;
    return await Tournaments.query()
      .patchAndFetchById(tournament.id, { devices: tournament.devices })
      .first();
  }
}

export default RoomManager;
