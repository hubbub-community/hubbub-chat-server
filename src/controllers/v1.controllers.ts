import { NextFunction, Response } from 'express-serve-static-core';
import { IRequest } from '../types/global';

/**
 * `Controllers` methods expect an instance of a class that extends `MongooseModel` to be
 * appended to the `req`. That class's methods are called as appropriate for each request.
 * @class Controllers
 */
class Controllers {
  /**
   * Display a home page
   * @param req Extended Express request object
   * @param res Express response object
   * @param next Express middleware function
   * @memberof Controllers
   */
  public rootHandler(req: IRequest, res: Response, next: NextFunction): void {
    const clientUrl: string = process.env.CLIENT_URL || '';
    res
      .status(200)
      .send(
        `Welcome to the Hubbub server!\nDownload the client at ${clientUrl}`
      );
  }

  /**
   * Get all or one record
   * @param req Extended Express request object
   * @param res Express response object
   * @param next Express middleware function
   * @memberof Controllers
   */
  public getRecords(req: IRequest, res: Response, next: NextFunction): void {
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
   * @memberof Controllers
   */
  public createRecord(req: IRequest, res: Response, next: NextFunction): void {
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
   * @memberof Controllers
   */
  public updateRecord(req: IRequest, res: Response, next: NextFunction): void {
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
   * @memberof Controllers
   */
  public patchRecord(req: IRequest, res: Response, next: NextFunction): void {
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
   * @memberof Controllers
   */
  public deleteRecord(req: IRequest, res: Response, next: NextFunction): void {
    const { id } = req.params;
    // TODO: Sync detailed result type with MongooseModel return type
    req.model
      .delete(id)
      .then((result: object) => res.status(200).send(result))
      .catch(next);
  }
}

export default new Controllers();
