import { Socket, Server } from "socket.io";
import RoomManager, { Type } from "./RoomManager";
import ClientManager from "./ClientManager";
import { rand } from "../../utils";

class Handlers {
  private socketio: Server;
  private socket: Socket;
  private roomManager: RoomManager;
  private clientManager: ClientManager;
  constructor(
    socketio: Server,
    socket: Socket,
    roomManager: RoomManager,
    clientManager: ClientManager
  ) {
    this.socketio = socketio;
    this.socket = socket;
    this.roomManager = roomManager;
    this.clientManager = clientManager;
  }

  async handleJoinRoom(roomCode, socketId: string) {
    let room = await this.roomManager.findRoom(roomCode);
    if (room) {
      this.socket.join(roomCode);
      room = await this.roomManager.addUser(room, {
        name: "Setup " + rand(),
        socketId,
        id: rand(),
        type: Type.OWNER
      });
      this.socketio.in(roomCode).emit("welcome", room);
      return;
    }
    this.socket.emit("room failed", `This room does not exists!`);
  }

  async handleLeavingRoom(roomCode: string, socketId: string) {
    let room = await this.roomManager.findRoom(roomCode);
    let { devices } = room;
    delete room.devices[socketId];
    room = await this.roomManager.updateTournamentDevices(room);
    this.socketio.in(roomCode).emit("update", room);
  }
}

export default Handlers;
