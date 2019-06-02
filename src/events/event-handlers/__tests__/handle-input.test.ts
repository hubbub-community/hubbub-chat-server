import handleInput from '../handle-input'

// tslint:disable-next-line:no-empty
const log = jest.spyOn(global.console, 'log').mockImplementation(() => {})

jest.mock(`../../lib/population`)
jest.mock(`../../lib/send-to-room`)
jest.mock(`../handle-message`)

describe('`handleInput` function', () => {
  it('should log to the console', async () => {
    const input = 'hi!'
    const socket: any = {}
    const io: any = {}

    handleInput(input, socket, io)
    expect(log).toHaveBeenCalled()
  })
})
