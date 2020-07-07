import Sdk from 'jm-sdk'
import config from '@/config'
import taro from './taro'
import getArgs from './args'
import user from './user'
import weapp from './weapp'
import passportWeapp from './passport-weapp'
import wyb from './wyb'
import log from './log'

const sdk = new Sdk(config)
const { logger } = sdk
logger.level = config.log_level || 'info'
// logger.info('config', config)

sdk.isBrowser = function () {
  return false;
  // return typeof window !== 'undefined'
}
sdk.getArgs = getArgs

sdk
  .use(taro)
  .use(user)
  .use(weapp)
  .use(passportWeapp)
  .use(wyb)
  .use(log)

export default sdk
