import { listen, Socket } from "socket.io";
import { Server } from "http";
import Handlers from "./handlers";
import RoomManager from "./RoomManager";

export const startSocketio = (app: Server) => {
  const socketio = listen(app);
  // retrieve all tournaments that are not archived, and create a room for each, given the code.
  socketio.on("connection", function(socket: Socket) {
    const handlers = new Handlers(socketio, socket, new RoomManager(), null);
    // once a client has connected, we expect to get a ping from them saying what room they want to join.
    socket.on("enter room", roomId => {
      handlers.handleJoinRoom(roomId);
    });
  });
};
