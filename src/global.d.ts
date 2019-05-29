export declare global {
  type TRoomName = string;
  type TRoomNames = string[];
  type TSocketId = string;
  type TTotalRooms = number;
  type TTotalUsers = number;
  type TUsername = string;

  interface IGetDetails {
    roomNames: TRoomNames;
    totalRooms: TTotalRooms;
    totalUsers: TTotalUsers;
    userCountPerRoom: IUserCountPerRoom;
    usernamesPerRoom: IUserNamesPerRoom;
  }

  // { roomName: { leader: socketId, users: [ socketId, socketId, socketId ] }, ... }
  interface IRooms {
    [key: string]: {
      leader: TSocketId;
      users: TSocketId[];
    };
  }

  interface ISocketIdsPerRoom {
    [key: string]: TSocketId[];
  }

  // { socketId: username, socketId: username, ... }
  interface IUsers {
    [key: string]: string;
  }

  interface IUserCountPerRoom {
    [key: string]: number;
  }

  interface IUserNamesPerRoom {
    [key: string]: string[];
  }

  namespace Express {
    // tslint:disable-next-line:interface-name
    interface Request {
      model?: any; // Formalize this type
    }
  }
}
