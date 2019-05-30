import chalk from 'chalk';
import { Server, Socket } from 'socket.io';

import sendToUser from '../lib/send-to-user';

/***
 * Launch fallback
 * If the `/launch` command was entered without an argument,
 * users will see this message.
 * @param arg {null} Unused parameter
 */
const launch = (arg: null = null, socket: Socket, io: Server): void => {
  const message: string = `Make sure to enter the link to the application after ${chalk.cyan(
    '/launch'
  )}
For example:
${chalk.cyan('/launch https://frozen-everglades-56570.herokuapp.com')}
`;
  sendToUser(message, socket, io, null);
};

export default launch;
