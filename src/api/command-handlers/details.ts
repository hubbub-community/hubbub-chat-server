import chalk from 'chalk';

import population from '../lib/population';
import sendToUser from '../lib/send-to-user';

/***
 * Display details to the user including their username,
 * their room, and the users they're with.
 * @function
 * @name details
 * @param null {null} Unused parameter
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 */
const details = (n: null, socket: any, io: any): void => {
  const populationDetails = population.getDetails();
  const room: TRoomName = population.getRoom(socket.id);
  const username: TUsername = population.getUsername(socket.id);
  const users: string =
    room &&
    populationDetails.usernamesPerRoom[room]
      .filter((user: TUsername) => user !== username)
      .map((user: TUsername) => chalk.cyan(user))
      .join(', '); // This string will look like an array
  const leaderId: TSocketId = population.getLeader(room);
  const leader: TUsername =
    leaderId && chalk.cyan(population.getUsername(leaderId));

  if (room && populationDetails.userCountPerRoom[room]) {
    const message: string = `
  Your Socket.io client id is ${chalk.cyan(socket.id)}
  Your username is ${chalk.cyan(username)}
  You are one of ${chalk.cyan(
    populationDetails.userCountPerRoom[room].toString()
  )} users in ${chalk.cyan(room)}
  Other users in the room are: ${users.length > 0 ? users : chalk.cyan('N/A')}
  The leader of your room is ${leader}
  `;
    sendToUser(message, socket, io, null);
  }
};

export default details;
