/**
 * Error 404 Middleware
 * @module middleware/404
 */

import { NextFunction, Request, Response } from 'express'

/**
 * Sends a 404 response
 * @param req Extended Express request object
 * @param res Express response object
 * @param next Express middleware function
 */
function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status: number = 404
  const message: string = 'Resource Not Found'
  res.setHeader('Content-Type', 'application/json')
  res.status(status).send(JSON.stringify({ status, message }))
}

export default notFoundMiddleware
