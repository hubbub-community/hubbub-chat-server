import { Server, Socket } from 'socket.io';

/**
 * Sends a direct message to a single user
 * @function
 * @name sendToUser
 * @param message {string} The message for the user
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 * @param id {TId} The `socket.id` of the recipient if they did not initiate the event
 */

type TId = string | null;

const sendToUser = (
  message: string,
  socket: Socket,
  io: Server,
  id: TId
): void => {
  const payload = message;
  if (id) {
    io.to(id).emit('output', payload);
  } else {
    io.to(socket.id).emit('output', payload);
  }
};

export default sendToUser;
