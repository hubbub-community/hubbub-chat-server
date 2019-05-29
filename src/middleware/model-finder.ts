/**
 * Model Finder Middleware
 * @module middleware/model-finder
 */

import { NextFunction, Request, Response } from 'express-serve-static-core';
import ExtendedRequest from './extended-request';

/**
 * Model Finder Middleware
 * Evaluates req.params.model (i.e. /api/v1/:model/) and returns an instance of the specified model.
 * Because node require is cached, the instance will only be created once, no matter how many times a model is called for.
 * In the event the model is not found, node will throw a "MODULE_NOT_FOUND" error which the error middleware in the server will pick up.
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */

export default (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const model = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  req.model = require(`../models/${model}/${model}.model`);
  next();
};
