import { Document, Model } from 'mongoose';

type TSchemaName = string | undefined;

/**
 * @param schema {object} Mongoose schema
 */
class ModelModel {
  public schema: Model<Document, {}>;
  constructor(schema: Model<Document, {}>) {
    this.schema = schema;
  }

  public get(name: TSchemaName) {
    return name ? this.schema.find({ name }) : this.schema.find();
  }

  public post(obj: object) {
    return new this.schema(obj).save();
  }

  // `patch` doesn't upsert; `put` does
  public patch(id: string, obj: object) {
    return this.schema.findByIdAndUpdate(id, obj, { new: true });
  }

  public put(id: string, obj: object) {
    return this.schema.findByIdAndUpdate(id, obj, { new: true, upsert: true });
  }

  public delete(id: string) {
    return this.schema.findByIdAndDelete(id);
  }
}

export default ModelModel;
