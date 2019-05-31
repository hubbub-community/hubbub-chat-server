import chalk from 'chalk'
import { Server, Socket } from 'socket.io'

import { TRoomName, TUsername } from '../../types/global'
import population from '../lib/population'
import sendToRoom from '../lib/send-to-room'
import sendToUser from '../lib/send-to-user'

/**
 * Reassign a username to a custom nickname, if it's not taken
 * @exports
 * @function
 * @name nick
 * @param arg {string} The proposed new username
 * @param socket {Socket} The socket object from the client event
 * @param io {Server} The server-side Socket.io instance
 */
const nick = (arg: string, socket: Socket, io: Server): void => {
  const oldName: TUsername = population.getUsername(socket.id)
  const isTaken: boolean = population.isUsername(arg)

  // Don't allow duplicate usernames
  if (isTaken) {
    const userMessage: string = `The username ${chalk.cyan(
      arg
    )} is not available`
    sendToUser(userMessage, socket, io, null)
  } else {
    population.addUser(socket.id, arg)
    const name: TUsername = chalk.yellow(arg)
    const room: TRoomName = population.getRoom(socket.id)

    // Send to room
    const roomAnnouncement: string = `${chalk.red(
      oldName
    )} has updated their name to ${name}`
    sendToRoom(roomAnnouncement, room, socket)

    // Send to user
    const userMessage: string = `Your username has been changed to ${name}`
    sendToUser(userMessage, socket, io, null)
  }
}

export default nick
