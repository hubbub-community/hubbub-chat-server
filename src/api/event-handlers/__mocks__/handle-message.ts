import { Socket } from 'socket.io';

import { TRoomName, TUsername } from '../../../global';
import population from '../../lib/population';
import sendToRoom from '../../lib/send-to-room';

// TODO: mockSocket should extend Socket
const mockSocket = {
  emit: jest.fn(),
  id: Math.random().toString(),
  to: jest.fn(),
};

const handleMessage = (line: string, socket: Socket): void => {
  const username: TUsername = population.getUsername(socket.id);
  const room: TRoomName = population.getRoom(socket.id);

  // This should be mockSocket for testing
  sendToRoom(line, room, socket);
};

export default handleMessage;
