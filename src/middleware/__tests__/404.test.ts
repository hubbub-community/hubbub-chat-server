import supertest from 'supertest'
import { server } from '../../server'

const request = supertest(server)

// TODO: Below are end-to-end tests;
// we could add unit tests that require the notFound import
// const notFound = require('../404.js');

describe('`404` error handler', () => {
  describe(`End-to-end tests`, () => {
    it('should not return at status on a good request', async () => {
      const result = await request.get('/')
      expect(result.status).not.toBe(404)
    })

    it('should return status `404` on a bad request', async () => {
      const result = await request.get('/foo')
      expect(result.status).toBe(404)
    })
  })
  describe(`Unit tests`, () => {
    xit('should assign properties to the request', () => {
      //
    })
    xit('should invoke methods', () => {
      //
    })
  })
})
