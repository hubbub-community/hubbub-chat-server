/**
 * v1 Event Controllers
 * @module api/v1.events
 */

import { Server, Socket } from 'socket.io'

import handleConnection from './event-handlers/handle-connection'
import handleDisconnect from './event-handlers/handle-disconnect'
import handleInput from './event-handlers/handle-input'

/**
 * The Socket.io server entry point
 * @event connection Triggered on client connection
 * @event input Triggered by input from the client
 * @event disconnect Triggered when the client disconnects
 * @param io The server-side Socket.io instance
 */
const events = (io: Server): void => {
  io.on(
    'connection',
    (socket: Socket): void => {
      console.log(`Socket connected with id ${socket.id}...`)

      handleConnection(socket, io)

      socket.on('input', (line: string): void => handleInput(line, socket, io))
      socket.on('disconnect', (): void => handleDisconnect(socket))
    }
  )
}

export default events
