/**
 * Error 404 Middleware
 * @module middleware/404
 */

import { NextFunction, Request, Response } from 'express-serve-static-core';
import HttpException from './http-exception';

/**
 * Sends a 404 response
 * @function
 * @name notFoundMiddleware
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express next function
 */
function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status: number = 404;
  const message: string = 'Resource Not Found';
  // res.setHeader('Content-Type', 'application/json');
  // res.status(status).send(JSON.stringify({ status, message }));
  next(new HttpException(status, message));
  /*
   * Why not
   *
   * ?
   */
}

export default notFoundMiddleware;
