import handleConnection from './event-handlers/handle-connection';
import handleDisconnect from './event-handlers/handle-disconnect';
import handleInput from './event-handlers/handle-input';

const events = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log(`Socket connected with id ${socket.id}...`);

    handleConnection(socket, io);

    socket.on('input', (line: string): void => handleInput(line, socket, io));
    socket.on('disconnect', (): Promise<void> => handleDisconnect(socket));
  });
};

export default events;
