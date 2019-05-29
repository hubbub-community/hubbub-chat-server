import chalk from 'chalk';
// import emojic from 'emojic';
import { hacker } from 'faker';
const { noun } = hacker;

import sendToRoom from '../lib/send-to-room';
import sendToUser from '../lib/send-to-user';

// This is in-memory storage of the current chat environment
import population from '../lib/population';

/**
 * Set a standard greeting, given a username
 * @function
 * @name setGreeting
 * @param username {string} The user's username
 */
export const setGreeting = (username: string): string => {
  // const smiley = chalk.bold.yellow(emojic.grin);
  // const wave = chalk.bold.yellow(emojic.wave);
  const welcome = chalk.underline.bold.white(`Welcome to Hubbub!`);
  const main = `\n${'' /* smiley */} ${welcome} ${'' /* wave */}\n`;
  const usernameMsg = `Your username is ${chalk.cyan(username)}\n`;
  const help = `Type ${chalk.cyan('/help')} to see a list of commands.\n`;
  const greeting = main + usernameMsg + help;
  return greeting;
};

/***
 * On socket connection, greet the user, add them to the lobby,
 * and announce their presence to the lobby.
 * @function
 * @name handleConnection
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const handleConnection = (socket: any, io: any): void => {
  // Create a random username
  const username = `${noun()}-${Math.floor(Math.random() * 1000)}`;

  // Add the user to the Lobby and update the population
  const room = 'lobby';
  population.addUser(socket.id, username);
  population.populateRoom(socket.id, room);
  socket.join(room);

  // Greet the new user
  const welcome = setGreeting(username);
  sendToUser(welcome, socket, io, null);

  // Announce the new user to their room
  const message = `${chalk.yellow(username)} joined ${chalk.cyan(room)}`;
  sendToRoom(message, room, socket);
};

export default handleConnection;
