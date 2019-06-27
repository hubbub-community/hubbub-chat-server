import { TSocketId } from '../../../types'
import population from '../../lib/population'
import handleDisconnect from '../handle-disconnect'

// tslint:disable-next-line:no-empty
const log = jest.spyOn(global.console, 'log').mockImplementation(() => {})

const depopulateRoom = jest
  .spyOn(population, 'depopulateRoom')
  // tslint:disable-next-line:no-empty
  .mockImplementation(() => {})

const deleteUser = jest
  .spyOn(population, 'deleteUser')
  // tslint:disable-next-line:no-empty
  .mockImplementation(() => {})

describe('`handleDisconnect` function', () => {
  const id: TSocketId = Math.random().toString()
  const socket: any = { id, leave: jest.fn() }

  beforeAll(() => {
    handleDisconnect(socket)
  })

  it('should call the `population.depopulateRoom` method', async () => {
    expect(depopulateRoom).toHaveBeenCalled()
  })

  it('should call the `population.deleteUser` method', async () => {
    expect(deleteUser).toHaveBeenCalled()
  })

  it('should call the `leave` method of the socket', async () => {
    expect(socket.leave).toHaveBeenCalled()
  })

  it('should log to the console', async () => {
    expect(log).toHaveBeenCalled()
  })
})
