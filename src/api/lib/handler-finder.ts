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
