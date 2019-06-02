import { lorem } from 'faker'
const { word } = lorem

import { TRoomName } from '../../../types/global'
import population from '../../lib/population'
import sendToUser from '../../lib/send-to-user'
import join from '../join'

// const { sendToRoom } = require('../../../../src/api/lib/send-to-room.js');

jest.mock('../../lib/send-to-user', () => jest.fn())
jest.mock('../../lib/send-to-room', () => jest.fn())
jest.mock('../../lib/population')

const moveUser = jest.spyOn(population, 'moveUser')

// arg, socket, io
describe('`join` function', () => {
  it('should send a message to the user if the room does not exist', () => {
    const socket: any = { id: '1' } // Must match the population mock
    const io: any = {}
    const room: TRoomName = word() // assuming this room does not exist
    join(room, socket, io)
    expect(sendToUser).toHaveBeenCalledWith(
      expect.any(String),
      socket,
      io,
      null
    )
  })

  it('should send a message to the user if they are already in the target room', () => {
    const socket: any = { id: '1' } // Must match the population mock
    const io: any = {}
    const room: TRoomName = 'lobby' // Must match the population mock
    join(room, socket, io)
    expect(sendToUser).toHaveBeenCalledWith(
      expect.any(String),
      socket,
      io,
      null
    )
  })

  xit('should move the user to the new room if the move is viable', () => {
    // Need to update wiring of sendToRoom mock to get this to work
    const socket: any = { id: '1', leave: jest.fn(), join: jest.fn() } // Must match the population mock
    const io: any = {}

    // Matches mocks
    const oldRoom: TRoomName = 'special'
    const newRoom: TRoomName = 'special'

    join(newRoom, socket, io)
    expect(moveUser).toHaveBeenCalledWith(socket.id, oldRoom, newRoom)
    expect(socket.join).toHaveBeenCalledWith(newRoom)
    expect(socket.leave).toHaveBeenCalledWith(oldRoom)
    expect(population.rooms.special.users.includes(socket.id)).toBeTruthy()
  })

  xit('should send a message to the new room if the move is viable', () => {
    //
  })

  xit('should send a message to the user if the move is viable', () => {
    //
  })
})
