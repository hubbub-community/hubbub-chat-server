import chalk from 'chalk';

import population from '../lib/population';
import sendToRoom from '../lib/send-to-room.js';
import sendToUser from '../lib/send-to-user';

/***
 * Reassign a username to a custom nickname, if it's not taken
 * @function
 * @name nick
 * @param arg {string} The proposed new username
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 */
const nick = (arg: string, socket: any, io: any) => {
  const oldName = population.getUsername(socket.id);
  const isTaken = population.isUsername(arg);

  // Don't allow duplicate usernames
  if (isTaken) {
    const userMessage = `The username ${chalk.cyan(arg)} is not available`;
    sendToUser(userMessage, socket, io, null);
  } else {
    population.addUser(socket.id, arg);
    const name = chalk.yellow(arg);
    const room = population.getRoom(socket.id);

    // Send to room
    const roomAnnouncement = `${chalk.red(
      oldName
    )} has updated their name to ${name}`;
    sendToRoom(roomAnnouncement, room, socket);

    // Send to user
    const userMessage = `Your username has been changed to ${name}`;
    sendToUser(userMessage, socket, io, null);
  }
};

export default nick;
