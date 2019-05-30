type TCommandArg = string | null;
type TRoomName = string;
type TRoomNames = string[];
type TSchemaName = string;
type TSocketId = string | null;
type TTotalRooms = number;
type TTotalUsers = number;
export type TUsername = string;

interface IGetDetails {
  roomNames: TRoomNames;
  totalRooms: TTotalRooms;
  totalUsers: TTotalUsers;
  userCountPerRoom: IUserCountPerRoom;
  usernamesPerRoom: IUserNamesPerRoom;
}

interface IHandlerFinder {
  default: (arg: TCommandArg, socket: Socket, io: Server) => any;
}

interface IParse {
  cmd: string;
  arg: TCommandArg;
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

/*
 * TODO: Add a `model` property onto the existing Express Request type.
 * TODO: The type of `model` should be formalized.
 */
interface IRequest {
  body?: any;
  params?: any;
  model?: any;
}
