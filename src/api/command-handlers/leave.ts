import chalk from 'chalk';
import { Server, Socket } from 'socket.io';

import { TRoomName, TSocketId, TUsername } from '../../global';
import population from '../lib/population';
import sendToRoom from '../lib/send-to-room';
import sendToUser from '../lib/send-to-user';

/**
 * Move a user from a room to the Lobby
 * @exports
 * @function
 * @name leave
 * @param arg {null} Unused parameter
 * @param socket {Socket} The socket object from the client event
 * @param io {Server} The server-side Socket.io instance
 */
const leave = (arg: null = null, socket: Socket, io: Server): void => {
  const username = population.getUsername(socket.id);

  // Move the user from room to the Lobby
  const oldRoom: TRoomName = population.getRoom(socket.id);
  const newRoom: TRoomName = 'lobby';

  if (typeof oldRoom === 'string' && oldRoom !== newRoom) {
    population.moveUser(socket.id, oldRoom, newRoom);

    // Socket.io handling
    socket.leave(oldRoom);
    socket.join(newRoom);

    // Send a message to the user
    const message: string = `You have left ${chalk.red(
      oldRoom
    )} and joined ${chalk.green(newRoom)}`;
    sendToUser(message, socket, io, null);

    // Send a message to the room they're leaving
    const leaderId: TSocketId = population.getLeader(oldRoom);
    const leader: TUsername = chalk.cyan(population.getUsername(leaderId));
    const oldRoomMessage: string = `${username} has left ${chalk.red(
      oldRoom
    )} and joined ${chalk.green(newRoom)}
The leader of your room is ${leader}`;
    sendToRoom(oldRoomMessage, oldRoom, socket);

    // Send a message to their new room
    const newRoomMessage: string = `${username} has joined you in ${chalk.green(
      newRoom
    )}`;
    sendToRoom(newRoomMessage, newRoom, socket);
  } else {
    // Send a message to the user
    const message: string = `You are already in ${chalk.cyan(newRoom)}`;
    sendToUser(message, socket, io, null);
  }
};

export default leave;
