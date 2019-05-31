import MongooseModel from '../mongoose.model'
import appInfoSchema from './app-info.schema'

/**
 * @param schema Mongoose schema
 */
class AppInfoModel extends MongooseModel {}

export default new AppInfoModel(appInfoSchema)
