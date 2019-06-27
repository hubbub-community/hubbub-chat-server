import mongoose, { Document, Model, model, Schema } from 'mongoose'
// require('mongoose-schema-jsonschema')(mongoose) // Not sure how to require this for context

export interface IAppInfo {
  description: string
  name: string
  url: string
}

export const AppInfoSchema: Schema = new Schema({
  description: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
})

export interface IAppInfoModel extends IAppInfo, Document {}

const AppInfoModel: Model<IAppInfoModel> = model<IAppInfoModel>(
  'AppInfo',
  AppInfoSchema
)

export default AppInfoModel
