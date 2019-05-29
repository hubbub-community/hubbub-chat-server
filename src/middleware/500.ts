import { NextFunction, Request, Response } from 'express-serve-static-core';
import HttpException from '../exceptions/http';

/**
 * Error 500 Middleware
 * @module middleware/error
 */

// **
// * Error 500 handler - Returns a JSON object on a server error
// * @function
// * @param err {object} Express error object
// * @param req {object} Express request object
// * @param res {object} Express response object
// * @param next {function} Express middleware function
// */

/**
 * Error 500 handler - Returns a JSON object on a server error
 *
 * @param {HttpException} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {*}
 */

function serverErrorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  console.error('__SERVER_ERROR__', err);
  const status: number = err.status || 500;
  const message: string = err.message || 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.status(status).send(JSON.stringify({ status, message }));
}

export default serverErrorMiddleware;
