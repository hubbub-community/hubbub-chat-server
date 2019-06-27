import { Document, DocumentQuery, Model, Query } from 'mongoose'

export interface IRESTyWrapper {
  get(
    id?: string
  ):
    | DocumentQuery<Document[], Document>
    | DocumentQuery<Document | null, Document>
  post(object: object): Promise<Document>
  patch(id: string, obj: object): DocumentQuery<Document | null, Document>
  put(id: string, obj: object): Query<any>
  delete(id: string): DocumentQuery<Document | null, Document>
}

/**
 * The class takes a Mongoose model as its constructor.
 * It wraps it in methods with RESTy names. The RESTy
 * methods are used to access the model's documents.
 *
 * As a result, in the REST API controllers, a `GET`
 * request can be met with a `get` method invocation, etc.
 *
 * @class RESTyWrapper
 */
class RESTyWrapper implements IRESTyWrapper {
  /** A Mongoose model */
  public model: Model<Document>
  /** Instantiate a new model with a Mongoose model to operate on that collection. */
  constructor(model: Model<Document>) {
    this.model = model
  }

  /**
   * Get one record by `id`, or a list of records if no arguments are given.
   * @param id The `id` property of the record.
   * @returns A record or all records.
   * @memberof RESTyWrapper
   */
  public get(
    id?: string
  ):
    | DocumentQuery<Document[], Document>
    | DocumentQuery<Document | null, Document> {
    return id ? this.model.findById(id) : this.model.find()
  }

  /**
   * Add a record to the database.
   * @param obj The new record
   * @returns The full record posted
   * @memberof RESTyWrapper
   */
  public post(obj: object): Promise<Document> {
    return new this.model(obj).save()
  }

  /**
   * Patch an existing record.
   * `patch` doesn't upsert; `put` does
   * @param id The `id` of the record to patch
   * @param obj The modified record.
   * @returns The patched record.
   * @memberof RESTyWrapper
   */
  public patch(
    id: string,
    obj: object
  ): DocumentQuery<Document | null, Document> {
    return this.model.findByIdAndUpdate(id, obj, { new: true })
  }

  /**
   * Replace an existing record, or upsert it if it does not exist.
   * @param id The `id` of the record to patch
   * @param obj The modified record.
   * @returns The modified record.
   * @memberof RESTyWrapper
   */
  public put(id: string, obj: object): Query<any> {
    return this.model.findByIdAndUpdate(id, obj, { new: true, upsert: true })
  }

  /**
   * Delete an existing record.
   * @param id The `id` of the record to delete.
   * @returns The deleted record.
   * @memberof RESTyWrapper
   */
  public delete(id: string): DocumentQuery<Document | null, Document> {
    return this.model.findByIdAndDelete(id)
  }
}

export default RESTyWrapper
