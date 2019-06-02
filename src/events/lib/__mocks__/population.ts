import { lorem, random } from 'faker'

import { TRoomName, TSocketId, TUsername } from '../../../types/global'
import Population from '../population-manager'

const population: Population = new Population()

const socketId1: TSocketId = random.number().toString()
const username1: TUsername = lorem.word()

const socketId2: TSocketId = random.number().toString()
const username2: TUsername = lorem.word()

const socketId3: TSocketId = random.number().toString()
const username3: TUsername = lorem.word()

const room1: TRoomName = lorem.word()

population.addUser(socketId1, username1)
population.addUser(socketId2, username2)
population.addUser(socketId3, username3)

population.populateRoom(socketId1, room1)
population.populateRoom(socketId2, room1)
population.populateRoom(socketId3, room1)

// A hardcoded version for querying details
const socketId4: TSocketId = '1'
const username4: TUsername = 'Bob'
const room2: TRoomName = 'lobby'
population.addUser(socketId4, username4)
population.populateRoom(socketId4, room2)

const socketId5: TSocketId = '2'
const username5: TUsername = 'Jane'
const room3: TRoomName = 'special'
population.addUser(socketId5, username5)
population.populateRoom(socketId4, room3)

export default population
