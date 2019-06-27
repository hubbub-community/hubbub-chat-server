import RESTyWrapper from '../resty-wrapper'
import AppInfoModel from './app-info.model'

/** An instance of RESTyWrapper that uses AppInfo documents */
const appInfo: RESTyWrapper = new RESTyWrapper(AppInfoModel)

export default appInfo
