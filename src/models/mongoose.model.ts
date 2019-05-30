import { Document, Model } from 'mongoose';
import * as t from '../global';

// TODO: All I/O types should be defined more explicitly.
/**
 * @param schema {Model<Document, {}>} Mongoose schema
 */
class MongooseModel {
  public schema: Model<Document, {}>;
  constructor(schema: Model<Document, {}>) {
    this.schema = schema;
  }

  public get(name: t.TSchemaName): object {
    return name ? this.schema.find({ name }) : this.schema.find();
  }

  public post(obj: object): object {
    return new this.schema(obj).save();
  }

  // `patch` doesn't upsert; `put` does
  public patch(id: string, obj: object): object {
    return this.schema.findByIdAndUpdate(id, obj, { new: true });
  }

  public put(id: string, obj: object): object {
    return this.schema.findByIdAndUpdate(id, obj, { new: true, upsert: true });
  }

  public delete(id: string): object {
    return this.schema.findByIdAndDelete(id);
  }
}

export default MongooseModel;
