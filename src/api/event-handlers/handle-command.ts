import handlerFinder from '../lib/handler-finder';

/***
 * Separates a command's command and argument
 * @function
 * @name parse
 * @param line {string} A command input from the user
 ***/
export const parse = (line: string) => {
  // Grab a case insensitive command
  const slashWord = line.match(/[a-z]+\b/i);
  if (slashWord && slashWord.length >= 1) {
    const cmd = slashWord[0];
    // Grab the arguments
    const arg = line.slice(cmd.length + 2, line.length);
    // Return them
    return { cmd, arg };
  }
  return { cmd: '', arg: '' };
};

/***
 * Middleware to process commands from the user.
 * @function
 * @name handleCommand
 * @param line {string} The input from the client
 * @param socket {object} The socket object from the client event
 * @param io {object} The server-side Socket.io instance
 ***/
const handleCommand = async (line: string, socket: any, io: any) => {
  try {
    // Parse the line for command and argument
    const { cmd, arg } = parse(line);
    // Pick the right handler based on the command
    const handler = await handlerFinder(cmd);
    // Use the handler to return the right result
    const result = await handler.default(arg, socket, io);
    // Return the result to handle-input
    return result;
  } catch (err) {
    console.error(err);
  }
};

export default handleCommand;
