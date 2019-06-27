import RESTyWrapper, { IRESTyWrapper } from '../resty-wrapper'
import AppInfoModel from './app-info.model'

/** An instance of RESTyWrapper that uses AppInfo documents */
const appInfo: IRESTyWrapper = new RESTyWrapper(AppInfoModel)

export default appInfo
