class Population {
  public users: IUsers = {};
  public rooms: IRooms = {};
  constructor() {
    this.users = {};
    this.rooms = {};
  }
  // Add a user to a users list with their socketId
  public addUser(socketId: TSocketId, username: TUsername): void {
    this.users[socketId] = username;
  }

  // Add a user to a room; if the room doesn't exist,
  // create it and indicate the leader
  // If the user is already in the room, do nothing.
  public populateRoom(socketId: TSocketId, room: TRoomName): void {
    // If the room already exists
    if (this.rooms[room]) {
      this.rooms[room].users.push(socketId);
      // If the room doesn't exist
    } else {
      this.rooms[room] = { leader: socketId, users: [socketId] };
    }
  }

  // Delete user and socketId from users list
  public deleteUser(socketId: TSocketId): void {
    delete this.users[socketId];
  }

  // Remove a user from a room. If the room becomes empty,
  // delete it. If the leader leaves, assign the `leader` property
  // to the person who's been there longest
  // If the user is not in the room, do nothing.
  // If the room does not exist, do nothing.
  public depopulateRoom(socketId: TSocketId, room: TRoomName): void {
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

  // Return an object that contains the following:
  // The name of each room.
  // The total number of rooms.
  // The total number of users.
  // The number of users in each room.
  // The names of users in each room.
  public getDetails(): IGetDetails {
    const roomNames: TRoomNames = Object.keys(this.rooms);
    const totalRooms: number = roomNames.length;
    const totalUsers: number = Object.keys(this.users).length;

    const userCountPerRoom: IUserCountPerRoom = {};
    const socketIdsPerRoom: ISocketIdsPerRoom = {};

    // Populate the two empty objects
    roomNames.forEach(
      (room: TRoomName): void => {
        socketIdsPerRoom[room] = this.rooms[room].users;
        userCountPerRoom[room] = this.rooms[room].users.length;
      }
    );

    const usernamesPerRoom: IUserNamesPerRoom = {};

    for (const room in socketIdsPerRoom) {
      if (socketIdsPerRoom[room]) {
        usernamesPerRoom[room] = socketIdsPerRoom[room].map(
          id => this.users[id]
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

  // Remove a user from a room. If the room becomes empty,
  // delete it, preserving the leader property
  // Add the user to a different room. If the room doesn't exist,
  // create it and assigne the leader
  public moveUser(
    socketId: TSocketId,
    oldRoom: TRoomName,
    newRoom: TRoomName
  ): void {
    this.depopulateRoom(socketId, oldRoom);
    this.populateRoom(socketId, newRoom);
  }

  // Return the room a user is in
  public getRoom(socketId: TSocketId): TRoomName {
    for (const room in this.rooms) {
      if (this.rooms[room].users.includes(socketId)) {
        return room;
      }
    }
    return `No room found for SocketID ${socketId}`;
  }

  // Get the socketId associated with a given username
  public getSocketId(username: TUsername) {
    return Object.keys(this.users).find(
      socketId => this.users[socketId] === username
    );
  }

  // Get the username associated with a given socketId
  public getUsername(socketId: TSocketId): TUsername {
    return this.users[socketId];
  }

  // Get the socketId of the leader of a room, if it exists
  public getLeader(room: TRoomName): TSocketId {
    if (room && this.rooms[room]) {
      return this.rooms[room].leader;
    }
    return `Error getting leader for room ${room}`;
  }
  // Check if the socketId is the leader of the room
  public isLeader(socketId: TSocketId, room: TRoomName): boolean {
    const leader = this.getLeader(room);
    return socketId === leader ? true : false;
  }

  // Return a Boolean for whether a room exists
  public isRoom(room: TRoomName): boolean {
    return this.rooms.hasOwnProperty(room) ? true : false;
  }

  // Returns a Boolean for whether a username is
  // currently associated with a socketId in any room
  public isUsername(username: string): boolean {
    return this.getSocketId(username) ? true : false;
  }
}

export default Population;
