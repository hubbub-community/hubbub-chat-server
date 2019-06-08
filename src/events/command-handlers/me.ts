import { Server, Socket } from 'socket.io'

import { TRoomName, TUsername } from '../../types/global'
import population from '../lib/population'
import sendToRoom from '../lib/send-to-room'
import sendToUser from '../lib/send-to-user'

/**
 * Emit a user text-emote to their room ::shrugs::
 * @param arg The text-emote
 * @param socket The socket object from the client event
 * @param io The server-side Socket.io instance
 */
const me = (arg: string, socket: Socket, io: Server): void => {
  const room: TRoomName = population.getRoom(socket.id)
  const username: TUsername = population.getUsername(socket.id)
  const emote: string = `[${username}] ${arg}`

  sendToUser(emote, socket, io, socket.id)
  sendToRoom(emote, room, socket)
}

export default me
