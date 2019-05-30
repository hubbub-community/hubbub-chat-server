import chalk from 'chalk';
import { Server, Socket } from 'socket.io';

import { TRoomName, TSocketId, TUsername } from '../../types/global';
import population from '../lib/population';
import sendToRoom from '../lib/send-to-room';
import sendToUser from '../lib/send-to-user';

/**
 * Move a user to an extant room if appropriate
 * @exports
 * @function
 * @name join
 * @param arg {string} The name of the room to join
 * @param socket {Socket} The socket object from the client event
 * @param io {Server} The server-side Socket.io instance
 */
const join = (arg: string, socket: Socket, io: Server): void => {
  const username: TUsername = population.getUsername(socket.id);
  const isRoom: boolean = population.isRoom(arg);
  const oldRoom: TRoomName = population.getRoom(socket.id);
  const newRoom: TRoomName = arg;

  if (!isRoom) {
    // The room does not exist
    const message: string = `The room ${chalk.cyan(newRoom)} does not exist.`;
    sendToUser(message, socket, io, null);
    return;
  }
  // If the user isn't already in that room
  if (typeof oldRoom === 'string' && oldRoom !== newRoom) {
    // Move the user to the room
    population.moveUser(socket.id, oldRoom, newRoom);

    // Don't forget to call the Socket.io method
    socket.leave(oldRoom);
    socket.join(newRoom);

    // Send a message to the user
    const newLeaderId: TSocketId = population.getLeader(newRoom);
    const newLeader: TUsername = chalk.cyan(
      population.getUsername(newLeaderId)
    );
    const message: string = `You have left ${chalk.red(
      oldRoom
    )} and joined ${chalk.green(newRoom)}
The leader of your room is ${newLeader}`;
    sendToUser(message, socket, io, null);

    // Send a message to the room they're leaving
    const oldLeaderId: TSocketId = population.getLeader(oldRoom);
    const oldLeader: TUsername = chalk.cyan(
      population.getUsername(oldLeaderId)
    );
    const oldRoomMessage: string = `${username} has left ${chalk.red(
      oldRoom
    )} and joined ${chalk.green(newRoom)}
The leader of your room is ${oldLeader}`;
    sendToRoom(oldRoomMessage, oldRoom, socket);

    // Send a message to their new room
    const newRoomMessage: string = `${username} has joined you in ${chalk.green(
      newRoom
    )}`;
    sendToRoom(newRoomMessage, newRoom, socket);
    // If the user is already in the room
  } else if (oldRoom === newRoom) {
    // Send a message to the user
    const message: string = `You are already in ${chalk.cyan(newRoom)}`;
    sendToUser(message, socket, io, null);
  }
};

export default join;
