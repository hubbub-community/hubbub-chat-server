import chalk from 'chalk'
import { Server, Socket } from 'socket.io'

import {
  IGetDetails,
  TRoomName,
  TSocketId,
  TUsername,
} from '../../types/global'
import population from '../lib/population'
import sendToUser from '../lib/send-to-user'

/**
 * Display details to the user including their username,
 * their room, and the users they're with.
 * @exports
 * @function
 * @name details
 * @param arg {null} Unused parameter
 * @param socket {Socket} The socket object from the client event
 * @param io {Server} The server-side Socket.io instance
 */
const details = (arg: null = null, socket: Socket, io: Server): void => {
  const populationDetails: IGetDetails = population.getDetails()
  const room: TRoomName = population.getRoom(socket.id)
  const username: TUsername = population.getUsername(socket.id)
  const users: string = populationDetails.usernamesPerRoom[room]
    .filter((user: TUsername) => user !== username)
    .map((user: TUsername) => chalk.cyan(user))
    .join(', ') // This string will look like an array
  const leaderId: TSocketId = population.getLeader(room)
  const leader: TUsername = chalk.cyan(population.getUsername(leaderId))

  if (populationDetails.userCountPerRoom[room] > 0) {
    const message: string = `
  Your Socket.io client id is ${chalk.cyan(socket.id)}
  Your username is ${chalk.cyan(username)}
  You are one of ${chalk.cyan(
    populationDetails.userCountPerRoom[room].toString()
  )} users in ${chalk.cyan(room)}
  Other users in the room are: ${users.length > 0 ? users : chalk.cyan('n/a')}
  The leader of your room is ${leader}
  `
    sendToUser(message, socket, io, null)
  }
}

export default details
