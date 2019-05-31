import { Socket } from 'socket.io'

import { TRoomName } from '../../types/global'
import population from '../lib/population'

/**
 * Removes the user from the population memory pool
 * and performs other cleanup
 * @exports
 * @function
 * @name handleDisconnect
 * @param socket {Socket} The socket object from the client event
 */
const handleDisconnect = (socket: Socket): void => {
  try {
    const room: TRoomName = population.getRoom(socket.id)
    population.depopulateRoom(socket.id, room)
    population.deleteUser(socket.id)
    socket.leave(room)
    console.log(`${socket.id} disconnected...`)
  } catch (err) {
    console.error(err)
  }
}

export default handleDisconnect
