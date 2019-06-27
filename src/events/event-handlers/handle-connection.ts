import { hacker } from 'faker'
const { noun } = hacker
import { Server, Socket } from 'socket.io'

import { TUsername } from '../../types'
import sendToRoom from '../lib/send-to-room'
import sendToUser from '../lib/send-to-user'

// This is in-memory storage of the current chat environment
import population from '../lib/population'

/** Set a standard greeting, given a username */
export const setGreeting = (username: TUsername): string => {
  const welcome: string = `Welcome to Hubbub!`
  const main: string = `\n${welcome}\n`
  const usernameMsg: string = `Your username is ${username}\n`
  const help: string = `Type ${'/help'} to see a list of commands.\n`
  const greeting: string = main + usernameMsg + help
  return greeting
}

/***
 * On socket connection, greet the user, add them to the lobby,
 * and announce their presence to the lobby.
 * @param socket The socket object from the client event
 * @param io The server-side Socket.io instance
 ***/
const handleConnection = (socket: Socket, io: Server): void => {
  // Create a random username
  const username: TUsername = `${noun()}-${Math.floor(Math.random() * 1000)}`

  // Add the user to the Lobby and update the population
  const room: string = 'lobby'
  population.addUser(socket.id, username)
  population.populateRoom(socket.id, room)
  socket.join(room)

  // Greet the new user
  const welcome: TUsername = setGreeting(username)
  sendToUser(welcome, socket, io, null)

  // Announce the new user to their room
  const message: string = `${username} joined ${room}`

  sendToRoom(message, room, socket)
}

export default handleConnection
