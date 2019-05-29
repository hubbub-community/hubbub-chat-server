import population from '../lib/population';

/***
 * Removes the user from the population memory pool
 * and performs other cleanup
 * @function
 * @name handleDisconnect
 * @param socket {object} The socket object from the client event
 ***/

async function handleDisconnect(socket: any) {
  try {
    const room = await population.getRoom(socket.id);
    population.depopulateRoom(socket.id, room);
    population.deleteUser(socket.id);
    socket.leave(room);
    console.log(`${socket.id} disconnected...`);
  } catch (err) {
    console.error(err);
  }
}

export default handleDisconnect;
