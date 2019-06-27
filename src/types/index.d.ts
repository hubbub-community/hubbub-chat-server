export type TCommand = string
export type TCommandArg = string | null
export type TRoomCount = number
export type TRoomName = string
export type TRoomNames = string[]
export type TSocketId = string | null
export type TTotalRooms = number
export type TTotalUsers = number
export type TUsername = string
export type TUserCount = number

export interface IGetDetails {
  roomNames: TRoomNames
  totalRooms: TTotalRooms
  totalUsers: TTotalUsers
  userCountPerRoom: IUserCountPerRoom
  usernamesPerRoom: IUserNamesPerRoom
}

export interface IHandlerFinder {
  default: (arg: TCommandArg, socket: Socket, io: Server) => any
}

export interface IParse {
  cmd: TCommand
  arg: TCommandArg
}

export interface IRoom {
  leader: TSocketId
  users: TSockedId[]
}

// { roomName: { leader: socketId, users: [ socketId, socketId, socketId ] }, ... }
export interface IRooms {
  [key: string]: IRoom
}

export interface ISocketIdsPerRoom {
  [key: string]: TSocketId[]
}

// { socketId: username, socketId: username, ... }
export interface IUsers {
  [key: string]: TUsername
}

export interface IUserCountPerRoom {
  [key: string]: TUserCount
}

export interface IUserNamesPerRoom {
  [key: string]: TUsername[]
}

export interface IParams extends express.Request.params {
  id?: string
  model?: string
}

import { Request } from 'express'
import { MongooseModel } from '../models/mongoose.model'

export interface IRequest extends Request {
  // body?: any
  params: IParams
  model?: MongooseModel
  // originalUrl?: any
  // session?: any
  // user?: any
}
