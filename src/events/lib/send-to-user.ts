import { Server, Socket } from 'socket.io'

import { TSocketId } from '../../types'

/**
 * Sends a direct message to a single user
 * @event output Triggered with the message argument
 * @param message The message for the user
 * @param socket The socket object from the client event
 * @param io The server-side Socket.io instance
 * @param id The `socket.id` of the recipient if they did not initiate the event
 */
const sendToUser = (
  message: string,
  socket: Socket,
  io: Server,
  id: TSocketId
): void => {
  const payload = message
  if (id) {
    io.to(id).emit('output', payload)
  } else {
    io.to(socket.id).emit('output', payload)
  }
}

export default sendToUser
