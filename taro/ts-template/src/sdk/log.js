import Taro from '@tarojs/taro'

const name = 'log'

export default function () {
  let app = this
  const {logapi: url, log_level} = app.store.config
  if (!url) return

  const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  }

  function none () {}

  async function log (opts) {
    try {
      await Taro.request({
        method: 'GET',
        url,
        data: {
          ...opts
        }
      })
    } catch (e) {}
  }

  class Logger {
    constructor (opts = {}) {
      const {level = log_level, category = 'default'} = opts
      this.level = level
      this.category = category
    }

    set level (level) {
      level || (level = log_level)
      this._levelName = level.toLocaleLowerCase()
      this._level = levels[this._levelName]

      Object.keys(levels).forEach(level => {
        if (this._level < levels[level]) {
          this[level] = none
        } else if (level === 'debug') {
          this[level] = console.log.bind(console)
        } else if (level === 'info') {
          this[level] = console.info.bind(console)
        } else {
          const l = console[level].bind(console)
          this[level] = opts => {
            if (!opts) return
            l(opts)

            if (typeof opts !== 'object' || Array.isArray(opts)) opts = {data: opts}
            log({
              level,
              category: this.category,
              ...opts
            })
          }
        }
      })
    }

    get level () {
      return this._levelName
    }

    get levelValue () {
      return this._level
    }
  }

  let loggers = {}

  let getLogger = (loggerCategoryName = 'default') => {
    if (!loggers[loggerCategoryName]) {
      loggers[loggerCategoryName] = new Logger({category: loggerCategoryName})
    }
    return loggers[loggerCategoryName]
  }

  app.logger = getLogger()
  app.getLogger = getLogger

  return {
    name,
    unuse: () => {
      delete app.logger
      delete app.getLogger()
    }
  }
}
