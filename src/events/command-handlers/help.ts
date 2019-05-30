import chalk from 'chalk';
import { Server, Socket } from 'socket.io';

// const emojic = require('emojic');
import sendToUser from '../lib/send-to-user';

const instructions: string = `
${chalk.underline.bold('Chat Commands')}
/about ← See information about the Hubbub projects and development team
/details ← See your name, the room you're in, and a list of other users in your current room
/exit ← Disconnect from the server and exit the program
/help ← This menu
/launch ${chalk.green('url')} ← Run the application at ${chalk.green('url')}! ${
  '::rocket::' /* emojic.rocket */
}
/leave ← Return to the chat lobby from within the chat
/list ← See a list of external applications you can run
/lobby ← Reconnect to the chat server
/join ${chalk.blue('room')} ← Join the ongoing chat in ${chalk.blue('room')}
/me :D ← Emotes lamely. ${chalk.magenta(':D')}
/msg ${chalk.yellow('user')} ← Send a direct message to ${chalk.yellow('user')}
/nick ${chalk.cyan('username')} ← Update your username to ${chalk.cyan(
  'username'
)}
/room ${chalk.green(
  'name'
)} ← Create and automatically join a room called ${chalk.green('name')}\n`;

/**
 * Display a list of available commands to the user
 * @exports
 * @function
 * @name help
 * @param arg {null} Unused parameter
 * @param socket {Socket} The socket object from the client event
 * @param io {Server} The server-side Socket.io instance
 */
const help = (arg: null = null, socket: Socket, io: Server): void => {
  sendToUser(instructions, socket, io, null);
};

export default help;
