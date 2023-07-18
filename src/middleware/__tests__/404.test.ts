import supertest from 'supertest'
import { server } from '../../server'

const request = supertest(server)

/*
Unit tests will look like:

const send = jest.fn();
const status = jest.fn().mockImplementation(() => ({ send }));
const res = { setHeader: jest.fn(), status };
const next = jest.fn();

beforeAll(() => {
  notFound(request, res, next);
});

describe('`404` error handler', () => {
  describe('Unit tests', () => {
    it('should have a status of 404', () => {
      const status = 404;
      expect(res.status).toHaveBeenCalledWith(status);
    });

    it('should have a header type of something', () => {
      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        'application/json'
      );
    });

    it('should send a string', () => {
      expect(send).toHaveBeenCalledWith(expect.any(String));
    });
  });
*/

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
