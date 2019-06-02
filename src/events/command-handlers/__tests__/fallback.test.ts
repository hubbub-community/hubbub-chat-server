import sendToUser from '../../lib/send-to-user'
import fallback from '../fallback'

jest.mock('../../lib/send-to-user', () => jest.fn())

describe('`fallback` function', () => {
  it('should call `sendToUser` with a string, Socket, Server, null', () => {
    const socket: any = {}
    const io: any = {}
    fallback(null, socket, io)
    expect(sendToUser).toHaveBeenCalledWith(
      expect.any(String),
      socket,
      io,
      null
    )
  })
})
