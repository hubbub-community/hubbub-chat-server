import * as t from '../../global';

/**
 * This class is used to track and manage users in the chat environment.
 * @exports
 * @class Population
 */
class Population {
  public users: t.IUsers = {};
  public rooms: t.IRooms = {};
  constructor() {
    this.users = {};
    this.rooms = {};
  }

  /**
   * Add a user to a users list with their socketId
   * @name addUser
   * @param {t.TSocketId} socketId
   * @param {t.TUsername} username
   * @memberof Population
   */
  public addUser(socketId: t.TSocketId, username: t.TUsername): void {
    if (typeof socketId === 'string' && typeof username === 'string') {
      this.users[socketId] = username;
    }
  }

  /**
   * Add a user to a room; if the room doesn't exist,
   * create it and indicate the leader
   * If the user is already in the room, do nothing.
   * @name populateRoom
   * @param {t.TSocketId} socketId
   * @param {t.TRoomName} room
   * @memberof Population
   */
  public populateRoom(socketId: t.TSocketId, room: t.TRoomName): void {
    // If the room already exists
    if (this.rooms[room]) {
      this.rooms[room].users.push(socketId);
      // If the room doesn't exist
    } else {
      this.rooms[room] = { leader: socketId, users: [socketId] };
    }
  }

  /**
   * Delete user and socketId from users list
   * @name deleteUser
   * @param {t.TSocketId} socketId
   * @memberof Population
   */
  public deleteUser(socketId: t.TSocketId): void {
    if (typeof socketId === 'string') {
      delete this.users[socketId];
    }
  }

  /**
   * Remove a user from a room. If the room becomes empty,
   * delete it. If the leader leaves, assign the `leader` property
   * to the person who's been there longest
   * If the user is not in the room, do nothing.
   * If the room does not exist, do nothing.
   * @name depopulateRoom
   * @param {t.TSocketId} socketId
   * @param {t.TRoomName} room
   * @memberof Population
   */
  public depopulateRoom(socketId: t.TSocketId, room: t.TRoomName): void {
    if (room && this.rooms[room]) {
      // Are we removing the leader?
      const { leader } = this.rooms[room];
      if (socketId === leader) {
        // Make the next-most senior person in the room
        // the leader
        const newLeader = this.rooms[room].users[1];
        this.rooms[room].leader = newLeader;
      }
      const index = this.rooms[room].users.findIndex(user => user === socketId);
      this.rooms[room].users.splice(index, 1);

      // If the room is empty
      if (room && this.rooms[room].users.length === 0) {
        // delete it
        delete this.rooms[room];
      }
    }
  }

  /**
   * Return an object that contains the following:
   * The name of each room.
   * The total number of rooms.
   * The total number of users.
   * The number of users in each room.
   * The names of users in each room.
   * @name getDetails
   * @returns {t.IGetDetails}
   * @memberof Population
   */
  public getDetails(): t.IGetDetails {
    const roomNames: t.TRoomNames = Object.keys(this.rooms);
    const totalRooms: t.TTotalRooms = roomNames.length;
    const totalUsers: t.TTotalUsers = Object.keys(this.users).length;

    const userCountPerRoom: t.IUserCountPerRoom = {};
    const socketIdsPerRoom: t.ISocketIdsPerRoom = {};

    // Populate the two empty objects
    roomNames.forEach(
      (room: t.TRoomName): void => {
        socketIdsPerRoom[room] = this.rooms[room].users;
        userCountPerRoom[room] = this.rooms[room].users.length;
      }
    );

    const usernamesPerRoom: t.IUserNamesPerRoom = {};

    for (const room in socketIdsPerRoom) {
      if (socketIdsPerRoom[room]) {
        usernamesPerRoom[room] = socketIdsPerRoom[room].map(
          (socketId: t.TSocketId) => {
            if (typeof socketId === 'string') {
              return this.users[socketId];
            } else {
              return 'Error getting details';
            }
          }
        );
      }
    }

    return {
      roomNames,
      totalRooms,
      totalUsers,
      userCountPerRoom,
      usernamesPerRoom,
    };
  }

  /**
   * Remove a user from a room. If the room becomes empty,
   * delete it, preserving the leader property
   * Add the user to a different room. If the room doesn't exist,
   * create it and assigne the leader
   * @name moveUser
   * @param {t.TSocketId} socketId
   * @param {t.TRoomName} oldRoom
   * @param {t.TRoomName} newRoom
   * @memberof Population
   */
  public moveUser(
    socketId: t.TSocketId,
    oldRoom: t.TRoomName,
    newRoom: t.TRoomName
  ): void {
    this.depopulateRoom(socketId, oldRoom);
    this.populateRoom(socketId, newRoom);
  }

  /**
   * Return the room a user is in
   * @name getRoom
   * @param {t.TSocketId} socketId
   * @returns {t.TRoomName}
   * @memberof Population
   */
  public getRoom(socketId: t.TSocketId): t.TRoomName {
    for (const room in this.rooms) {
      if (this.rooms[room].users.includes(socketId)) {
        return room;
      }
    }
    return `Error getting room for socketId ${socketId}`;
  }

  /**
   * Get the socketId associated with a given username
   * @name getSocketId
   * @param {t.TUsername} username
   * @returns {t.TSocketId}
   * @memberof Population
   */
  public getSocketId(username: t.TUsername): t.TSocketId {
    const usersArr = Object.keys(this.users);

    const targetSocketId: t.TSocketId =
      usersArr.find((socketId: t.TSocketId) => {
        if (typeof socketId === 'string') {
          return this.users[socketId] === username;
        } else {
          return false;
        }
      }) || null;

    return targetSocketId;
  }

  /**
   * Get the username associated with a given socketId
   * @name getUsername
   * @param {t.TSocketId} socketId
   * @returns {t.TUsername}
   * @memberof Population
   */
  public getUsername(socketId: t.TSocketId): t.TUsername {
    if (typeof socketId === 'string') {
      return this.users[socketId];
    } else {
      return `Error getting username for socketId ${socketId}`;
    }
  }

  /**
   * Get the socketId of the leader of a room, if it exists
   * @name getLeader
   * @param {t.TRoomName} room
   * @returns {t.TSocketId}
   * @memberof Population
   */
  public getLeader(room: t.TRoomName): t.TSocketId {
    if (room && this.rooms[room]) {
      return this.rooms[room].leader;
    }
    return `Error getting leader for room ${room}`;
  }

  /**
   *  Check if the socketId is the leader of the room
   * @name isLeader
   * @param {t.TSocketId} socketId
   * @param {t.TRoomName} room
   * @returns {boolean}
   * @memberof Population
   */
  public isLeader(socketId: t.TSocketId, room: t.TRoomName): boolean {
    const leader = this.getLeader(room);
    return socketId === leader ? true : false;
  }

  /**
   * Return a Boolean for whether a room exists
   * @name isRoom
   * @param {t.TRoomName} room
   * @returns {boolean}
   * @memberof Population
   */
  public isRoom(room: t.TRoomName): boolean {
    return this.rooms.hasOwnProperty(room) ? true : false;
  }

  /**
   * Returns a Boolean for whether a username is
   * currently associated with a socketId in any room
   * @name isUsername
   * @param {t.TUsername} username
   * @returns {boolean}
   * @memberof Population
   */
  public isUsername(username: t.TUsername): boolean {
    return this.getSocketId(username) ? true : false;
  }
}

export default Population;
