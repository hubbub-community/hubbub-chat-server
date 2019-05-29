import chalk from 'chalk';
import sendToUser from '../lib/send-to-user';

/***
 * Launch fallback
 * If the `/launch` command was entered without an argument,
 * users will see this message.
 * @param undefined {undefined} Unused parameter
 *
 */
const launch = (n = null, socket: any, io: any) => {
  const message = `Make sure to enter the link to the application after ${chalk.cyan(
    '/launch'
  )}
For example:
${chalk.cyan('/launch https://frozen-everglades-56570.herokuapp.com')}
`;
  sendToUser(message, socket, io, null);
};

export default launch;
