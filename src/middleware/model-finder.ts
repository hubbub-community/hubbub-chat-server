/**
 * Model Finder Middleware
 * @module middleware/model-finder
 */

import { NextFunction, Request, Response } from 'express-serve-static-core';
// import { Document, Model, Schema } from 'mongoose';

/**
 * Model Finder Middleware
 * Evaluates req.params.model (i.e. /api/v1/:model/) and returns an instance of the specified model.
 * Because node require is cached, the instance will only be created once, no matter how many times a model is called for.
 * In the event the model is not found, node will throw a "MODULE_NOT_FOUND" error which the error middleware in the server will pick up.
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */

declare global {
  namespace Express {
    // tslint:disable-next-line:interface-name
    interface Request {
      model?: any; // Formalize this type
    }
  }
}

const modelFinder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  const model = await import(`../models/${modelName}/${modelName}.model`);
  req.model = model.default;
  next();
};

export default modelFinder;
