import { Server, Socket } from 'socket.io'

import { IGetDetails, TRoomName, TSocketId, TUsername } from '../../types'
import population from '../lib/population'
import sendToUser from '../lib/send-to-user'

/**
 * Display details to the user including their username,
 * their room, and the users they're with.
 * @param arg Unused parameter
 * @param socket The socket object from the client event
 * @param io The server-side Socket.io instance
 */
const details = (arg: null = null, socket: Socket, io: Server): void => {
  const populationDetails: IGetDetails = population.getDetails()
  const room: TRoomName = population.getRoom(socket.id)
  const username: TUsername = population.getUsername(socket.id)
  const users: string = populationDetails.usernamesPerRoom[room]
    .filter((user: TUsername) => user !== username)
    .map((user: TUsername) => user)
    .join(', ') // This string will look like an array
  const leaderId: TSocketId = population.getLeader(room)
  const leader: TUsername = population.getUsername(leaderId)

  if (populationDetails.userCountPerRoom[room] > 0) {
    const message: string = `
  Your Socket.io client id is ${socket.id}
  Your username is ${username}
  You are one of ${populationDetails.userCountPerRoom[
    room
  ].toString()} users in ${room}
  Other users in the room are: ${users.length > 0 ? users : 'n/a'}
  The leader of your room is ${leader}
  `
    sendToUser(message, socket, io, null)
  }
}

export default details
