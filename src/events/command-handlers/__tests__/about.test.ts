'use strict'

import sendToUser from '../../lib/send-to-user'
import about from '../about'

jest.mock('../../lib/send-to-user', () => jest.fn())

describe('`about` function', () => {
  it('should call `sendToUser` with a message, socket, and server', () => {
    const socket: any = {}
    const io: any = {}
    about(null, socket, io)
    expect(sendToUser).toHaveBeenCalledWith(
      expect.any(String),
      socket,
      io,
      null
    )
  })
})
