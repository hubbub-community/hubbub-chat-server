import { Server, Socket } from 'socket.io';

import handleConnection from './event-handlers/handle-connection';
import handleDisconnect from './event-handlers/handle-disconnect';
import handleInput from './event-handlers/handle-input';

const events = (io: Server): void => {
  io.on(
    'connection',
    (socket: Socket): void => {
      console.log(`Socket connected with id ${socket.id}...`);

      handleConnection(socket, io);

      socket.on('input', (line: string): void => handleInput(line, socket, io));
      socket.on('disconnect', (): void => handleDisconnect(socket));
    }
  );
};

export default events;
