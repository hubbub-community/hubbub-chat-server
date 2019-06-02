import supergoose from '../../../__tests__/supergoose'
import appInfo from '../app-info.model'

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
    expect(record.length).toBe(3)
    expect(record[1]).toMatchObject(update)
  })

  it('can `get` a record by `name`', async () => {
    // Note that the client calls `find(name)` instead
    // of `findOne(name)`
    const record = await appInfo.get(update.name)
    expect(record[0]).toMatchObject(update)
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
