import { Server, Socket } from 'socket.io'

import sendToUser from '../lib/send-to-user'

/**
 * Launch fallback
 * If the `/launch` command was entered without an argument,
 * users will see this message.
 * @param arg Unused parameter
 * @param socket The socket object from the client event
 * @param io The server-side Socket.io instance
 */
const launch = (arg: null = null, socket: Socket, io: Server): void => {
  const message: string = `Make sure to enter the link to the application after '/launch'
For example: /launch ${process.env.EXAMPLE_APP}
`

  sendToUser(message, socket, io, null)
}

export default launch
