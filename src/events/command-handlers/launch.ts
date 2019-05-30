import chalk from 'chalk';
import { Server, Socket } from 'socket.io';

import sendToUser from '../lib/send-to-user';

/**
 * Launch fallback
 * If the `/launch` command was entered without an argument,
 * users will see this message.
 * @exports
 * @function
 * @name launch
 * @param [arg=null] {null} Unused parameter
 * @param socket {Socket} The socket object from the client event
 * @param io {Server} The server-side Socket.io instance
 */
const launch = (arg: null = null, socket: Socket, io: Server): void => {
  const message: string = `Make sure to enter the link to the application after ${chalk.cyan(
    '/launch'
  )}
For example:
${chalk.cyan(`/launch ${process.env.EXAMPLE_APP}`)}
`;
  sendToUser(message, socket, io, null);
};

export default launch;
