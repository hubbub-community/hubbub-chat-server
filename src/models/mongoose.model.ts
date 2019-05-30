import { Document, DocumentQuery, Model, Query } from 'mongoose';
import * as t from '../global';

// TODO: All I/O types should be defined more explicitly.

/**
 * MongooseModel returns the results of Mongoose methods
 * when REST methods are called. This class is intended to be
 * extended by a specific model instantiated with a Mongoose schema.
 * @class MongooseModel
 */
class MongooseModel {
  /** A Mongoose schema */
  public schema: Model<Document, {}>;
  /** Instantiate a new model with a Mongoose schema to operate on that collection. */
  constructor(schema: Model<Document, {}>) {
    this.schema = schema;
  }

  /**
   * Get one record by `name`, or a list of records if no arguments are given.
   * @param name The `name` property of the record.
   * @returns A record or all records.
   * @memberof MongooseModel
   */
  public get(name: t.TSchemaName): DocumentQuery<Document[], Document, {}> {
    return name ? this.schema.find({ name }) : this.schema.find();
  }

  /**
   * Add a record to the database.
   * @param obj The new record
   * @returns The full record posted
   * @memberof MongooseModel
   */
  public post(obj: object): Promise<Document> {
    return new this.schema(obj).save();
  }

  /**
   * Patch an existing record.
   * `patch` doesn't upsert; `put` does
   * @param id The `id` of the record to patch
   * @param obj The modified record.
   * @returns The patched record.
   * @memberof MongooseModel
   */
  public patch(
    id: string,
    obj: object
  ): DocumentQuery<Document | null, Document, {}> {
    return this.schema.findByIdAndUpdate(id, obj, { new: true });
  }

  /**
   * Replace an existing record, or upsert it if it does not exist.
   * @param id The `id` of the record to patch
   * @param obj The modified record.
   * @returns The modified record.
   * @memberof MongooseModel
   */
  public put(id: string, obj: object): Query<any> {
    return this.schema.findByIdAndUpdate(id, obj, { new: true, upsert: true });
  }

  /**
   * Delete an existing record.
   * @param id The `id` of the record to delete.
   * @returns The deleted record.
   * @memberof MongooseModel
   */
  public delete(id: string): DocumentQuery<Document | null, Document, {}> {
    return this.schema.findByIdAndDelete(id);
  }
}

export default MongooseModel;
