import { Socket } from 'socket.io';

import { TRoomName } from '../../types/global';

/**
 * Sends a message to everyone in the room except the user
 * @event output Triggered with the message argument
 * @param message The message to be announced
 * @param room The name of the Socket.io room
 * @param socket The socket object from the client event
 */
const sendToRoom = (message: string, room: TRoomName, socket: Socket): void => {
  socket.to(room).emit('output', message);
};

export default sendToRoom;
