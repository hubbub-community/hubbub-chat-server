/**
 * v1 REST Controllers
 * @module api/v1.router
 */

import express, { Router } from 'express';

// Create a router instance
import { NextFunction, Request, Response } from 'express-serve-static-core';

const router: Router = Router();

import { IRequest } from '../global';

// Import middleware
import modelFinder from '../middleware/model-finder';

// Dynamically evaluate the model
router.param('model', modelFinder);

// Declare routes
router.get('/', rootHandler);
router.get(`/api/v1/:model`, getRecords);
router.get(`/api/v1/:model/:id`, getRecords);
router.post(`/api/v1/:model`, createRecord);
router.put(`/api/v1/:model/:id`, updateRecord);
router.patch(`/api/v1/:model/:id`, patchRecord);
router.delete(`/api/v1/:model/:id`, deleteRecord);

/**
 * Display a home page
 * @param req Extended Express request object
 * @param res Express response object
 * @param next Express middleware function
 */
function rootHandler(req: Request, res: Response, next: NextFunction): void {
  const clientUrl: string = 'https://github.com/node-hub/dumb-client';
  res
    .status(200)
    .send(`Welcome to the Hubbub server!\nDownload the client at ${clientUrl}`);
}

/**
 * Get all or one record
 * @param req Extended Express request object
 * @param res Express response object
 * @param next Express middleware function
 */
function getRecords(req: IRequest, res: Response, next: NextFunction): void {
  const name = req.params.id;
  req.model
    .get(name)
    .then((results: object) => res.status(200).send(results))
    .catch(next);
}

/**
 * Create a new record
 * @param req Extended Express request object
 * @param res Express response object
 * @param next Express middleware function
 */
function createRecord(req: IRequest, res: Response, next: NextFunction): void {
  const { body } = req;
  // TODO: Sync detailed result type with MongooseModel return type
  req.model
    .post(body)
    .then((result: object) => res.status(200).send(result))
    .catch(next);
}

/**
 * Update a record - upserts if the record does not exist
 * @param req Extended Express request object
 * @param res Express response object
 * @param next Express middleware function
 */
function updateRecord(req: IRequest, res: Response, next: NextFunction): void {
  const { body } = req;
  const { id } = req.params;
  // TODO: Sync detailed result type with MongooseModel return type
  req.model
    .put(id, body)
    .then((result: object) => res.status(200).send(result))
    .catch(next);
}

/**
 * Patch a new record - does not upsert
 * Update a record - upserts if the record does not exist
 * @param req Extended Express request object
 * @param res Express response object
 * @param next Express middleware function
 */
function patchRecord(req: IRequest, res: Response, next: NextFunction): void {
  const { body } = req;
  const { id } = req.params;
  // TODO: Sync detailed result type with MongooseModel return type
  req.model
    .patch(id, body)
    .then((result: object) => res.status(200).send(result))
    .catch(next);
}

/**
 * Delete a record
 * @param req Extended Express request object
 * @param res Express response object
 * @param next Express middleware function
 */
function deleteRecord(req: IRequest, res: Response, next: NextFunction): void {
  const { id } = req.params;
  // TODO: Sync detailed result type with MongooseModel return type
  req.model
    .delete(id)
    .then((result: object) => res.status(200).send(result))
    .catch(next);
}

export default router;
