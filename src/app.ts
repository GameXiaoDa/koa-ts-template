import Koa from 'koa';
import koaBody from 'koa-body';
import router from './utils/router';
import './utils/db';
import logger from './utils/logger';

const app = new Koa();

async function run(port: number = 8080) {
  // 处理参数
  app.use(koaBody());

  // 路由注册
  await router(app).catch(err => {
    logger.error('路由注册失败: ', err);
  });

  app.listen(port, () => {
    logger.info('应用启动成功');
  });

  app.on('error', (err, ctx) => {
    logger.error('全局捕捉错误: ', err);
  });
}

export default run;
