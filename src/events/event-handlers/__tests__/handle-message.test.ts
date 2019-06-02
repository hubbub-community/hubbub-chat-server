import faker from 'faker'

import handleMessage from '../handle-message'

import population from '../../lib/population'

const getUsername = jest.spyOn(population, 'getUsername')
const getRoom = jest.spyOn(population, 'getRoom')

jest.mock(`../../lib/population`)
jest.mock(`../../lib/send-to-room`)
jest.mock(`../handle-message`)

describe('`handleMessage` function', () => {
  beforeAll(() => {
    const line = faker.hacker.phrase()
    const socket: any = {}
    handleMessage(line, socket)
  })

  it('should call the `population.getUsername` method', async () => {
    expect(getUsername).toHaveBeenCalled()
  })

  it('should call the `population.getRoom` method', async () => {
    expect(getRoom).toHaveBeenCalled()
  })

  xit('should call the `sendToRoom` function', () => {
    // expect(sendToRoom).toHaveBeenCalled();
  })
})
