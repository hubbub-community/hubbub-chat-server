import population from '../../lib/population';
import sendToRoom from '../../lib/send-to-room';

const mockSocket = {
  emit: jest.fn(),
  id: Math.random().toString(),
  to: jest.fn(),
};

const handleMessage = (line: string, socket = mockSocket) => {
  const username: string = population.getUsername(socket.id);
  const room: TRoomName = population.getRoom(socket.id);

  sendToRoom(line, room, socket);
};

export default handleMessage;
