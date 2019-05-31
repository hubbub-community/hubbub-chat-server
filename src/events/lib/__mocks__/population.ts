import { lorem, random } from 'faker'

import Population from '../population-manager'

const population = new Population()

const socketId1 = random.number().toString()
const username1 = lorem.word()

const socketId2 = random.number().toString()
const username2 = lorem.word()

const socketId3 = random.number().toString()
const username3 = lorem.word()

const room1 = lorem.word()

population.addUser(socketId1, username1)
population.addUser(socketId2, username2)
population.addUser(socketId3, username3)

population.populateRoom(socketId1, room1)
population.populateRoom(socketId2, room1)
population.populateRoom(socketId3, room1)

// A hardcoded version for querying details
const socketId4 = '1'
const username4 = 'Bob'
const room2 = 'lobby'
population.addUser(socketId4, username4)
population.populateRoom(socketId4, room2)

const socketId5 = '2'
const username5 = 'Jane'
const room3 = 'special'
population.addUser(socketId5, username5)
population.populateRoom(socketId4, room3)

export default population
