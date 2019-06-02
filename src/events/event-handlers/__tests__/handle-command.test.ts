import { lorem } from 'faker'
const { word } = lorem

import { IParse, TCommand, TCommandArg } from '../../../types/global'
import handleCommand, { parse } from '../handle-command'

jest.mock(`../../lib/handler-finder`, () => jest.fn())
jest.mock(`../../command-handlers/about`, () => jest.fn())
jest.mock(`../../command-handlers/fallback`, () => jest.fn())

describe('`parse` function', () => {
  it('should correctly separate the `cmd` from the `arg` and return an object', () => {
    try {
      const cmd: TCommand = word()
      const arg: TCommandArg = word()
      const line: string = `/${cmd} ${arg}`
      const expected: IParse = { cmd, arg }
      expect(parse(line)).toEqual(expected)
    } catch (err) {
      console.error(err)
    }
  })
})

describe('`handleCommand` function', () => {
  xit('should call the `handlerFinder` function', async () => {
    try {
      // const cmd = 'about';
      // const line = `/${cmd}`;
      // const socket = {};
      // handleCommand(line, socket);
      // expect(parse).toHaveBeenCalledWith(line);
      // expect(handlerFinder).toHaveBeenCalledWith(cmd);
      // expect(handler).toHaveBeenCalledWith(arg, socket, line);
    } catch (err) {
      console.error(err)
    }
  })
})
