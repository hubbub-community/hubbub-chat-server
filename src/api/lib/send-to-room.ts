import { Socket } from 'socket.io';

import { TRoomName } from '../../global';

/**
 * Sends a message to everyone in the room except the user
 * @function
 * @name sendToRoom
 * @param message {string} The message to be announced
 * @param room {string} The name of the Socket.io room
 * @param socket {object} The socket object from the client event
 */
const sendToRoom = (message: string, room: TRoomName, socket: Socket): void => {
  socket.to(room).emit('output', message);
};

export default sendToRoom;
