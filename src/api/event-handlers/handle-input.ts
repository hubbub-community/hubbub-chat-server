import { Server, Socket } from 'socket.io';

import handleCommand from './handle-command';
import handleMessage from './handle-message';

/***
 * Passes input to handleCommand or handleMessage
 * depending on whether the input has a leading slash.
 * @function
 * @name handleInput
 * @param line {string} The input from the client
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const handleInput = (line: string, socket: Socket, io: Server): void => {
  console.log('Received input:', line);
  line = line.trim();

  if (line[0] === '/' && line.length > 1) {
    handleCommand(line, socket, io);
  } else {
    handleMessage(line, socket);
  }
};

export default handleInput;
