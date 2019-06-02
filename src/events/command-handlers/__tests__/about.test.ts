'use strict'

import sendToUser from '../../lib/send-to-user'
import about from '../about'

jest.mock('../../lib/send-to-user', () => jest.fn())

describe('`about` function', () => {
  it('should call `sendToUser` with a message, socket, server, and null', () => {
    const arg: null = null
    const socket: any = {}
    const io: any = {}
    about(arg, socket, io)
    expect(sendToUser).toHaveBeenCalledWith(
      expect.any(String),
      socket,
      io,
      null
    )
  })

  it('should return `undefined`', () => {
    const socket: any = {}
    const io: any = {}
    const result = about(null, socket, io)
    expect(result).toBeUndefined()
  })
})
