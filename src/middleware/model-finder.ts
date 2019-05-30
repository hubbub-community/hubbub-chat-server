/**
 * Model Finder Middleware
 * @module middleware/model-finder
 */

import { NextFunction, Response } from 'express-serve-static-core';
import { IRequest } from '../types/global';
// import { Document, Model, Schema } from 'mongoose';

/**
 * Model Finder Middleware evaluates `req.params.model` (i.e. `/api/v1/:model`) and attaches
 * an instance of the specified model to an extended Request object.
 * In the event the model is not found, Node will throw a `MODULE_NOT_FOUND` error that the error
 * middleware in the server will pick up.
 * @param req Extended Express request object
 * @param res Express response object
 * @param next Express middleware function
 */
const modelFinder = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  const model = await import(`../models/${modelName}/${modelName}.model`);
  req.model = model.default;
  next();
};

export default modelFinder;
