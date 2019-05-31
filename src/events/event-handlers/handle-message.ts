import chalk from 'chalk'
import { Socket } from 'socket.io'

import { TRoomName, TUsername } from '../../types/global'
import population from '../lib/population'
import sendToRoom from '../lib/send-to-room'

/**
 * Relay a chat input to the user's room.
 * This function should be expanded to parse emojis,
 * filter for length and spamming, and provide
 * other chat moderation features.
 * @exports
 * @function
 * @name handleMessage
 * @param line {string} The user's public chat message
 * @param socket {Socket} The socket object from the client event
 */
const handleMessage = (line: string, socket: Socket): void => {
  const username: TUsername = population.getUsername(socket.id)
  const room: TRoomName = population.getRoom(socket.id)
  const designator: string = chalk.yellow(`‹${username}›`)
  const message: string = `${designator} ${line}`

  sendToRoom(message, room, socket)
}

export default handleMessage
