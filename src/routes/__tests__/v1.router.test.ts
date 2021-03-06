import supergoose from '../../__tests__/supergoose'
import { server } from '../../server'

const request = supergoose.mockRequest(server)

beforeAll(supergoose.startDB)
afterAll(supergoose.stopDB)

describe('v1 Router', () => {
  it('should respond with a 404 on an invalid route', async () => {
    const result = await request.get('/foo')
    expect(result.status).toBe(404)
  })

  it('responds with a 200 status to a GET for the root', async () => {
    const results = await request.get('/')
    expect(results.status).toBe(200)
  })
  it('responds with a 200 status to a GET for /api/v1/app-info', async () => {
    const results = await request.get('/api/v1/app-info')
    expect(results.status).toBe(200)
  })
  it('responds with a 200 status to a GET for /api/v1/app-info/demo', async () => {
    const results = await request.get('/api/v1/app-info/demo')
    expect(results.status).toBe(200)
  })
  it('responds with a 200 status to a POST to /api/v1/app-info', async () => {
    const obj = { name: 'demo', description: 'good', url: 'https://demo.com' }
    const results = await request.post('/api/v1/app-info').send(obj)
    expect(results.status).toBe(200)
    expect(results.body).toMatchObject(obj)
  })
  it('responds with a 200 status to a PUT to /api/v1/app-info/:id', async () => {
    const obj = { description: 'good', name: 'demo', url: 'https://demo.com' }
    const response = await request.post('/api/v1/app-info').send(obj)
    const id = response.body._id
    const update = {
      description: 'good',
      name: 'update',
      url: 'https://demo.com',
    }
    const results = await request.put(`/api/v1/app-info/${id}`).send(update)
    expect(results.status).toBe(200)
    expect(results.body).toMatchObject(update)
  })
  it('responds with a 200 status to a PATCH to /api/v1/app-info/:id', async () => {
    const obj = { name: 'demo', description: 'good', url: 'https://demo.com' }
    const response = await request.post('/api/v1/app-info').send(obj)
    const id = response.body._id
    const update = {
      description: 'good',
      name: 'update',
      url: 'https://demo.com',
    }
    const results = await request.patch(`/api/v1/app-info/${id}`).send(update)
    expect(results.status).toBe(200)
    expect(results.body).toMatchObject(update)
  })
  it('responds with a 200 status to a DELETE to /api/v1/app-info/:id', async () => {
    const obj = { name: 'demo', description: 'good', url: 'https://demo.com' }
    const response = await request.post('/api/v1/app-info').send(obj)
    const id = response.body._id
    const results = await request.delete(`/api/v1/app-info/${id}`)
    expect(results.status).toBe(200)
    expect(results.body).toMatchObject(obj)
  })
})
