// tslint:disable-next-line:no-reference
/// <reference path="../../global.d.ts" />

/**
 * Sends a message to everyone in the room except the user
 * @function
 * @name sendToRoom
 * @param message {string} The message to be announced
 * @param room {string} The name of the Socket.io room
 * @param socket {object} The socket object from the client event
 */
const sendToRoom = (message: string, room: TRoomName, socket: any): void => {
  const payload = message;
  socket.to(room).emit('output', payload);
};

export default sendToRoom;
