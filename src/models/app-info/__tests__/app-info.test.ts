import supergoose from '../../../__tests__/supergoose'
import appInfo from '../app-info'

beforeAll(supergoose.startDB)
afterAll(supergoose.stopDB)

describe('`appInfo` model', () => {
  const obj = { name: 'demo', description: 'good', url: 'https://demo.com' }
  const update = {
    description: 'better',
    name: 'better demo',
    url: 'https://demo.com',
  }

  it('can `post` a new record', async () => {
    const record = await appInfo.post(obj)
    expect(record).toMatchObject(obj)
  })

  beforeAll(() => {
    appInfo.post(obj)
    appInfo.post(update)
  })

  it('can `get` all records', async () => {
    const record = await appInfo.get()
    if (Array.isArray(record)) {
      expect(record.length).toBe(3)
      expect(record[1]).toMatchObject(update)
    }
    expect.assertions(2)
  })

  it('can `get` a record by `id`', async () => {
    const { id } = await appInfo.post(obj)
    const record = await appInfo.get(id)
    expect(record).toMatchObject(obj)
  })

  it('can `patch` a record', async () => {
    const { id } = await appInfo.post(obj)
    const record = await appInfo.patch(id, update)
    expect(record).toMatchObject(update)
  })

  it('can `put` a record', async () => {
    const { id } = await appInfo.post(obj)
    const record = await appInfo.put(id, update)
    expect(record).toMatchObject(update)
  })

  it('can `delete` a record', async () => {
    const { id } = await appInfo.post(obj)
    const record = await appInfo.delete(id)
    expect(record).toMatchObject({})
  })
})
