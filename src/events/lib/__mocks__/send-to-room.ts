import { Socket } from 'socket.io'

const sendToRoom = (message: string, room: string, socket: Socket) => {
  const args = { message, room, socket }
}

export default sendToRoom
