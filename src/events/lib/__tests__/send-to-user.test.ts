'use strict'

import { lorem } from 'faker'
const { sentence } = lorem
const rootDir = process.cwd()
import sendToUser from '../send-to-user'

describe('`sendToUser` function', () => {
  const to: any = jest.fn()
  const io: any = { to }
  const emit: any = jest.fn()
  to.mockReturnValue({ emit })

  const socket: any = { id: Math.random() }
  const message: string = sentence()
  const id: string = Math.random().toString()

  it('should emit an `output` event with a `message` payload when no `id` argument exists', () => {
    sendToUser(message, socket, io, id)
    expect(emit).toHaveBeenCalledWith('output', message)
    emit.mockClear()
  })

  it('should emit an `output` event with a `message` payload when `id` argument exists', () => {
    sendToUser(message, socket, io, id)
    expect(emit).toHaveBeenCalledWith('output', message)
    emit.mockClear()
  })

  it('should emit a message to the `id` if the `id` argument exists`', () => {
    sendToUser(message, socket, io, id)
    expect(io.to).toHaveBeenCalledWith(id)
    to.mockClear()
  })

  it('should emit a message to the `socket.id` if the `id` argument does not exist`', () => {
    sendToUser(message, socket, io, null)
    expect(io.to).toHaveBeenCalledWith(socket.id)
    to.mockClear()
  })
})
