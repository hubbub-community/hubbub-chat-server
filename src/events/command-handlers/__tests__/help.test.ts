import sendToUser from '../../lib/send-to-user'
import help from '../help'

jest.mock('../../lib/send-to-user', () => jest.fn())

describe('`help` function', () => {
  it('should call `sendToUser` with a string, object, object, null', () => {
    const socket: any = {}
    const io: any = {}
    help(null, socket, io)
    expect(sendToUser).toHaveBeenCalledWith(
      expect.any(String),
      socket,
      io,
      null
    )
  })
})
