import chalk from 'chalk'
import { Server, Socket } from 'socket.io'

import sendToUser from '../lib/send-to-user'

/**
 * Warn the user when they have used an invalid command
 * @exports
 * @function
 * @name fallback
 * @param arg {null} Unused parameter
 * @param socket {Socket} The socket object from the client event
 * @param io {Server} The server-side Socket.io instance
 */
const fallback = (arg: null = null, socket: Socket, io: Server): void => {
  const message: string = `Type ${chalk.cyan(
    '/help'
  )} to see a list of available commands.\n`
  sendToUser(message, socket, io, null)
}

export default fallback
