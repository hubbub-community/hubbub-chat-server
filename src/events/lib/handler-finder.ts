// import { IHandlerFinder } from '../../global';

// TODO: It is unclear why the return value cannot be Promise<IHandlerFinder>
// The fallback `arg` is somehow potentially typed to `undefined`.

/**
 * @param cmd The user's command word
 * @returns A function that performs the command action
 */
const handlerFinder = async (cmd: string): Promise<any> => {
  try {
    const handler = await import(`../command-handlers/${cmd}`);
    return handler;
  } catch {
    const handler = await import(`../command-handlers/fallback`);
    return handler;
  }
};

export default handlerFinder;
