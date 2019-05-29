import express, { Router } from 'express';

// Create a router instance
import { NextFunction, Request, Response } from 'express-serve-static-core';
const router: Router = Router();

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
 * @function
 * @name home
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
function rootHandler(req: Request, res: Response, next: NextFunction): void {
  const clientUrl: string = 'https://github.com/node-hub/dumb-client';
  res
    .status(200)
    .send(`Welcome to the Hubbub server!\nDownload the client at ${clientUrl}`);
}

/**
 * Get all or one record
 * @function
 * @name getAll
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
function getRecords(req: Request, res: Response, next: NextFunction): void {
  const name = req.params.id;
  req.model
    .get(name)
    .then((results: any) => res.status(200).send(results))
    .catch(next);
}

/**
 * Create a new record
 * @function
 * @name createRecord
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
function createRecord(req: Request, res: Response, next: NextFunction): void {
  const { body } = req;
  req.model
    .post(body)
    .then((result: any) => res.status(200).send(result))
    .catch(next);
}

/**
 * Update a record - upserts if the record does not exist
 * @function
 * @name updateRecord
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
function updateRecord(req: Request, res: Response, next: NextFunction): void {
  const { body } = req;
  const { id } = req.params;
  req.model
    .put(id, body)
    .then((result: any) => res.status(200).send(result))
    .catch(next);
}

/**
 * Patch a new record - does not upsert
 * Update a record - upserts if the record does not exist
 * @function
 * @name patchRecord
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
function patchRecord(req: Request, res: Response, next: NextFunction): void {
  const { body } = req;
  const { id } = req.params;
  req.model
    .patch(id, body)
    .then((result: any) => res.status(200).send(result))
    .catch(next);
}

/**
 * Delete a record
 * @function
 * @name deleteRecord
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
function deleteRecord(req: Request, res: Response, next: NextFunction): void {
  const { id } = req.params;
  req.model
    .delete(id)
    .then((result: any) => res.status(200).send(result))
    .catch(next);
}

export default router;
