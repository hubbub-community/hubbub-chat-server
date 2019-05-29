import chalk from 'chalk';

import population from '../lib/population';
import sendToRoom from '../lib/send-to-room';
import sendToUser from '../lib/send-to-user';

/***
 * Move a user from a room to the Lobby
 * @function
 * @name leave
 * @param undefined {undefined} Unused parameter
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 */
const leave = (n = null, socket: any, io: any) => {
  const username = population.getUsername(socket.id);

  // Move the user from room to the Lobby
  const oldRoom = population.getRoom(socket.id);
  const newRoom = 'lobby';

  if (typeof oldRoom === 'string' && oldRoom !== newRoom) {
    population.moveUser(socket.id, oldRoom, newRoom);

    // Socket.io handling
    socket.leave(oldRoom);
    socket.join(newRoom);

    // Send a message to the user
    const message = `You have left ${chalk.red(
      oldRoom
    )} and joined ${chalk.green(newRoom)}`;
    sendToUser(message, socket, io, null);

    // Send a message to the room they're leaving
    const leaderId: TRoomName = population.getLeader(oldRoom);
    const leader: TUsername = chalk.cyan(population.getUsername(leaderId));
    const oldRoomMessage = `${username} has left ${chalk.red(
      oldRoom
    )} and joined ${chalk.green(newRoom)}
The leader of your room is ${leader}`;
    sendToRoom(oldRoomMessage, oldRoom, socket);

    // Send a message to their new room
    const newRoomMessage = `${username} has joined you in ${chalk.green(
      newRoom
    )}`;
    sendToRoom(newRoomMessage, newRoom, socket);
  } else {
    // Send a message to the user
    const message = `You are already in ${chalk.cyan(newRoom)}`;
    sendToUser(message, socket, io, null);
  }
};

export default leave;
