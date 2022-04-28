import mongoose from 'mongoose';
import {mongo} from '../config';
import logger from './logger';

mongoose.connect(`mongodb://${mongo.host}:${mongo.port}/${mongo.dbName}`);

mongoose.connection.on('error', err => {
  logger.error('连接mongodb数据库失败');
});

mongoose.connection.on('open', event => {
  logger.info('连接mongodb数据库成功');
});

export default mongoose;
