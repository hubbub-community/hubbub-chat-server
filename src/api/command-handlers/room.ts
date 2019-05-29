import chalk from 'chalk';

import population from '../lib/population';
import sendToRoom from '../lib/send-to-room';
import sendToUser from '../lib/send-to-user';

/***
 * Create a new room and add a user to it, if appropriate
 * @function
 * @name room
 * @param arg {string} The name of the new room
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const room = (arg: string, socket: any, io: any) => {
  const username = population.getUsername(socket.id);

  const oldRoom: TRoomName = population.getRoom(socket.id);
  const newRoom: string = arg;

  // If the user isn't already in that room
  if (typeof oldRoom === 'string' && oldRoom !== newRoom) {
    // Move the user out of the old room and into a newly created room
    population.moveUser(socket.id, oldRoom, newRoom);

    // Socket.io method of resubscribing
    // population methods only affect memory storage
    socket.leave(oldRoom);
    socket.join(newRoom);

    // Send a message to the user
    const message = `You have left ${chalk.red(
      oldRoom
    )} and created ${chalk.green(newRoom)}
You are now the leader of ${newRoom}`;
    sendToUser(message, socket, io, null);

    // Send a message to the room they're leaving, if it hasn't closed
    if (population.isRoom(oldRoom)) {
      const oldRoomMessage = `${username} has left ${chalk.red(
        oldRoom
      )} and joined ${chalk.green(newRoom)}`;
      sendToRoom(oldRoomMessage, oldRoom, socket);
    }
    // If the user is already in the room
  } else if (oldRoom === newRoom) {
    // Send a message to the user
    const message = `You are already in ${chalk.cyan(newRoom)}`;
    sendToUser(message, socket, io, null);
  }
};

export default room;
