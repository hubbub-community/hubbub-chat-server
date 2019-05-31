import { Socket } from 'socket.io'
import { TSocketId } from '../../../types/global'

const sendToUser = (
  message: string,
  room: string,
  socket: Socket,
  id: TSocketId
): void => {
  const args = { message, room, socket, id }
}

export default sendToUser
