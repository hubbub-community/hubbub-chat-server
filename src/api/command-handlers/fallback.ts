import chalk from 'chalk';
import sendToUser from '../lib/send-to-user';

/***
 * Warn the user when they have used an invalid command
 * @function
 * @name fallback
 * @param undefined {undefined} Unused parameter
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 */
const fallback = (n = null, socket: any, io: any) => {
  const message = `Type ${chalk.cyan(
    '/help'
  )} to see a list of available commands.\n`;
  sendToUser(message, socket, io, null);
};

export default fallback;
