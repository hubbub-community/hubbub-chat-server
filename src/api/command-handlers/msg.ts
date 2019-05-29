import chalk from 'chalk';

import population from '../lib/population';
import sendToUser from '../lib/send-to-user';

/***
 * Send a direct message from a user to a recipient
 * @function
 * @name msg
 * @param arg {string} The username of and message to an intended recipient
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const msg = (arg: string, socket: any, io: any) => {
  const username = population.getUsername(socket.id);

  const regex = /([\w\d]+|[\d]+|[\w]+|-)+\b/i;

  const r = arg.match(regex);
  if (r && r.length > 0) {
    const recipient = r[0];
    const recipientId = population.getSocketId(recipient);

    // If the recipient exists, send the message to them
    if (recipientId) {
      const designator = chalk.magenta(`[${username} → ${recipient}]`);
      const msgArg = arg.slice(recipient.length, arg.length);
      const message = designator + msgArg;
      sendToUser(message, socket, io, recipientId); // 4 arguments
    } else {
      // Else inform the user of the problem
      const message = chalk.red(`The user '${recipient}' does not exist`);
      sendToUser(message, socket, io, null);
    }
  }
};

export default msg;
