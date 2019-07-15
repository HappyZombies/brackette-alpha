import { listen, Socket } from "socket.io";
import { Server } from "http";
import Handlers from "./handlers";
import RoomManager from "./RoomManager";

// temporary solution,
// this is to keep track of what rooms the clients are in and remove them accordingly from the tournament object.
let clients = {};
export const startSocketio = (app: Server) => {
  const socketio = listen(app);
  // retrieve all tournaments that are not archived, and create a room for each, given the code.
  socketio.on("connection", function(socket: Socket) {
    const handlers = new Handlers(socketio, socket, new RoomManager(), null);
    // once a client has connected, we expect to get a ping from them saying what room they want to join.
    socket.on("enter room", roomId => {
      console.log("Entering room", clients);
      clients[socket.id] = roomId;
      handlers.handleJoinRoom(roomId, socket.id);
    });

    socket.on("disconnect", function() {
      const roomId = clients[socket.id];
      if (roomId) {
        handlers.handleLeavingRoom(roomId, socket.id);
      }
      console.log("A disconnect occured from", socket.id);
    });
  });
};
