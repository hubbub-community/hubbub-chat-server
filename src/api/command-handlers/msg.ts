import chalk from 'chalk';
import { Server, Socket } from 'socket.io';

import { TSocketId, TUsername } from '../../global';
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
const msg = (arg: string, socket: Socket, io: Server): void => {
  const username: TUsername = population.getUsername(socket.id);

  const regex: RegExp = /([\w\d]+|[\d]+|[\w]+|-)+\b/i;

  const r: RegExpMatchArray = arg.match(regex) || [];
  if (r.length > 0) {
    const recipient: TUsername = r[0];
    const recipientId: TSocketId = population.getSocketId(recipient);

    // If the recipient exists, send the message to them
    if (recipientId) {
      const designator: string = chalk.magenta(`[${username} → ${recipient}]`);
      const msgArg: string = arg.slice(recipient.length, arg.length);
      const message: string = designator + msgArg;
      sendToUser(message, socket, io, recipientId);
    } else {
      // Else inform the user of the problem
      const message: string = chalk.red(
        `The user '${recipient}' does not exist`
      );
      sendToUser(message, socket, io, null);
    }
  }
};

export default msg;
