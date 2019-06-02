import supertest from 'supertest'
import { server } from '../../server'
import serverErrorMiddleware from '../500'
import HttpException from '../http-exception'

const request = supertest(server)

// tslint:disable-next-line:no-empty
const error = jest.spyOn(global.console, 'error').mockImplementation(() => {})

describe('`500` error handler', () => {
  describe(`End-to-end tests`, () => {
    xit('should return status `500` on a server error', async () => {
      // This just gets a 404
      const result = await request.get('/error')
      expect(result.status).toBe(500)
      expect(error).toHaveBeenCalled()
    })

    it('should not return at status on a good request', async () => {
      const result = await request.get('/')
      expect(result.status).not.toBe(500)
    })
  })

  describe('Unit tests', () => {
    const status = 500
    const message = 'Something bad happened!'
    const err: HttpException = new HttpException(status, message)
    const req: any = {}
    const res: any = {
      setHeader: jest.fn(),
      status: (num: number) => ({ send: jest.fn() }),
    }
    const next: any = jest.fn()

    beforeAll(() => {
      serverErrorMiddleware(err, req, res, next)
    })

    it('should error log to the console', () => {
      expect(error).toHaveBeenCalled()
    })

    it('should set the response header', () => {
      expect(res.setHeader).toHaveBeenCalled()
    })

    xit('should set a 500 status', () => {
      expect(res.status).toHaveBeenCalledWith(status)
    })

    xit('should send a response', () => {
      const json = JSON.stringify({ status, message })
      expect(res.status(500).send).toHaveBeenCalledWith(json)
    })
  })
})
