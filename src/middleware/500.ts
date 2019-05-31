/**
 * Error 500 Middleware
 * @module middleware/500
 */

import { NextFunction, Request, Response } from 'express-serve-static-core'
import HttpException from './http-exception'

/**
 * Error 500 handler - Returns a JSON object on a server error
 * @param err Extended Error object
 * @param req Extended Express request object
 * @param res Express response object
 * @param next Express middleware function
 */
function serverErrorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('__SERVER_ERROR__', err)
  const status: number = err.status || 500
  const message: string = err.message || 'Server Error'
  res.setHeader('Content-Type', 'application/json')
  res.status(status).send(JSON.stringify({ status, message }))
}

export default serverErrorMiddleware
