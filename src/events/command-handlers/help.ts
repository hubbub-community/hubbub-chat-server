import { Server, Socket } from 'socket.io'

import sendToUser from '../lib/send-to-user'

const instructions: string = `
${'Chat Commands'}
/about ← See information about the Hubbub projects and development team
/details ← See your name, the room you're in, and a list of other users in your current room
/exit ← Disconnect from the server and exit the program
/help ← This menu
/launch 'url' ← Run the application at 'url'!
/leave ← Return to the chat lobby from within the chat
/list ← See a list of external applications you can run
/lobby ← Reconnect to the chat server
/join 'room' ← Join the ongoing chat in 'room'
/me :D ← Emotes lamely. ':D'
/msg 'user' ← Send a direct message to 'user'
/nick 'username' ← Update your username to 'username'
/room 'name' ← Create and automatically join a room called 'name'\n`

/**
 * Display a list of available commands to the user
 * @param arg Unused parameter
 * @param socket The socket object from the client event
 * @param io The server-side Socket.io instance
 */
const help = (arg: null = null, socket: Socket, io: Server): void => {
  sendToUser(instructions, socket, io, null)
}

export default help
