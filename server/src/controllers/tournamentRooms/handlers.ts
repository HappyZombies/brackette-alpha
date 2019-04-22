import { Socket, Server } from "socket.io";
import RoomManager from "./RoomManager";
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

  async handleJoinRoom(roomCode) {
    let room = await this.roomManager.findRoom(roomCode);
    if (room) {
      this.socket.join(roomCode);
      // dummy date below
      room = await this.roomManager.addUser(room, {
        name: "Setup 1",
        id: rand()
      });
      this.socketio.in(roomCode).emit("welcome", room);
      return;
    }
    this.socket.emit("room failed", `This room does not exists!`);
  }
}

export default Handlers;
