import { lorem } from 'faker'
const { word, sentence } = lorem

import sendToRoom from '../send-to-room'

describe('`sendToRoom` function', () => {
  const to = jest.fn()
  const socket: any = { to }
  const emit = jest.fn()
  to.mockReturnValue({ emit })
  const room = word()
  const message = sentence()

  it('should emit a message to the `id` if the `id` argument exists`', () => {
    sendToRoom(message, room, socket)
    expect(socket.to).toHaveBeenCalledWith(room)
    to.mockClear()
  })

  it('should emit an `output` event with a `message` payload when no `id` argument exists', () => {
    sendToRoom(message, room, socket)
    expect(emit).toHaveBeenCalledWith('output', message)
    emit.mockClear()
  })
})
