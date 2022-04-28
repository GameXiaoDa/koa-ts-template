import * as log4js from 'log4js';
import * as path from 'path';

log4js.configure({
  pm2: true,
  appenders: {
    console: {
      type: 'console',
    },
    logger: {
      type: 'dateFile',
      filename: path.resolve(__dirname, '../logs/logger.log'),
      pattern: '-yyyy-MM-dd-hh.log',
      encoding: 'utf-8',
      alwaysIncludePattern: true,
      numBackups: 3,
    },
  },
  categories: {
    default: {appenders: ['logger', 'console'], level: 'info'},
  },
});

export default log4js.getLogger();
