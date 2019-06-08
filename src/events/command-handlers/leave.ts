import { Server, Socket } from 'socket.io'

import { TRoomName, TSocketId, TUsername } from '../../types/global'
import population from '../lib/population'
import sendToRoom from '../lib/send-to-room'
import sendToUser from '../lib/send-to-user'

/**
 * Move a user from a room to the Lobby
 * @param arg Unused parameter
 * @param socket The socket object from the client event
 * @param io The server-side Socket.io instance
 */
const leave = (arg: null = null, socket: Socket, io: Server): void => {
  const username = population.getUsername(socket.id)

  // Move the user from room to the Lobby
  const oldRoom: TRoomName = population.getRoom(socket.id)
  const newRoom: TRoomName = 'lobby'

  if (typeof oldRoom === 'string' && oldRoom !== newRoom) {
    population.moveUser(socket.id, oldRoom, newRoom)

    // Socket.io handling
    socket.leave(oldRoom)
    socket.join(newRoom)

    // Send a message to the user
    const message: string = `You have left ${oldRoom} and joined ${newRoom}`
    sendToUser(message, socket, io, null)

    // Send a message to the room they're leaving
    const leaderId: TSocketId = population.getLeader(oldRoom)
    const leader: TUsername = population.getUsername(leaderId)
    const oldRoomMessage: string = `${username} has left ${oldRoom} and joined ${newRoom}
The leader of your room is ${leader}`

    sendToRoom(oldRoomMessage, oldRoom, socket)

    // Send a message to their new room
    const newRoomMessage: string = `${username} has joined you in ${newRoom}`

    sendToRoom(newRoomMessage, newRoom, socket)
  } else {
    // Send a message to the user
    const message: string = `You are already in ${newRoom}`
    sendToUser(message, socket, io, null)
  }
}

export default leave
