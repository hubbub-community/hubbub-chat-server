import chalk from 'chalk';

import population from '../lib/population';
import sendToRoom from '../lib/send-to-room';

/***
 * Emit a user text-emote to their room ::shrugs::
 * @function
 * @name me
 * @param arg {string} The text-emote
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const me = (arg: string, socket: any) => {
  const room = population.getRoom(socket.id);
  const username = population.getUsername(socket.id);
  const emote = chalk.magenta(`${username} ${arg}`);
  sendToRoom(emote, room, socket);
};

export default me;
