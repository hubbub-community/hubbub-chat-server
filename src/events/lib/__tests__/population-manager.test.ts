import * as faker from 'faker'

import * as t from '../../../types'

import Population from '../population-manager'

let p: Population

beforeEach(() => {
  p = new Population()
})

describe('`Population` class', () => {
  describe('`addUser` method', () => {
    it('should add a `socketId` and `username` to `this.users`', () => {
      const socketId: t.TSocketId = faker.random.number().toString()
      const username: t.TUsername = faker.random.word()
      p.addUser(socketId, username)

      const receivedKey: t.TSocketId = Object.keys(p.users)[0]
      const expectedKey: t.TSocketId = socketId.toString()
      expect(receivedKey).toEqual(expectedKey)

      const receivedValue: t.TSocketId = p.users[socketId]
      const expectedValue: t.TSocketId = username
      expect(receivedValue).toEqual(expectedValue)
    })
  })

  describe('`populateRoom` method', () => {
    it('should create the room if the room does not exist', () => {
      const room: t.TRoomName = faker.random.word()
      const user: t.TUsername = faker.random.number().toString()
      p.populateRoom(user, room)
      const rooms: t.IRooms = p.rooms
      const result: t.IRoom = rooms[room]
      const expected: t.IRoom = { leader: user, users: [user] }
      expect(result).toEqual(expected)
    })

    it('should add a user to a room if the room does not exist', () => {
      const rooms: t.IRooms = p.rooms
      const empty: object = {}
      const room: t.TRoomName = faker.random.word()
      const user: t.TUsername = faker.random.number().toString()
      expect(rooms).toEqual(empty)
      p.populateRoom(user, room)
      const roomName: t.TRoomName = Object.keys(rooms)[0]
      expect(roomName).toBe(room)
      const expected: t.IRoom = { leader: user, users: [user] }
      expect(rooms[room]).toEqual(expected)
      expect(rooms[room].users).toEqual(expect.arrayContaining([user]))
    })

    it('should set the new user as the `leader`', () => {
      const rooms: t.IRooms = p.rooms
      const room: t.TRoomName = faker.random.word()
      const user: t.TUsername = faker.random.number().toString()
      p.populateRoom(user, room)
      const expected: t.TUsername = user
      expect(rooms[room].leader).toEqual(expected)
    })

    it('should do nothing if the user is already in the room', () => {
      const room: t.TRoomName = faker.random.word()
      const user: t.TUsername = faker.random.number().toString()
      p.populateRoom(user, room)
    })
  })

  describe('`depopulateRoom` method', () => {
    let room: t.TRoomName
    let rooms: t.IRooms
    let username1: t.TUsername
    let username2: t.TUsername

    beforeEach(() => {
      rooms = p.rooms
      room = faker.random.word()
      username1 = faker.random.number().toString()
      username2 = faker.random.number().toString()
      p.populateRoom(username1, room)
      p.populateRoom(username2, room)
    })

    it('should remove a user from a room', () => {
      p.depopulateRoom(username2, room)
      const expected: t.IRoom = { leader: username1, users: [username1] }
      expect(rooms[room]).toEqual(expected)
    })

    it('should delete the room if it no longer exists', () => {
      p.depopulateRoom(username1, room)
      p.depopulateRoom(username2, room)
      expect(rooms[room]).toBeUndefined()
    })

    it('should assign the `leader` property to the person who has been there longest if the room still exists', () => {
      p.depopulateRoom(username1, room)
      const expected = { leader: username2, users: [username2] }
      expect(rooms[room]).toEqual(expected)
    })

    it('should do nothing if the user is not in the room', () => {
      const socketId3: t.TUsername = faker.random.number().toString()
      const copy: t.IRoom = Object.assign({}, rooms[room])
      p.depopulateRoom(socketId3, room)
      expect(copy.users).toEqual(rooms[room].users)
      expect(copy.leader).toEqual(rooms[room].leader)
    })

    it('should do nothing if the room does not exist', () => {
      p.depopulateRoom(username1, room)
      p.depopulateRoom(username2, room)
      expect(rooms.room).toBeUndefined()
    })
  })

  describe('`details` method', () => {
    let room1: t.TRoomName
    let room2: t.TRoomName

    let socketId1: t.TSocketId
    let username1: t.TUsername
    let socketId2: t.TSocketId
    let username2: t.TUsername
    let socketId3: t.TSocketId
    let username3: t.TUsername

    beforeEach(() => {
      room1 = faker.random.word()
      room2 = faker.random.word()
      socketId1 = faker.random.number().toString()
      username1 = faker.random.word()
      socketId2 = faker.random.number().toString()
      username2 = faker.random.word()
      socketId3 = faker.random.number().toString()
      username3 = faker.random.word()

      p.addUser(socketId1, username1)
      p.addUser(socketId2, username2)
      p.addUser(socketId3, username3)
      p.populateRoom(socketId1, room1)
      p.populateRoom(socketId2, room2)
      p.populateRoom(socketId3, room2)
    })

    describe('`roomNames` property', () => {
      it('should return an array of `this.rooms` keys', () => {
        const details: t.IGetDetails = p.getDetails()
        expect(details.roomNames).toEqual(
          expect.arrayContaining([room1, room2])
        )
      })
    })

    describe('`totalRooms` property', () => {
      it('should return a number equal to the number of `this.rooms` keys', () => {
        // Two rooms to start
        const details: t.IGetDetails = p.getDetails()
        expect(details.totalRooms).toBe(2)

        // Add a user to another room and expect 3 total rooms
        const socketId: t.TSocketId = faker.random.number().toString()
        const username: t.TUsername = faker.random.word()
        p.addUser(socketId, username)
        const room: t.TRoomName = faker.random.word()
        p.populateRoom(socketId, room)
        const newDetails: t.IGetDetails = p.getDetails()
        expect(newDetails.totalRooms).toBe(3)
      })
    })

    describe('`totalUsers` property', () => {
      it('should return a number equal to the number of `this.users` keys', () => {
        const details: t.IGetDetails = p.getDetails()
        expect(details.totalUsers).toBe(3)

        const socketId: t.TSocketId = faker.random.number().toString()
        const username: t.TUsername = faker.random.word()
        p.addUser(socketId, username)

        const newDetails: t.IGetDetails = p.getDetails()
        expect(newDetails.totalUsers).toBe(4)
      })
    })

    describe('`userCountPerRoom` property', () => {
      it('should have the same number of keys as there are rooms', () => {
        const roomCount: t.TRoomCount = 2
        const details: t.IGetDetails = p.getDetails()
        const keys = Object.keys(details.userCountPerRoom).length
        expect(keys).toBe(roomCount)
      })

      it('should have the correct number of users in each key-value array', () => {
        const d: Population = new Population()
        d.addUser(socketId1, username1)
        d.addUser(socketId2, username2)
        d.populateRoom(socketId1, room1)
        d.populateRoom(socketId2, room1)
        const { userCountPerRoom } = d.getDetails()
        let count: t.TUserCount = 2
        expect(userCountPerRoom[room1]).toBe(count)

        d.addUser(socketId3, username3)
        d.populateRoom(socketId3, room1)

        const ucpr: t.IUserCountPerRoom = d.getDetails().userCountPerRoom

        count++
        expect(ucpr[room1]).toBe(count)
      })
    })

    describe('`usernamesPerRoom` property', () => {
      it('should have the correct users in each key-value array', () => {
        const e = new Population()
        e.addUser(socketId1, username1)
        e.addUser(socketId2, username2)
        e.populateRoom(socketId1, room1)
        e.populateRoom(socketId2, room1)
        const { usernamesPerRoom } = e.getDetails()
        const array = [username1, username2]
        expect(usernamesPerRoom[room1]).toEqual(expect.arrayContaining(array))

        e.addUser(socketId3, username3)
        e.populateRoom(socketId3, room1)
        const newArray: string[] = [username1, username2, username3]
        const unpr = e.getDetails().usernamesPerRoom
        expect(unpr[room1]).toEqual(expect.arrayContaining(newArray))
      })
    })
  })

  describe('`moveUser method`', () => {
    const f: Population = new Population()
    let socketId1: t.TSocketId
    let username1: t.TUsername
    let socketId2: t.TSocketId
    let username2: t.TUsername
    let socketId3: t.TSocketId
    let username3: t.TUsername

    const newRoom: t.TRoomName = faker.random.word()
    const oldRoom: t.TRoomName = faker.random.word()

    beforeEach(() => {
      socketId1 = faker.random.number().toString()
      username1 = faker.random.word()
      socketId2 = faker.random.number().toString()
      username2 = faker.random.word()
      socketId3 = faker.random.number().toString()
      username3 = faker.random.word()

      f.addUser(socketId1, username1)
      f.addUser(socketId2, username2)
      f.addUser(socketId3, username3)
      f.populateRoom(socketId1, oldRoom)
      f.populateRoom(socketId2, oldRoom)
      f.populateRoom(socketId3, oldRoom)
    })

    it('should not expect the target room to exist', () => {
      const initial: t.IRoom = f.rooms.newRoom
      expect(initial).toBeUndefined()

      f.moveUser(socketId1, oldRoom, newRoom)
      const final: t.IRoom = f.rooms[newRoom]

      expect(final).toBeDefined()
    })

    it('should add a user to a new room', () => {
      f.moveUser(socketId1, oldRoom, newRoom)
      const result: boolean = f.rooms[newRoom].users.includes(socketId1)
      expect(result).toBeTruthy()
    })

    it('should remove the user from the old room', () => {
      f.moveUser(socketId1, oldRoom, newRoom)
      const result: boolean = f.rooms[oldRoom].users.includes(socketId1)
      expect(result).toBeFalsy()
    })

    it('should not affect other users in the old room', () => {
      const result: boolean = f.rooms[oldRoom].users.includes(socketId2)
      expect(result).toBeTruthy()
    })

    it('should not affect users in the new room', () => {
      f.moveUser(socketId1, oldRoom, newRoom)
      f.moveUser(socketId2, oldRoom, newRoom)
      const result: boolean = f.rooms[newRoom].users.includes(socketId1)
      expect(result).toBeTruthy()
    })
  })

  describe('`deleteUser` method', () => {
    xit('should delete the user and socketId from the users list', () => {
      //
    })
  })

  describe('`getRoom` method', () => {
    xit('should return the room a user is in', () => {
      //
    })
  })

  describe('`get.TSocketId` method', () => {
    xit('should get the socketId associated with a given username', () => {
      //
    })
  })

  describe('`get.TUsername` method', () => {
    xit('should get the username associated with a given socketId', () => {
      //
    })
  })

  describe('`getLeader` method', () => {
    xit('should get the socketId of the leader of a room, if it exists', () => {
      //
    })
  })

  describe('`isLeader` method', () => {
    xit('should check if the socketId is the leader of the room', () => {
      //
    })
  })

  describe('`isRoom` method', () => {
    xit('should return true if the room exists', () => {
      //
    })
    xit('should return false if the room does not exist', () => {
      //
    })
  })

  describe('`isUsername` method', () => {
    it('should return `true` if a username in `this.users`', () => {
      const socketId: t.TSocketId = faker.random.number().toString()
      const username: t.TUsername = faker.random.word()
      p.addUser(socketId, username)
      const result: boolean = p.isUsername(username)
      expect(result).toBeTruthy()
    })

    it('should return `false` if a username does not exist in `this.users`', () => {
      const username: t.TUsername = faker.random.word()
      const result: boolean = p.isUsername(username)
      expect(result).toBeFalsy()
    })
  })
})
