import chalk from 'chalk';
import { Server, Socket } from 'socket.io';

import { TRoomName, TUsername } from '../../global';
import population from '../lib/population';
import sendToRoom from '../lib/send-to-room';
import sendToUser from '../lib/send-to-user';

/***
 * Emit a user text-emote to their room ::shrugs::
 * @function
 * @name me
 * @param arg {string} The text-emote
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const me = (arg: string, socket: Socket, io: Server): void => {
  const room: TRoomName = population.getRoom(socket.id);
  const username: TUsername = population.getUsername(socket.id);
  const emote: string = chalk.magenta(`[${username}] ${arg}`);
  sendToUser(emote, socket, io, socket.id);
  sendToRoom(emote, room, socket);
};

export default me;
