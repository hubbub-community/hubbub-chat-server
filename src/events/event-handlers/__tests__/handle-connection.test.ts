import { lorem } from 'faker'
const { word } = lorem

import handleConnection, { setGreeting } from '../handle-connection'

jest.mock(`../../lib/send-to-user`)
jest.mock(`../../lib/send-to-room`)

describe('`setGreeting` function', () => {
  it('should return a string that includes a given `username`', () => {
    const username = word()
    const result = setGreeting(username)
    expect(result.includes(username)).toBeTruthy()
  })
})

describe('`handleConnection` function', () => {
  const socketId = Math.random().toString()
  const socket: any = { id: socketId, join: jest.fn() }
  const io: any = {}

  xit('should call `sendToUser`', () => {
    //
  })

  xit('should call `sendToRoom`', () => {
    //
  })

  it('should call the `join` method of the socket', async () => {
    handleConnection(socket, io)
    expect(socket.join).toHaveBeenCalledWith('lobby')
  })
})
