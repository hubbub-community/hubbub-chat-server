import sendToUser from '../../lib/send-to-user'
import details from '../details'

jest.mock('../../lib/send-to-user', () => jest.fn())
jest.mock('../../lib/population')

describe('`details` function', () => {
  it('should call `sendToUser` with a string, socket, server', () => {
    const socket: any = { id: '1' } // Must match the population mock
    const io: any = {}

    details(null, socket, io)
    expect(sendToUser).toHaveBeenCalledWith(
      expect.any(String),
      socket,
      io,
      null
    )
  })
})
