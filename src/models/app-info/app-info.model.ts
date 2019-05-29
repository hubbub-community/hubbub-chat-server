import ModelClass from '../model.model';
import appInfoSchema from './app-info.schema';

/**
 * @param schema {object} Mongoose schema
 */
class AppInfoModel extends ModelClass {}

export default new AppInfoModel(appInfoSchema);
