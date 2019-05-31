import { Server, Socket } from 'socket.io'

import sendToUser from '../lib/send-to-user'

/**
 * See information about the project and development team
 * @exports
 * @function
 * @name about
 * @param arg {null} Unused parameter
 * @param socket {Socket} The socket object from the client event
 * @param io {Server} The server-side Socket.io instance
 */

const about = (arg: null = null, socket: Socket, io: Server): void => {
  const message: string = `a`
  sendToUser(message, socket, io, null)
}

export default about
