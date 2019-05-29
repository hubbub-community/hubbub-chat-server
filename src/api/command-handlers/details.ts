import chalk from 'chalk';
import { Server, Socket } from 'socket.io';
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
const details = (n: null, socket: Socket, io: Server): void => {
  const populationDetails = population.getDetails();
  const room = population.getRoom(socket.id);
  const username = population.getUsername(socket.id);
  const users =
    room &&
    populationDetails.usernamesPerRoom[room]
      .filter((user: string) => user !== username)
      .map((user: string) => chalk.cyan(user))
      .join(', ');
  const leaderId = population.getLeader(room);
  const leader = leaderId && chalk.cyan(population.getUsername(leaderId));

  if (room && populationDetails.userCountPerRoom[room]) {
    const message = `
  Your Socket.io client id is ${chalk.cyan(socket.id)}
  Your username is ${chalk.cyan(username)}
  You are one of ${chalk.cyan(
    populationDetails.userCountPerRoom[room].toString()
  )} users in ${chalk.cyan(room)}
  Other users in the room are: ${users}
  The leader of your room is ${leader}
  `;

    sendToUser(message, socket, io, null);
  }
};

export default details;
